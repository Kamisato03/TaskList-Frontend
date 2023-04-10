import { useQuasar } from "quasar";

export const useNotify = () => {
  const $q = useQuasar();
  const showNotify = (message = "Error de servidor", color = "negative") => {
    $q.notify({
      message,
      color,
    });
  };

  const errorNotify = (message = "Error de servidor") => {
    $q.notify({
      message,
      color: "negative",
      icon: "report_problem",
    });
  };
  const successNotify = (message = "Error de servidor") => {
    $q.notify({
      message,
      color: "green",
      icon: "mdi-check-bold",
    });
  };

  return {
    showNotify,
    successNotify,
    errorNotify,
  };
};
