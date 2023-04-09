<template>
  <q-page padding>
    <q-btn @click="userStore.access">Ingresar</q-btn>
    <q-btn @click="createLink">Crear Link</q-btn>
    <q-btn @click="userStore.logout">Cerrar Session</q-btn>
    <br />
    <div>{{ userStore.token }}</div> <br />
    <div>{{ userStore.expiresIn }}</div>
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { useUserStore } from "../stores/user-store";

const userStore = useUserStore();
userStore.refreshToken();

const createLink = async () => {
  try {
    const res = await api({
      method: "POST",
      url: "/links",
      headers: {
        Authorization: "Bearer " + token.value,
      },
      data: {
        longLink: "https://vitejs.dev",
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
</script>
