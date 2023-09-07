import { useState, useEffect, useContext, useCallback } from 'react';

import { useParams } from 'react-router-dom';

// constants
import { PRODUCTS_API } from '@/constants/api';

// contexts
import { CartContext } from '@/contexts/CartProvider';
import { useToast } from '@/contexts/ToastProvider';
import { ListProductContext } from '@/contexts/ProductProvider';

//  layouts
import DefaultLayout from '@/layouts/DefaultLayout/DefaultLayout';

// components
import Toast from '@/components/Toast/Toast';
import ProductInformation from './ProductInfoChange';
import ProductDescription from '@/pages/ProductDetail/Description';
import ProductImage from '@/components/Image';

// styles
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const { productId } = useParams();
  const { toast, setToast } = useToast();
  const { products } = useContext(ListProductContext);
  const { onAddToCart, onUpdateCart } = useContext(CartContext);

  const selectedProduct = products?.find((product) => product.id === productId);

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  const [quantity, setQuantity] = useState<number>(selectedProduct.quantity || 0);

  const handleColorChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>): void => {
      setSelectedColor(event.target.value);
      if (selectedProduct) {
        const updatedProduct = { ...selectedProduct, color: event.target.value };
        onUpdateCart(selectedProduct.id.toString(), updatedProduct, PRODUCTS_API);
      }
    },
    [selectedProduct, onUpdateCart]
  );

  const handleQuantityChange = async (productId: string, value: number) => {
    setQuantity(value);
    await onUpdateCart(productId, { quantity: value }, PRODUCTS_API);
  };

  /**
   * Add the selected product to the cart
   * @param {Product} product
   *
   */
  const handleAddToCart = useCallback(async (): Promise<void> => {
    if (selectedProduct) {
      const isProductInCart = products?.some((item) => {
        return item.id === selectedProduct.id;
      });

      // Check if the product is already in the cart
      if (!isProductInCart) {
        setToast((prevToast) => ({
          ...prevToast,
          status: 'error',
          message: 'Product already exists in the cart',
          openPopup: true,
        }));
      } else {
        const updatedProduct = {
          ...selectedProduct,
          quantity: quantity,
          color: selectedColor,
        };

        // Add the updated product to the cart
        await onAddToCart(updatedProduct);

        setToast((prevToast) => ({
          ...prevToast,
          status: 'success',
          message: 'Successfully added to cart',
          openPopup: true,
        }));
      }
    }
  }, [onAddToCart, products, selectedProduct, selectedColor, setToast, quantity]);

  const handleClose = (): void => {
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
      <div className="product-detail-page">
        <header className="product-detail-header">Product Detail</header>
        <div className="product-detail-container">
          <ProductImage image={selectedProduct?.image || ''} />

          <ProductInformation
            onColorChange={handleColorChange}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            onAddToCart={handleAddToCart}
            id={selectedProduct.id}
            name={selectedProduct.name}
            price={selectedProduct.price}
            discountPercent={selectedProduct.discountPercent}
            sale={selectedProduct.sale}
          />
        </div>

        <ProductDescription description={selectedProduct.description || ''} />
      </div>
      {toast.openPopup && (
        <Toast status={toast.status} message={toast.message} onClose={handleClose} />
      )}
    </DefaultLayout>
  );
};

export default ProductDetail;
