import { Routes, Route, Navigate } from "react-router-dom";
import ProductPagesContainer from "../features/products/pages/ProductsPage/ProductPages.container";
import ProductFormContainer from "../features/products/pages/ProductFormPage/ProductForm.container";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductPagesContainer />} />
      <Route path="/create" element={<ProductFormContainer />} />
      <Route path="/edit/:id" element={<ProductFormContainer />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
