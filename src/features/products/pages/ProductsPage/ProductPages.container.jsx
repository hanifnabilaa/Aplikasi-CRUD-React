import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductsAPI } from "../../../../api/products.api";

const ProductPagesContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductsAPI.list();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await ProductsAPI.delete(id);
        // Since fakestoreapi doesn't actually delete, we mimic it by filtering local state
        setProducts(products.filter((p) => p.id !== id));
        alert("Product deleted successfully (mock)");
      } catch (err) {
        console.error(err);
        alert("Failed to delete product");
      }
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return <div className="alert alert-danger text-center m-5">{error}</div>;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="fw-bold mb-0 text-dark">Products</h1>
        <Link
          to="/create"
          className="btn btn-primary btn-lg shadow-sm rounded-pill px-4"
        >
          <i className="bi bi-plus-lg me-2"></i>Create Product
        </Link>
      </div>

      <div className="row g-3 g-md-4">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div
              className="card h-100 border-0 shadow-sm hover-shadow transition-all product-card"
              style={{
                borderRadius: "1rem",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Image & Overlay Actions */}
              <div
                className="position-relative bg-white"
                style={{
                  height: "250px",
                  overflow: "hidden",
                }}
              >
                <Link
                  to={`/product/${product.id}`}
                  className="d-block w-100 h-100"
                >
                  <img
                    src={product.image}
                    className="card-img-top w-100 h-100 object-fit-contain p-4 product-image"
                    alt={product.title}
                  />
                </Link>
              </div>

              {/* Card Body */}
              <div className="card-body d-flex flex-column bg-white pt-3">
                <div className="mb-2">
                  <small
                    className="text-muted text-uppercase fw-semibold"
                    style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}
                  >
                    {product.category}
                  </small>
                </div>
                <Link
                  to={`/product/${product.id}`}
                  className="text-decoration-none text-dark mb-2"
                >
                  <h5
                    className="card-title text-truncate fw-bold mb-0"
                    title={product.title}
                  >
                    {product.title}
                  </h5>
                </Link>

                <div className="mt-auto pt-2 d-flex justify-content-between align-items-center">
                  <span className="fs-5 fw-bold text-primary">
                    ${product.price}
                  </span>

                  <div className="d-flex gap-2">
                    <Link
                      to={`/edit/${product.id}`}
                      className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                      title="Edit"
                    >
                      <i className="bi bi-pencil-fill small"></i>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(product.id);
                      }}
                      className="btn btn-sm btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                      title="Delete"
                    >
                      <i className="bi bi-trash-fill small"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .hover-shadow:hover {
            transform: translateY(-5px);
            box-shadow: 0 1rem 3rem rgba(0,0,0,.15)!important;
        }
        .transition-all {
            transition: all 0.3s ease;
        }
        .object-fit-contain {
            object-fit: contain;
        }
        .product-card:hover .product-image {
            transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default ProductPagesContainer;
