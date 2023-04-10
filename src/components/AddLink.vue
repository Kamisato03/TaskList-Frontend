<template>
  <q-form @submit.prevent="addLink" ref="formAdd">
    <q-input
      v-model="link"
      label="Ingrese link aquí"
      :rules="[
        (val) => (val && val.trim() !== '') || 'Escribe una url por favor',
      ]"
      lazy-rules
    ></q-input>
    <q-btn
      class="q-mt-2-sm q-mb-sm"
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
const { successNotify, errorNotify } = useNotify();

const link = ref("");
const loading = ref(false);
const formAdd = ref(null);

const addLink = async () => {
  try {
    loading.value = true;
    await linkStore.createLink(link.value);
    successNotify("Link Agregado");
    link.value = "";
    formAdd.value.resetValidation();
  } catch (error) {
    if (error.errors) {
      return error.errors.forEach((element) => {
        error(element.msg);
      });
    }
    errorNotify("Error al agregar");
  } finally {
    loading.value = false;
  }
};
</script>
