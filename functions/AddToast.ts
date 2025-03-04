import { addToast } from "@heroui/react";

type ToastSeverity =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | undefined;

const AddToast = (
  title: string,
  description: string,
  timeout: number,
  type: ToastSeverity = "default"
) => {
  addToast({
    color: "foreground",
    variant: "flat",
    title,
    description,
    timeout,
    severity: type,
    shadow: "lg",
    size: "sm",
    radius: "sm",
    shouldShowTimeoutProgess: true,
  });
};

export { AddToast };
