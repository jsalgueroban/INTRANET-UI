export type NoticeVariant = 'global' | 'contextual';
export type NoticeTone = 'success' | 'error' | 'info';
export interface NoticeOptions {
  message: string;
  description?: string;
  variant?: NoticeVariant;
  anchor?: HTMLElement | null;
  tone?: NoticeTone;
  duration?: number;
}
export interface NoticeHandle { close(): void; }
export interface ConfirmationOptions {
  title: string;
  description: string;
  context?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  requireReason?: boolean;
  trigger?: HTMLElement | null;
  onConfirm?: (value: { reason: string }) => void | Promise<void>;
}
export declare function notify(options: NoticeOptions): NoticeHandle | undefined;
export declare function confirmAction(options: ConfirmationOptions): Promise<boolean>;
