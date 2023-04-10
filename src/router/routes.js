import { api } from "src/boot/axios";

const redirectLink = async (to, from, next) => {
  console.log(to.params.nanoid);
  try {
    const { data } = await api.get("links/" + to.params.nanoid);
    console.log(data.longLink);
    window.location.href = data.longLink;
    next();
  } catch (error) {
    console.log(error);
    next("/404");
  }
};

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        meta: {
          auth: true, // solo para las rutas protegidas
        },
      },
      { path: "login", component: () => import("pages/LoginPage.vue") },
      { path: "register", component: () => import("pages/RegisterPage.vue") },
      {
        path: "links",
        component: () => import("pages/LinksPage.vue"),
        meta: {
          auth: true, // solo para las rutas protegidas
        },
      },
      {
        path: "/:nanoid",
        component: () => import("pages/RedirectPage.vue"),
        beforeEnter: redirectLink,
      },
    ],
  },
  {
    path: "/404",
    component: () => import("pages/ErrorNotFound.vue"),
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
