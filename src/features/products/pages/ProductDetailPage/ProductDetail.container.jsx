import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductsAPI } from "../../../../api/products.api";

const ProductDetailContainer = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await ProductsAPI.get(id);
        setProduct(data);
      } catch (err) {
        setError("Failed to load product details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">{error}</div>
        <div className="text-center">
          <Link to="/" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );

  if (!product)
    return <div className="text-center py-5">Product not found</div>;

  return (
    <div className="container py-5">
      <Link to="/" className="btn btn-outline-secondary mb-4">
        <i className="bi bi-arrow-left me-2"></i>Back to Products
      </Link>

      <div
        className="card border-0 shadow-sm"
        style={{ borderRadius: "1rem", overflow: "hidden" }}
      >
        <div className="row g-0">
          <div className="col-md-5 bg-white d-flex align-items-center justify-content-center p-4 p-md-5">
            <img
              src={product.image}
              className="img-fluid object-fit-contain"
              alt={product.title}
              style={{ maxHeight: "400px" }}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body p-4 p-md-5 h-100 d-flex flex-column">
              <span className="badge bg-light text-secondary mb-2 align-self-start text-uppercase small px-2 py-1 border">
                {product.category}
              </span>
              <h2 className="card-title fw-bold text-dark mb-3">
                {product.title}
              </h2>
              <h3 className="text-primary fw-bold mb-4">${product.price}</h3>

              <div className="mb-4">
                <h5 className="fw-bold mb-2">Description</h5>
                <p
                  className="card-text text-muted"
                  style={{ lineHeight: "1.6" }}
                >
                  {product.description}
                </p>
              </div>

              <div className="mt-auto d-flex gap-2">
                <button className="btn btn-primary btn-lg px-4 rounded-pill">
                  <i className="bi bi-cart-plus me-2"></i>Add to Cart
                </button>
                <button className="btn btn-outline-success btn-lg px-4 rounded-pill">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailContainer;
