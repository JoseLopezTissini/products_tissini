import { ReactElement } from 'react';
import { PageWithLayout } from '../../core/types/layout.type';
import MainLayout from '../../layouts/main-layout';

const Products: PageWithLayout = () => {
  return <div></div>;
};

Products.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default Products;
