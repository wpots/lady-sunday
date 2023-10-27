import styles from "./AppIcon.module.css";
export default function AppIcon({ name, style }: { name: string; style?: any }) {
  return (
    <span className="anticon" style={...style}>
      <svg className={styles["svg-icon"]}>
        <use href={`/icons/sprite.svg#${name}`} />
      </svg>
    </span>
  );
}
