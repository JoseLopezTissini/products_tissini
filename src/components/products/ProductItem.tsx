import Image from 'next/image';
import React from 'react';

import { Product } from '../../core/models/products.model';
import ProductPrice from './ProductPrice';
const noImageUrl =
  'https://programacion.net/files/article/20161110041116_image-not-found.png';

const ProductItem: React.FunctionComponent<ProductItemProps> = ({
  product,
  handleOnAdd,
}) => {
  console.log('Product item');
  return (
    <div className="my-4">
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
        <div>{product.name}</div>
        <div>{product.category.name}</div>
        <ProductPrice id={product.id} />
        <button
          className="uppercase px-4 py-1 bg-gray-100 shadow"
          onClick={() => handleOnAdd(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

interface ProductItemProps {
  product: Product;
  handleOnAdd: (product: Product) => void;
}

export default React.memo(ProductItem);
