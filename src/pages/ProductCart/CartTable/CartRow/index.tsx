// helpers
import { colorOptions } from '@/constants/options';

// interfaces
import Product from '@/interface/Product';

// components
import QuantityControl from '@/components/Quantity/Quantity';

// styles
import './index.css';

interface Props {
  product: Product;
  onQuantityChange: (id: string, value: number) => void;
  onColorChange: (id: string, event: React.ChangeEvent<HTMLSelectElement>) => void;
  onDeleteProduct: (productId: string) => void;
}

const CartItemRow: React.FC<Props> = ({
  product: { id, image, name, quantity, color, price },
  onQuantityChange,
  onColorChange,
  onDeleteProduct,
}) => {
  return (
    <tr className="cart-item" key={id}>
      <td className="product-name-img">
        <img src={image} alt={name} aria-hidden="true" />
        {name}
      </td>
      <td className="quantity-control">
        <QuantityControl
          productId={id.toString()}
          quantity={quantity}
          onQuantityChange={onQuantityChange}
        />
      </td>
      <td>
        <div className="product-row-color">
          <div className="select-wrapper">
            <select value={color} onChange={(event) => onColorChange(id.toString(), event)}>
              {colorOptions.map((colorOption) => (
                <option key={colorOption} value={colorOption}>
                  {colorOption}
                </option>
              ))}
            </select>
          </div>
        </div>
      </td>
      <td className="product-price">
        ${price * quantity}
        <button
          className="delete-button"
          onClick={() => onDeleteProduct(id.toString())}
          tabIndex={0}
          type="button"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </td>
    </tr>
  );
};

export default CartItemRow;
