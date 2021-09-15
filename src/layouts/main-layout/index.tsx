import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@core/store/store';

const MainLayout: React.FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { subtotal } = useSelector((state: RootState) => state.cart);

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
