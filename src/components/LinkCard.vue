<template>
  <q-card class="my-card bg-grey-5 text-white q-mt-md q-mr-sm">
    <q-card-section>
      <div class="text-overline">{{ link.nanoLink }}</div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">ID: {{ link._id }}</div>
      <div class="text-h6">Link: {{ link.longLink }}</div>
    </q-card-section>
    <q-separator dark />
    <q-card-actions class="bg-blue-grey-4">
      <q-btn
        flat
        icon="mdi-delete"
        color="red"
        @click="deleteLink(link._id)"
      ></q-btn>
      <q-btn
        flat
        icon="mdi-pencil"
        color="warning"
        @click="editLink(link)"
      ></q-btn>
      <q-btn flat color="primary" class="btn" @click="copyLink(link.nanoLink)"
        >Copy</q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { useLinkStore } from "src/stores/link-store";
import { useQuasar } from "quasar";
import { useNotify } from "src/composables/notifyHook";
import ClipboardJS from "clipboard";

defineProps({
  link: Object,
});
const { successNotify, errorNotify } = useNotify();
const linkStore = useLinkStore();
const $q = useQuasar();

const deleteLink = (_id) => {
  //
  $q.dialog({
    title: "Confirmar",
    message: "¿Quieres eliminar el link?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      await linkStore.removeLink(_id);
      successNotify("Link Eliminado");
    } catch (error) {
      if (error.errors) {
        return error.errors.forEach((element) => {
          errorNotify(element.msg);
        });
      }
      errorNotify("Error al eliminar");
    }
  });
};

const editLink = async (link) => {
  $q.dialog({
    title: "Editar Link",
    message: "Ingrese el nuevo enlace",
    prompt: {
      model: link.longLink,
      type: "text", // optional
    },
    cancel: true,
    persistent: true,
  }).onOk(async (data) => {
    const newLink = { ...link, longLink: data };
    try {
      await linkStore.updateLink(newLink);
      successNotify("Enlace modificado");
    } catch (error) {
      if (error.errors) {
        return error.errors.forEach((element) => {
          errorNotify(element.msg);
        });
      }
      errorNotify(error);
    }
  });
};

const copyLink = async (nanoLink) => {
  try {
    const path = `${process.env.FRONT_URI}${nanoLink}`;
    const clipboard = new ClipboardJS(".btn", {
      text: () => path,
    });
    successNotify("Enlace Copiado");
  } catch (error) {
    if (error.errors) {
      return error.errors.forEach((element) => {
        errorNotify(element.msg);
      });
    }
    errorNotify(error);
  }
};
</script>
