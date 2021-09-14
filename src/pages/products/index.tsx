import { useDispatch, useSelector } from 'react-redux';
import { ReactElement, useCallback, useEffect } from 'react';

import ProductItem from '@components/products/ProductItem';
import MainLayout from '@layouts/main-layout';

import { RootState } from '@core/store/store';
import { getProducts } from '@core/store/products/products.action';
import { Product } from '@core/models/products.model';
import { addProduct } from '@core/store/cart/cart.action';

const Products = () => {
  const { products } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleOnAdd = useCallback((product: Product) => {
    dispatch(addProduct(product));
  }, [dispatch]);

  return (
    <>
      {products.map((product) => (
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

export default Products;
