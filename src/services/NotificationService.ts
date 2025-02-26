import { toast } from "react-toastify";
import { notificationStyles, NotificationType } from "@/enums/notifications";

export default class NotificationService {
  static confirmDelete(): boolean {
    return window.confirm("Tem certeza que deseja excluir este produto?");
  }

  static showMessage(type: NotificationType, message: string): void {
    const { background } = notificationStyles[type];

    toast(message, {
      position: "top-right",
      style: { background, color: "#fff" },
      autoClose: 3000,
      hideProgressBar: true,
    });
  }
}
