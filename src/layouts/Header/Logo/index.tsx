import { memo } from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <Link to="/">
    <div className="logo">
      <i className="fa-sharp fa-solid fa-bag-shopping" />
      <span className="shop-name">Shop Bags</span>
    </div>
  </Link>
);

export default memo(Logo);
