<template>
  <q-page padding class="bg-grey-3">
    <div class="row justify-center">
      <div class="col-lg-6 col-md-6">
        <h3 class="text-primary">Crear Links</h3>
        <add-link></add-link>
      </div>
    </div>
    <div class="row justify-start q-ml-xl q-mr-xl">
      <div
        class="col-lg-6 col-sm-11"
        v-for="link of linkStore.links"
        :key="link._id"
      >
        <link-card :link="link"></link-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useLinkStore } from "../stores/link-store";
import { useUserStore } from "../stores/user-store";
//components
import AddLink from "src/components/AddLink.vue";
import LinkCard from "src/components/LinkCard.vue";
const userStore = useUserStore();
const linkStore = useLinkStore();
linkStore.getLinks();
</script>
