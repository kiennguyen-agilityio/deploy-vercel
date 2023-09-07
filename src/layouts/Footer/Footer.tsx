import { memo } from 'react';

import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-distributed">
      <Link to="/">
        <div className="logo-footer">
          <i className="fa-sharp fa-solid fa-bag-shopping" />
          <span className="shop-name">Shop Bags</span>
        </div>
      </Link>

      <div className="social-icons">
        <a href="https://www.facebook.com">
          <i className="fa-brands fa-square-facebook" />
        </a>
        <a href="https://www.twitter.com">
          <i className="fa-brands fa-square-twitter" />
        </a>
        <a href="https://www.linkedin.com">
          <i className="fa-brands fa-linkedin" />
        </a>
        <a href="https://www.telegram.org">
          <i className="fa-brands fa-square-instagram" />
        </a>
      </div>
      <p className="copyright">2019 © Shopbag - All right reserved</p>
    </footer>
  );
};

export default memo(Footer);
