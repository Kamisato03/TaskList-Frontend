<template>
  <q-page padding class="row justify-center">
    <div class="col-12 col-sm-6 col-md-5">
      <h3>Register</h3>
      <q-form @submit.prevent="handleSubmit">
        <q-input
          v-model="email"
          label="Ingrese su correo"
          type="text"
          :rules="[
            (val) =>
              (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) ||
              'Formato incorrecto de email',
          ]"
        ></q-input>
        <q-input
          v-model="password"
          label="Ingrese su password"
          type="password"
          :rules="[
            (val) =>
              (val && val.length > 5) ||
              'El password debe tener mínimo 6 caracteres',
          ]"
        ></q-input>
        <q-input
          v-model="repassword"
          label="Repita su password"
          type="password"
          :rules="[
            (val) => (val && val === password) || 'Los passwords no coinciden',
          ]"
        ></q-input>
        <div>
          <q-btn label="Register" type="submit"></q-btn>
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
const repassword = ref("");
const $q = useQuasar();

const handleSubmit = async () => {
  try {
    await userStore.register(email.value, password.value, repassword.value);
    router.push("/");
    email.value = "";
    password.value = "";
    repassword.value = "";
  } catch (error) {
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
