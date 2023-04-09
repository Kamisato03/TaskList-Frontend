<template>
  <q-page padding>
    <h3>Crear Links</h3>
    <add-link></add-link>
    <pre>
        {{ linkStore.links }}
    </pre>
  </q-page>
</template>

<script setup>
import { useLinkStore } from "../stores/link-store";
//componets
import AddLink from "src/components/AddLink.vue";
const linkStore = useLinkStore();
</script>
