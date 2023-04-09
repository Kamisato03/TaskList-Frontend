import { useQuasar } from "quasar";

export const useNotify = () => {
  const $q = useQuasar();
  const showNotify = (message = "Error de servidor", color = "negative") => {
    $q.notify({
      message,
      color,
    });
  };

  return {
    showNotify,
  };
};
