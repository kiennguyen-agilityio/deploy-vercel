import { createContext, useState, useMemo, ReactNode } from 'react';

export interface SearchContextProps {
  searchValue: string;
  onSearchValue: (value: string) => void;
  onResetSearchValue: () => void;
}
interface SearchProviderProps {
  children: ReactNode;
}

export const SearchContext = createContext<SearchContextProps>({} as SearchContextProps);

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const resetSearchValue = (): void => {
    setSearchValue('');
  };

  const setValue = (value: string): void => {
    setSearchValue(value);
  };

  const contextValue = useMemo(
    () => ({
      searchValue,
      setSearchValue,
      onResetSearchValue: resetSearchValue,
      onSearchValue: setValue,
    }),
    [searchValue, setSearchValue]
  );

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
};
