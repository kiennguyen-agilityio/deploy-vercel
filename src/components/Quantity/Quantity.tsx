import './Quantity.css';

interface Props {
  productId: string;
  quantity: number;
  onQuantityChange: (productId: string, newQuantity: number) => void;
}

const QuantityControl: React.FC<Props> = ({ productId, quantity, onQuantityChange }) => {
  return (
    <div className="quantity">
      <button
        className="quantity-button btn-minus"
        onClick={() => onQuantityChange(productId, quantity - 1)}
        type="button"
      >
        -
      </button>
      <div className="quantity-line-number">
        <span className="quantity-text">{quantity}</span>
      </div>
      <button
        className="quantity-button btn-plus"
        onClick={() => onQuantityChange(productId, quantity + 1)}
        type="button"
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
