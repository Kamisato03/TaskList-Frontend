import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useUserStore } from "./user-store";

export const useLinkStore = defineStore("link", () => {
  const userStore = useUserStore();
  const links = ref([]);

  const createLink = async (longLink) => {
    try {
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
      console.log(res.data);
      links.value.push(res.data.newLink);
    } catch (error) {
      throw (error.response?.data || error);
    }
  };

  const getLinks = async () => {
    try {
      const res = await api({
        url: "/links",
        method: "GET",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });
      links.value = [...res.data.links];
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  getLinks();
  return {
    createLink,
    getLinks,
    links,
  };
});
