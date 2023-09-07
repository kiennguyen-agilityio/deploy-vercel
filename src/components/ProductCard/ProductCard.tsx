import { memo } from 'react';
import { Link } from 'react-router-dom';

// interfaces
import Product from '@/interface/Product';

// style
import './ProductCard.css';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const handleRenderRating = (rating: number) => {
    const stars = Array.from({ length: 5 }, (_, index) => (
      <i key={index} className={`fa-solid fa-star${index < rating ? ' checked' : ''}`} />
    ));

    return stars;
  };

  const handleRenderLabel = (quantity: number, discountPercent: number) => {
    if (product.quantity <= 0 || product.discountPercent > 0) {
      const discountedPrice = product.price - product.price * (discountPercent / 100);

      return (
        <div className="product-discount">
          {quantity === 0 ? (
            <span>Sold out</span>
          ) : (
            <>
              <span className="discounted-price">${discountedPrice.toFixed(0)}</span>
              <del className="product-cost">${product.price.toFixed(0)}</del>
              <span className="discount-percent">-{discountPercent}%</span>
            </>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <article className={`product-card ${product.id}`}>
      <Link to={`/products/${product.id}`} key={product.id}>
        <img src={product.image} alt={product.name} />
        <h3 className="name">{product.name}</h3>
        <div className="rating">
          {handleRenderRating(5)}
          <span className="sell-count">({product.sale} sells)</span>
        </div>
        <span className="price">
          {product.discountPercent > 0
            ? handleRenderLabel(product.quantity, product.discountPercent)
            : `$${product.price.toFixed(0)}`}
        </span>

        <div className="heart-icon">
          <i className="fa-solid fa-heart" />
        </div>
      </Link>
    </article>
  );
};

export default memo(ProductCard);
