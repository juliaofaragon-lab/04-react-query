import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.wrapper} role="status">
      <span className={css.loader} aria-hidden="true" />
      <span>Завантаження...</span>
    </div>
  );
}
