import { useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';

// services
import { CART_API } from '@/constants/api';

// constants
import ERROR_MESSAGES from '@/constants/errorMsg';

// contexts
import { CartContext } from '@/contexts/CartProvider';
import { useToast } from '@/contexts/ToastProvider';

// constants
import { BUTTON_COLORS, BUTTON_SIZES, BUTTON_VARIANTS } from '@/enums/index';

// layouts
import DefaultLayout from '@/layouts/DefaultLayout/DefaultLayout';

// components
import Toast from '@/components/Toast/Toast';
import Button from '@/components/Button/Button';
import CartTable from '@/pages/ProductCart/CartTable';

// styles
import './ProductCart.css';

/**
 * Handle quantity change for a cart item.
 * @param {string} id - The ID of the cart item.
 * @param {number} value - The new quantity value.
 * @throws {Error} If updating the cart fails.
 */
const ProductCart: React.FC = () => {
  const { onDeleteProductFromCart, onUpdateCart } = useContext(CartContext);
  const { toast, setToast } = useToast();

  const handleQuantityChange = async (id: string, value: number) => {
    try {
      // Update the cart with the new quantity
      await onUpdateCart(id, { quantity: value }, CART_API);
    } catch (error) {
      // If updating the cart fails, throw an error with a specific error message
      const errorMessage = ERROR_MESSAGES.UPDATE_FAIL;
      throw new Error(errorMessage);
    }
  };

  /**
   * Handle color change event.
   *
   * @param id - The id of the cart item.
   * @param event - The event object that triggered the color change.
   */
  const handleColorChange = async (id: string, event: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      // Get the new selected color from the event target
      const newSelectedColor = event.target.value;

      // Update the cart with the new color
      await onUpdateCart(id, { color: newSelectedColor }, CART_API);
    } catch (error) {
      // If updating the cart fails, throw an error with a specific error message
      const errorMessage = ERROR_MESSAGES.UPDATE_FAIL;
      throw new Error(errorMessage);
    }
  };

  /**
   * Handles the deletion of a product.
   *
   * @param {string} productId - The ID of the product to be deleted.
   * @returns {Promise<void>}
   */
  const handleDeleteProduct = async (productId: string): Promise<void> => {
    try {
      // Delete the product from the cart
      await onDeleteProductFromCart(productId);

      // Set the toast message to indicate successful deletion
      setToast((prevToast) => ({
        ...prevToast,
        status: 'success',
        message: 'Product deleted successfully',
        openPopup: true,
      }));
    } catch (error) {
      // If deleting the product fails, set the toast message to indicate the failure
      setToast((prevToast) => ({
        ...prevToast,
        status: 'error',
        message: 'Failed to delete product',
        openPopup: true,
      }));
    }
  };

  const handleClose = () => {
    setToast({ ...toast, openPopup: false });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast({ ...toast, openPopup: false });
    }, 1000);

    return () => clearTimeout(timer);
  }, [toast.openPopup]);

  return (
    <DefaultLayout>
      <div className="product-cart">
        <h1 className="cart-heading">Product Cart</h1>
        <CartTable
          onQuantityChange={handleQuantityChange}
          onColorChange={handleColorChange}
          onDeleteProduct={handleDeleteProduct}
        />

        <div className="cart-buttons ">
          <Button
            isDisabled={false}
            isLoading={false}
            label="Next to Shipping data"
            variant={BUTTON_VARIANTS.PRIMARY}
            size={BUTTON_SIZES.EXTRA_LARGE}
            color={BUTTON_COLORS.DEFAULT}
            onClick={handleClose}
          />
          <Link to="/">
            <Button
              isDisabled={false}
              isLoading={false}
              label="Back to HomePage"
              variant={BUTTON_VARIANTS.SECONDARY}
              size={BUTTON_SIZES.SMALL}
              color={BUTTON_COLORS.DEFAULT}
              onClick={handleClose}
            />
          </Link>
        </div>
      </div>
      {toast.openPopup && (
        <Toast status={toast.status} message={toast.message} onClose={handleClose} />
      )}
    </DefaultLayout>
  );
};

export default ProductCart;
