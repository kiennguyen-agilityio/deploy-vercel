import { ReactElement, memo } from 'react';

// components
import SubImages from './SubImage';

// styles
import './index.css';

interface Props {
  image: string;
}

const ProductImage = ({ image }: Props): ReactElement => {
  return (
    <div className="img-group">
      <SubImages image={image} imageCount={4} />
      <div className="product-main-img">
        <img src={image} alt="Product Large Image" aria-hidden="true" className="main-img" />
      </div>
    </div>
  );
};

export default memo(ProductImage);
