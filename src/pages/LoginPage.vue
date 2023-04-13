<template>
  <q-page class="row justify-center">
    <div class="col-12 col-sm-6 q-mt-xl">
      <h3>Login</h3>
      <q-form @submit.prevent="handleSubmit" ref="formAdd">
        <q-input
          v-model="email"
          label="Ingrese su correo"
          type="text"
          :rules="[
            (val) =>
              (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) ||
              'Formato incorrecto de email',
          ]"
          lazy-rules
        ></q-input>
        <q-input
          v-model="password"
          label="Ingrese su contraseña"
          type="password"
          :rules="[
            (val) =>
              (val && val.length > 5) ||
              'La contraseña debe tener mínimo 6 caracteres',
          ]"
          lazy-rules
        ></q-input>
        <div>
          <q-btn label="Login" type="submit"></q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user-store";
import { useQuasar } from "quasar";
const userStore = useUserStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const $q = useQuasar();
const formAdd = ref(null);

const handleSubmit = async () => {
  try {
    await userStore.access(email.value, password.value);
    router.push("/");
    email.value = "";
    password.value = "";
    formAdd.value.resetValidation();
  } catch (error) {
    console.log(error);
    if (error.error) {
      alertFunction(error.error);
    } else {
      alertFunction(error.errors[0].msg);
    }
  }
};

const alertFunction = (msg) => {
  $q.dialog({
    title: "Error",
    message: msg,
  });
};
</script>
