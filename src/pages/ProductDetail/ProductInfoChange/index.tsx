// components
import Select from '@/components/Select/Select';
import QuantityControl from '@/components/Quantity/Quantity';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon';

// constants
import { BUTTON_COLORS, BUTTON_SIZES, BUTTON_VARIANTS } from '@/enums/index';

// styles
import './index.css';
import ProductInfoDisplay from '../ProductInfoDisplay';

interface Props {
  id: string;
  name: string;
  price: number;
  discountPercent: number;
  sale: string;
  quantity: number;
  onQuantityChange: (productId: string, value: number) => void;
  onColorChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onAddToCart: () => void;
}

const ProductInformation: React.FC<Props> = ({
  quantity,
  id,
  name,
  price,
  discountPercent,
  sale,
  onQuantityChange,
  onColorChange,
  onAddToCart,
}) => {
  const discountedPrice = price - price * (discountPercent / 100);
  const renderRating = (rating: number) => {
    const stars = Array.from({ length: 5 }, (_, id) => (
      <i key={id} className={`fa-solid fa-star${id < rating ? ' checked' : ''}`} />
    ));

    return stars;
  };

  return (
    <div className="product-info">
      <ProductInfoDisplay
        name={name}
        sale={sale}
        discountPercent={discountPercent}
        discountedPrice={discountedPrice}
        price={price}
        renderRating={renderRating}
      />
      <Select onColorChange={onColorChange} />

      <QuantityControl productId={id} quantity={quantity} onQuantityChange={onQuantityChange} />

      <div className="button-add">
        <Button
          isDisabled={false}
          isLoading={false}
          label="Add to cart"
          variant={BUTTON_VARIANTS.PRIMARY}
          size={BUTTON_SIZES.SMALL}
          color={BUTTON_COLORS.DEFAULT}
          onClick={onAddToCart}
          leftIcon={
            <Icon icon="shopping_cart" className="material-symbols-outlined icon-shopping" />
          }
        />

        <Button
          isDisabled={false}
          isLoading={false}
          label="Add to wishlist"
          variant={BUTTON_VARIANTS.SECONDARY}
          size={BUTTON_SIZES.LARGE}
          color={BUTTON_COLORS.DEFAULT}
          onClick={onAddToCart}
          leftIcon={<Icon icon="favorite" className="material-symbols-outlined icon-heart" />}
        />
      </div>
    </div>
  );
};

export default ProductInformation;
