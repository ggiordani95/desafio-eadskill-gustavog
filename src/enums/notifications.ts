export enum NotificationType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export const notificationStyles: Record<
  NotificationType,
  { background: string }
> = {
  [NotificationType.SUCCESS]: {
    background: "#4CAF50",
  },
  [NotificationType.ERROR]: {
    background: "#F44336",
  },
  [NotificationType.WARNING]: {
    background: "#FFC107",
  },
  [NotificationType.INFO]: {
    background: "#2196F3",
  },
};
