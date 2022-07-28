import React from 'react';
import { useThemeContext } from '../contexts';

interface Props {}

function ThemeSwitcher(props: Props) {
  const {} = props;
  const { isDarkTheme, toggleTheme } = useThemeContext();

  return (
    <label className="relative block cursor-pointer w-8 h-6 rounded-full mx-4">
      <input
        type="checkbox"
        checked={isDarkTheme}
        onChange={toggleTheme}
        className="peer absolute hidden"
      />
      <span className="absolute w-full h-full rounded-full transition-all bg-zinc-800 before:absolute before:w-4 before:h-4 before:text-slate-50 before:left-1 before:top-0 before:bottom-0 before:m-auto before:rounded-full before:transition-all before:shadow-inner-circle peer-checked:bg-slate-50 peer-checked:before:bg-zinc-800 peer-checked:before:shadow-transparent peer-checked:before:translate-x-2" />
    </label>
  );
}

export default ThemeSwitcher;
