import toast from "react-simple-toasts";

export const openToast = (message: any) => {
  if (typeof message === "string") {
    return toast(message, 3000);
  }
  if (Array.isArray(message)) {
    return message.forEach(openToast);
  }
  return toast(JSON.stringify(message), 3000);
};
