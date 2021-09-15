import React from 'react';

import { usePrice } from '@core/hooks/usePrice';

const ProductPrice = ({ id }: any) => {
  const price = usePrice(id);
  return <div>{price?.price}</div>;
};

export default ProductPrice;
