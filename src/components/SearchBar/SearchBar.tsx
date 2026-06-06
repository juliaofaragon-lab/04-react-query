import { useState, type FormEvent } from "react";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const normalizedQuery = value.trim();

    if (!normalizedQuery) {
      return;
    }

    onSubmit(normalizedQuery);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Введіть назву фільму"
        aria-label="Назва фільму"
      />
      <button className={css.button} type="submit">
        Пошук
      </button>
    </form>
  );
}
