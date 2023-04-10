<template>
  <q-page padding>
    <h3>Crear Links</h3>
    <add-link></add-link>
    <div class="row justify-center">
      <div class="col-lg-6 col-sm-11" v-for="link of linkStore.links" :key="link._id">
        <link-card :link="link"></link-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useLinkStore } from "../stores/link-store";
//components
import AddLink from "src/components/AddLink.vue";
import LinkCard from "src/components/LinkCard.vue";
const linkStore = useLinkStore();
linkStore.getLinks();
</script>
