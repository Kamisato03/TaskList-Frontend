<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Blinks</q-toolbar-title>
        <div>
          <q-btn-group>
            <q-btn
              color="green"
              class="q-mr-sm"
              glossy
              to="/login"
              v-if="!userStore.token"
              >Login</q-btn
            >
            <q-btn color="green" glossy to="/register" v-if="!userStore.token"
              >Register</q-btn
            >
            <q-btn color="red" glossy @click="logout" v-if="userStore.token"
              >Logout</q-btn
            >
          </q-btn-group>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user-store";
import EssentialLink from "components/EssentialLink.vue";
import { useRouter } from "vue-router";

const leftDrawerOpen = ref(false);
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

</script>
