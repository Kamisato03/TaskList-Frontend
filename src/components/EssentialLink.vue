<template>
  <q-toolbar>
    <q-list>
      <q-item clickable @click="navigateToHome">
        <q-item-section>
          <q-icon name="home" />
          <q-item-label>Inicio</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable @click="logout">
        <q-item-section>
          <q-icon name="power_settings_new"> </q-icon>
          <q-item-label>Desconectar</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable @click="navigateToCreateLinks">
        <q-item-section>
          <q-icon name="add" />
          <q-item-label>Crear enlaces</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-toolbar>
</template>

<script setup>
import { useUserStore } from "../stores/user-store";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const logout = async () => {
  await userStore.logout();
  router.push("/login");
};

const accessUser = async () => {
  await userStore.access();
  router.push("/");
};

const navigateToHome = () => {
  // código para navegar a la página de inicio
};

const navigateToCreateLinks = () => {
  // código para navegar a la página de creación de enlaces
};
</script>
