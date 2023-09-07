import { memo } from 'react';
interface Props {
  name: string;
  sale: string;
  discountPercent: number;
  discountedPrice: number;
  price: number;
  renderRating: (rating: number) => JSX.Element[];
}

const ProductInfoDisplay: React.FC<Props> = ({
  name,
  sale,
  discountPercent,
  discountedPrice,
  price,
  renderRating,
}) => {
  return (
    <div className="product-info-display">
      <h2 className="product-name">{name}</h2>
      <div className="rating">
        {renderRating(5)}
        <span className="sell-count">({sale} sells)</span>
      </div>
      {discountPercent > 0 ? (
        <div className="product-price-groups">
          <span className="discounted-price">${discountedPrice.toFixed(0)}</span>
          <del className="product-cost">${price.toFixed(0)}</del>
          <span className="discount-percent">-{discountPercent}%</span>
        </div>
      ) : (
        <p className="product-price-detail">${price.toFixed(0)}</p>
      )}
    </div>
  );
};

export default memo(ProductInfoDisplay);
