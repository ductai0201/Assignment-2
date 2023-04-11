import React from "react";
import { Outlet } from "react-router-dom";
type Props = {};

const ClientLayout = (props: Props) => {
  return (
    <>
      <header>
        
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
};

export default ClientLayout;
