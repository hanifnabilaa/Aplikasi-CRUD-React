import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ProductsAPI } from "../../../../api/products.api";

const ProductFormContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setFetching(true);
        const data = await ProductsAPI.get(id);
        setFormData({
          title: data.title,
          price: data.price,
          description: data.description,
          image: data.image,
          category: data.category,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load product details");
      } finally {
        setFetching(false);
      }
    };

    if (isEditMode) {
      loadProduct();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        await ProductsAPI.update(id, formData);
        alert("Product updated successfully (mock)");
      } else {
        await ProductsAPI.create(formData);
        alert("Product created successfully (mock)");
      }
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to save product");
      setLoading(false);
    }
  };

  if (fetching)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="card-header bg-primary text-white p-4">
              <h2 className="mb-0 fw-bold">
                {isEditMode ? "Edit Product" : "Create New Product"}
              </h2>
            </div>
            <div className="card-body p-4 p-md-5 bg-white">
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="form-label fw-bold text-secondary"
                  >
                    Product Title
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light border-0"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter product title"
                  />
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <label
                      htmlFor="price"
                      className="form-label fw-bold text-secondary"
                    >
                      Price ($)
                    </label>
                    <input
                      type="number"
                      className="form-control form-control-lg bg-light border-0"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="category"
                      className="form-label fw-bold text-secondary"
                    >
                      Category
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg bg-light border-0"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Electronics"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="form-label fw-bold text-secondary"
                  >
                    Image URL
                  </label>
                  <input
                    type="url"
                    className="form-control form-control-lg bg-light border-0"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    placeholder="https://..."
                  />
                  {formData.image && (
                    <div className="mt-2 text-center">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="img-thumbnail rounded-3"
                        style={{ maxHeight: "150px" }}
                      />
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="form-label fw-bold text-secondary"
                  >
                    Description
                  </label>
                  <textarea
                    className="form-control form-control-lg bg-light border-0"
                    id="description"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Product details..."
                  ></textarea>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-5">
                  <Link
                    to="/"
                    className="btn btn-outline-secondary btn-lg px-4 rounded-pill"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg px-5 rounded-pill shadow-sm"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Saving...
                      </>
                    ) : isEditMode ? (
                      "Update Product"
                    ) : (
                      "Create Product"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormContainer;
