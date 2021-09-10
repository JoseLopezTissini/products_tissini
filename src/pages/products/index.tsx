import { ReactElement, useCallback, useState } from 'react';
import { GetStaticProps } from 'next';
import axios from 'axios';

import ProductItem from '../../components/products/ProductItem';
import MainLayout from '../../layouts/main-layout';

import { CartItem, Product } from '../../core/models/products.model';
import { getDiscount } from '../../core/utils/getDiscount';

const Products = (props: ProductsPageProps) => {
  const [products, setProducts] = useState(props.products);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  const handleOnAdd = useCallback(
    (product: Product) => {
      const currentProduct = cart.find(
        ({ variant }) => variant.id === product.variants[0].id
      );
  
      if (currentProduct) {
        const filteredCart = cart.filter(
          ({ variant }) => variant.id !== product.variants[0].id
        );
  
        const newCart = [
          ...filteredCart,
          {
            product: product,
            price: +product.variants[0].price,
            variant: product.variants[0],
            quantity: currentProduct.quantity + 1,
          },
        ];
  
        setCart(newCart);
  
        const newSubtotal = newCart.reduce(
          (acc, current) => acc + current.price * current.quantity,
          0
        );
        setSubtotal(newSubtotal);
  
        const newProducts = products.map((mappingProduct) => {
          const prices = mappingProduct.variants.map((variant) => +variant.price);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
  
          const discount = getDiscount(mappingProduct.category.name, subtotal);
          const newMin = (minPrice * (1 - discount)).toFixed(2);
          const newMax = (maxPrice * (1 - discount)).toFixed(2);
  
          return {
            ...mappingProduct,
            price: newMin === newMax ? `${newMax}` : `${newMin} - ${newMax}`,
          };
        });
  
        setProducts(newProducts);
      } else {
        setCart([
          {
            product: product,
            price: +product.variants[0].price,
            variant: product.variants[0],
            quantity: 1,
          },
        ]);
      }
    },
    [cart, products, subtotal],
  )

  return (
    <>
      {products.map((product) => (
        <ProductItem product={product} handleOnAdd={handleOnAdd} key={product.id} />
      ))}
    </>
  );
};

Products.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get(
    'https://v3.tissini.app/api/v3/categories/1/products'
  );
  const { products } = await response.data;
  return {
    props: {
      products,
    },
  };
};

interface ProductsPageProps {
  products: Product[];
}

export default Products;
