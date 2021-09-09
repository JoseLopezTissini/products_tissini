import React, { PropsWithChildren } from 'react';

const MainLayout: React.FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <div className="container mx-auto z-10 shadow|">
      <div className="w-full bg-blue-500 h-12 flex px-4">
        <div className="text-white my-auto">NextJs App</div>
        <div className="text-white ml-auto my-auto">Subtotal: 0</div>
      </div>
      {children}
    </div>
  );
};

export default MainLayout;
