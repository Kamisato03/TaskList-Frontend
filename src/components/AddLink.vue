<template>
  <q-form @submit.prevent="addLink">
    <q-input
      v-model="link"
      label="Ingrese link aquí"
      :rules="[
        (val) => (val && val.trim() !== '') || 'Escribe una url por favor',
      ]"
    ></q-input>
    <q-btn
      class="q-mt-2-sm"
      label="Agregar"
      color="primary"
      type="submit"
      :loading="loading"
    ></q-btn>
  </q-form>
</template>

<script setup>
import { ref } from "vue";
import { useLinkStore } from "src/stores/link-store";
import { useNotify } from "src/composables/notifyHook";

const linkStore = useLinkStore();
const { showNotify } = useNotify();

const link = ref("");
const loading = ref(false);

const addLink = async () => {
  try {
    loading.value = true;
    await linkStore.createLink(link.value);
    showNotify("Link Agregado", "green");
    link.value = "";
  } catch (error) {
    if (error.errors) {
      return error.errors.forEach((element) => {
        showNotify(element.msg);
      });
    }
    showNotify("Error al agregar");
  } finally {
    loading.value = false;
  }
};
</script>
