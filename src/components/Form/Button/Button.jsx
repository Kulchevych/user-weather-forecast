import classes from "./styles.module.scss";

export function Button({ label, width, height, onClick, disabled }) {
  return (
    <button
      className={classes.Button}
      style={{ width, height }}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
