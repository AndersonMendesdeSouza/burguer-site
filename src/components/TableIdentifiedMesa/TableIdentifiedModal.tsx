import { useEffect, useId, useRef } from "react";
import { CircleCheck } from "lucide-react";
import styles from "./TableIdentifiedModal.module.css";

type TableIdentifiedModalProps = {
  tableNumber: string;
  onClose: () => void;
};

export default function TableIdentifiedModal({
  tableNumber,
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
      onCancel={onClose}
    >
      <span className={styles.icon} aria-hidden="true">
        <CircleCheck size={28} />
      </span>
      <h2 id={titleId}>Mesa identificada</h2>
      <p id={descriptionId} className={styles.tableNumber}>
        Mesa {tableNumber}
      </p>
      <p className={styles.hint}>
        Este aviso fecha automaticamente em 5 segundos.
      </p>
      <button type="button" className={styles.closeButton} onClick={onClose}>
        Fechar
      </button>
    </dialog>
  );
}
