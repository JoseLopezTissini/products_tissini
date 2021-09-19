import { ReactElement, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';
import axios from 'axios';

import ProductItem from '@components/products/ProductItem';
import MainLayout from '@layouts/main-layout';

import { setPrices, setProducts } from '@core/store/products/products.action';
import { Product, ProductPrice } from '@core/models/products.model';
import { addProduct } from '@core/store/cart/cart.action';

const Products: NextPage & {
  getLayout: (page: ReactElement) => void;
} = ({ products }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const productsPrices: ProductPrice[] = products.map((product: Product) => ({
      productid: product.id,
      price: product.variants[0] ? +product.variants[0].price : 0,
    }));
    dispatch(setProducts(products));
    dispatch(setPrices(productsPrices));
  }, [dispatch, products]);

  const handleOnAdd = useCallback(
    (product: Product) => {
      dispatch(addProduct(product));
    },
    [dispatch]
  );

  return (
    <>
      {products.map((product: Product) => (
        <ProductItem
          product={product}
          handleOnAdd={handleOnAdd}
          key={product.id}
        />
      ))}
    </>
  );
};

Products.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

Products.getInitialProps = async () => {
  const response = await axios.get(
    'https://l8.tissini.dev/api/v3/categories/1/products'
  );
  const { products } = await response.data;
  return {
    products,
  };
};

export default Products;
