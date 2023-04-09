<template>
  <q-page padding>
    <h3>Links Creados</h3>
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { useUserStore } from "../stores/user-store";

const userStore = useUserStore();
userStore.refreshToken();
</script>
