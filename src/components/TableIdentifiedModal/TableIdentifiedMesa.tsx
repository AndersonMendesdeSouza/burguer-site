import styles from "./TableIdentifiedMesa.module.css";

type TableIdentifiedMesaProps = {
  mesaId: string | null;
};

export default function TableIdentifiedMesa({ mesaId }: TableIdentifiedMesaProps) {
  if (!mesaId) {
    return null;
  }

  return (
    <div className={styles.indicator}>
      <div style={{ backgroundColor: "#0c0c0c",width: "40%", height: 20, border:" 1px solid #ffd500a7" , marginTop: -15, borderBottomRightRadius: 10, borderBottomLeftRadius: 15 }}>
        <span>Numero da mesa: </span>
        <strong className={styles.tableNumber}>{mesaId}</strong>
      </div>
    </div>
  );
}
