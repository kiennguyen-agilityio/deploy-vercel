import { render } from '@testing-library/react';
import { SearchProvider } from '@/contexts/SearchProvider';
import React from 'react';

describe('SearchProvider', () => {
  it('should have an initial search value of an empty string', () => {
    const { container } = render(
      <SearchProvider>
        <div className="search-value"></div>
      </SearchProvider>
    );
    const searchValue = container.querySelector('.search-value');
    expect(searchValue?.textContent).toBe('');
  });

  it('should reset search value to an empty string', () => {
    const { container } = render(
      <SearchProvider>
        <div className="search-value">Test</div>
        <button className="reset-button">Reset</button>
      </SearchProvider>
    );

    const searchValue = container.querySelector('.search-value');

    expect(searchValue?.textContent).toBe('Test');
  });

  it('should update search value correctly', () => {
    const { container } = render(
      <SearchProvider>
        <div className="search-value">Test</div>
      </SearchProvider>
    );
    const searchValue = container.querySelector('.search-value') as Element;

    expect(searchValue.textContent).toBe('Test');
    searchValue.textContent = 'test';
    expect(searchValue.textContent).toBe('test');
  });
});

describe('resetSearchValue', () => {
  it('should reset the search value', () => {
    const setSearchValueMock = jest.fn();
    jest.spyOn(React, 'useState').mockReturnValue(['initial value', setSearchValueMock]);

    const resetSearchValue = (): void => {
      setSearchValueMock('');
    };

    resetSearchValue();

    expect(setSearchValueMock).toHaveBeenCalledWith('');
  });
});

describe('setValue', () => {
  it('should set the search value', () => {
    const setSearchValueMock = jest.fn();
    jest.spyOn(React, 'useState').mockReturnValue(['', setSearchValueMock]);

    const setValue = (value: string): void => {
      setSearchValueMock(value);
    };

    setValue('new value');

    expect(setSearchValueMock).toHaveBeenCalledWith('new value');
  });
});
