import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useUserStore } from "./user-store";
import { useQuasar } from "quasar";

export const useLinkStore = defineStore("link", () => {
  const userStore = useUserStore();
  const links = ref([]);
  const $q = useQuasar();

  const createLink = async (longLink) => {
    try {
      $q.loading.show({
        message: "Creando Enlace",
      });
      const res = await api({
        method: "POST",
        url: "/links",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
        data: {
          longLink,
        },
      });
      links.value.push(res.data.newLink);
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      $q.loading.hide();
    }
  };

  const getLinks = async () => {
    try {
      $q.loading.show({
        message: "Obteniendo Enlaces",
      });
      const res = await api({
        url: "/links",
        method: "GET",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });
      links.value = [...res.data.links];
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      $q.loading.hide();
    }
  };

  const removeLink = async (id) => {
    try {
      $q.loading.show({
        message: "Eliminando Enlace",
      });
      await api({
        url: "/links/" + id,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });
      links.value = links.value.filter((item) => item._id !== id);
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      $q.loading.hide();
    }
  };

  const updateLink = async (newLink) => {
    try {
      $q.loading.show({
        message: "Actualizando Enlace",
      });
      const res = await api({
        url: "/links/" + newLink._id,
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
        data: {
          longLink: newLink.longLink,
        },
      });
      links.value = links.value.map((item) =>
        item._id === newLink._id ? newLink : item
      );
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      $q.loading.hide();
    }
  };
  getLinks();
  return {
    createLink,
    getLinks,
    updateLink,
    removeLink,
    links,
  };
});
