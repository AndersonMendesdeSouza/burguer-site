import { useEffect, useId, useRef } from "react";
import { CircleCheck } from "lucide-react";
import styles from "./TableIdentifiedModal.module.css";

type TableIdentifiedModalProps = {
  tableNumber: string;
  title?: string;
  description?: string;
  closeLabel?: string;
  confirmLabel?: string;
  isConfirming?: boolean;
  onConfirm?: () => void;
  onClose: () => void;
};

export default function TableIdentifiedModal({
  tableNumber,
  title = "Mesa identificada",
  description = "Este aviso fecha automaticamente em 5 segundos.",
  closeLabel = "Fechar",
  confirmLabel = "Confirmar pedido",
  isConfirming = false,
  onConfirm,
  onClose,
}: TableIdentifiedModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();

    return () => dialog?.close();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.modal}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault();
        if (!isConfirming) onClose();
      }}
      aria-busy={isConfirming}
    >
      <span className={styles.icon} aria-hidden="true">
        <CircleCheck size={28} />
      </span>
      <h2 id={titleId}>{title}</h2>
      <p className={styles.tableNumber}>
        Mesa {tableNumber}
      </p>
      <p id={descriptionId} className={styles.hint}>
        {description}
      </p>
      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.closeButton} ${onConfirm ? styles.cancelButton : ""}`}
          disabled={isConfirming}
          onClick={onClose}
        >
          {closeLabel}
        </button>
        {onConfirm && (
          <button
            type="button"
            className={styles.closeButton}
            disabled={isConfirming}
            onClick={onConfirm}
          >
            {isConfirming ? "Enviando..." : confirmLabel}
          </button>
        )}
      </div>
    </dialog>
  );
}
