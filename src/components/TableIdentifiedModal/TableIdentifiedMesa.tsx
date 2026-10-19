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
      <div style={{ backgroundColor: "#30261A",width: "80%", height: 30, border:" 1px solid #ffd5009b" , paddingTop:5, marginTop: -10, borderBottomRightRadius: 15, borderBottomLeftRadius: 15 }}>
        <span>Numero da mesa: </span>
        <strong className={styles.tableNumber}>{mesaId}</strong>
      </div>
    </div>
  );
}
