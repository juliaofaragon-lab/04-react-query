import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData): void => {
    const queryValue = formData.get("query");
    const normalizedQuery =
      typeof queryValue === "string" ? queryValue.trim() : "";

    if (!normalizedQuery) {
      toast.error("Введіть назву фільму.");
      return;
    }

    onSubmit(normalizedQuery);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <input
        className={css.input}
        type="text"
        name="query"
        placeholder="Введіть назву фільму"
        aria-label="Назва фільму"
      />
      <button className={css.button} type="submit">
        Пошук
      </button>
    </form>
  );
}
