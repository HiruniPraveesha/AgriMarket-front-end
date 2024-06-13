import React from 'react';
import AddProduct from "./AddProduct";

const AddProductWrapper: React.FC = () => {
  const currentStep = 3; // Set the appropriate step here
  return <AddProduct currentStep={currentStep} />;
};

export default AddProductWrapper;