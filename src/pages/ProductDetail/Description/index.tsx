import { memo } from 'react';

// helpers
import { features } from '@/constants/options';

// styles
import './index.css';

interface Props {
  description: string;
}

const ProductDescription: React.FC<Props> = ({ description }) => {
  return (
    <div className="product-description-group">
      <div className="product-description">
        <h3>Item Detail</h3>
        <p>{description}</p>
      </div>
      <div className="feature-list">
        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default memo(ProductDescription);
