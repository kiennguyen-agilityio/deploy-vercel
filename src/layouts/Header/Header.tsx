import { useContext, memo } from 'react';
import { Link } from 'react-router-dom';

// contexts
import { SearchContext } from '@/contexts/SearchProvider';

// components
import SearchBar from '@/components/SearchBar/SearchBar';
import Logo from './Logo';

// style
import './Header.css';
import { useCartProducts } from '@/components/hooks/fetch';

const Header: React.FC = () => {
  const { data: products } = useCartProducts();

  const { searchValue } = useContext(SearchContext);
  const { onSearchValue } = useContext(SearchContext);

  return (
    <div className="navbar">
      <Logo />

      <SearchBar searchValue={searchValue} onSetSearchValue={onSearchValue} />

      <div className="icons">
        <Link to="/cart" className="cart-icon-container">
          <i className="material-symbols-outlined icon">shopping_cart</i>
          {products?.length && <span className="cart-item-count">{products?.length}</span>}
        </Link>
        <i className="material-symbols-outlined icon">favorite</i>
      </div>
      <div className="button-container">
        <button className="btn-sign-up" type="button">
          Sign Up
        </button>
        <button className="btn-login" type="button">
          Login
        </button>
      </div>
    </div>
  );
};

export default memo(Header);
