import React from "react";
import CreateProductsForm from "../components/CreateProductsForm";
const SellerCreateProductsPage = () => {
  return (
    <div className="h-full flex items-center justify-center px-3 py-3  overflow-y-auto scrollbar-hide">
      <div className="max-h-2xl">
        <CreateProductsForm />
      </div>
    </div>
  );
};

export default SellerCreateProductsPage;
