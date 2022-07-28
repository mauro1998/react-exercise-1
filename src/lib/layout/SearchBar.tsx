import { ChangeEvent, FormEvent, useState } from 'react';
import { useThemeContext } from '../contexts';

interface Props {
  value?: string;
  onSubmit: (value: string) => void;
}

function SearchBar(props: Props) {
  const { value: initialValue = '', onSubmit } = props;
  const { isDarkTheme } = useThemeContext();
  const [value, updateValue] = useState(initialValue);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateValue(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    const val = value.trim();
    onSubmit(val);
  };

  const inputStyleLight =
    'px-2 py-1 w-full font-sans text-sm rounded-md outline-sky-600 outline-1 border-[1px] placeholder:text-gray-400 placeholder:font-sans placeholder:text-sm placeholder:font-light';
  const inputStyleDark =
    'px-2 py-1 w-full font-sans text-sm rounded-md transition-colors bg-gray-700 focus:bg-gray-600 outline-none placeholder:text-slate-200 placeholder:font-sans placeholder:text-sm placeholder:font-light';

  return (
    <form
      className="flex items-center justify-center mb-4 w-full"
      onSubmit={handleFormSubmit}>
      <div className="w-full max-w-md relative">
        <input
          type="text"
          placeholder="Search..."
          className={isDarkTheme ? inputStyleDark : inputStyleLight}
          value={value}
          onChange={handleInputChange}
          autoFocus
        />
        <input
          type="submit"
          value="Go"
          className="absolute top-0 bottom-0 right-0 bg-sky-600 text-slate-50 px-2 rounded-r-md cursor-pointer"
        />
      </div>
    </form>
  );
}

export default SearchBar;
