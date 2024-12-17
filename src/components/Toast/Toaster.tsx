'use client';

import { useToast } from '@/hooks/useToast';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/Toast/Toast';

export default function Toaster() {
  const { toasts } = useToast();
  const DURATION_TIMEOUT = 5000;

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        duration,
        ...props
      }) {
        return (
          <Toast
            key={id}
            duration={duration ?? DURATION_TIMEOUT}
            {...props}
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
