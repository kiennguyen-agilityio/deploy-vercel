// components
import CartItemRow from './CartRow';

// styles
import './index.css';
import { CartContext } from '@/contexts/CartProvider';
import { useContext } from 'react';

interface Props {
  onQuantityChange: (id: string, value: number) => void;
  onColorChange: (id: string, event: React.ChangeEvent<HTMLSelectElement>) => void;
  onDeleteProduct: (productId: string) => void;
}

const CartTable: React.FC<Props> = ({ onQuantityChange, onColorChange, onDeleteProduct }) => {
  const { products, isLoading } = useContext(CartContext);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  /**
   * Calculates the total price of products.
   *
   * @param {Array<Object>} products - The array of products.
   * @returns {string} - The total price formatted as a string.
   */
  const handleCalculateTotalPrice = () => {
    // If there are products
    if (products) {
      // Calculate the total price
      const totalPrice = products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );

      // Return the total price formatted as a string
      return `$${totalPrice.toFixed(0)}`;
    }

    // Return $0 if there are no products
    return '$0';
  };

  return (
    <table className="table table-hover bordered-table">
      <thead>
        <tr className="cart-title">
          <th scope="col" className="product-name">
            Product
          </th>
          <th scope="col" className="flex-center">
            Quantity
          </th>
          <th scope="col" className="product-color">
            Color
          </th>
          <th scope="col" className="product-price">
            Price
          </th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => (
          <CartItemRow
            key={product.id}
            product={product}
            onQuantityChange={onQuantityChange}
            onColorChange={onColorChange}
            onDeleteProduct={onDeleteProduct}
          />
        ))}
      </tbody>
      <tfoot>
        <tr className="total-price-group">
          <td colSpan={3}></td>
          <td className="price-column">
            Total Price: <span className="total-price">{handleCalculateTotalPrice()}</span>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default CartTable;
