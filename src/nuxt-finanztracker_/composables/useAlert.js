import { ref } from "vue";

// Alert-Handling (Nachrichten: Erfolg oder Fehler)
export function useAlert() {
  const showAlertBox = ref(false);
  const alertMessage = ref("");
  const alertType = ref("success");

  function showAlert(message, type = "success") {
    alertMessage.value = message;
    alertType.value = type;
    showAlertBox.value = true;

    setTimeout(() => {
      showAlertBox.value = false;
    }, 3000);
  }

  return {
    showAlertBox,   
    alertMessage,
    alertType,
    showAlert
  };
}
