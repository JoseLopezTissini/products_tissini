import { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import axios from 'axios';

import MainLayout from '../../layouts/main-layout';

const noImageUrl =
  'https://programacion.net/files/article/20161110041116_image-not-found.png';

const products: any[] = [];
  
const Products = () => {

  return (
    <>
      {products.map((product) => (
        <div key={product.id} className="my-4">
          <Image
            src={
              product.images[0]
                ? `https://v3.tissini.app${product.images[0].url}`
                : noImageUrl
            }
            alt={product.name}
            width="300"
            height="300"
          />
          <div>
            <div>
              {product.name}
            </div>
            <div>
              {product.category.name}
            </div>
            <div>
              {product.price}
            </div>
            <button className="uppercase px-4 py-1 bg-gray-100 shadow">
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

Products.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

interface ProductsPageProps {
  products: any[];
}

export default Products;
