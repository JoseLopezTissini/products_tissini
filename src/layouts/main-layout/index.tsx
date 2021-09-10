import React, { PropsWithChildren, useContext } from 'react';
import { CartContext } from '../../core/context/CartContext';

const MainLayout: React.FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  const {
    cart: { subtotal },
  } = useContext(CartContext);
  return (
    <div className="container mx-auto z-10 shadow|">
      <div className="w-full bg-blue-500 h-12 flex px-4">
        <div className="text-white my-auto">NextJs App</div>
        <div className="text-white ml-auto my-auto">Subtotal: {subtotal} </div>
      </div>
      {children}
    </div>
  );
};

export default MainLayout;
