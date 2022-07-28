import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import CommonProps from '../common/models/CommonProps';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export type ThemeContextState = {
  theme: Theme;
  isDarkTheme: boolean;
  backgroundColor: string;
  textColor: string;
  toggleTheme: () => void;
};

function isDarkTheme(theme: Theme) {
  return theme === Theme.Dark;
}

function getComputedThemeState(theme: Theme) {
  const lightThemeBgColor = 'bg-slate-50';
  const lightThemeTextColor = 'text-zinc-800';
  const darkThemeBgColor = 'bg-gray-800';
  const darkThemeTextColor = 'text-stone-100';
  const isCurrentDarkTheme = isDarkTheme(theme);
  const backgroundColor = isCurrentDarkTheme
    ? darkThemeBgColor
    : lightThemeBgColor;
  const textColor = isCurrentDarkTheme
    ? darkThemeTextColor
    : lightThemeTextColor;

  return {
    theme,
    isDarkTheme: isCurrentDarkTheme,
    backgroundColor,
    textColor,
  };
}

const ThemeContext = createContext<ThemeContextState>({
  ...getComputedThemeState(Theme.Light),
  toggleTheme: () => {},
});

interface ProviderProps extends CommonProps {}

export function ThemeContextProvider(props: ProviderProps) {
  const { children } = props;
  const defaultTheme = (localStorage.getItem('theme') as Theme) || Theme.Light;
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const toggleTheme = () =>
    setTheme((theme) => (isDarkTheme(theme) ? Theme.Light : Theme.Dark));
  const state = {
    ...getComputedThemeState(theme),
    toggleTheme,
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>
  );
}

interface ConsumerProps {
  children: (state: ThemeContextState) => ReactNode;
}

export function ThemeContextConsumer(props: ConsumerProps) {
  const { children } = props;

  return <ThemeContext.Consumer>{children}</ThemeContext.Consumer>;
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
