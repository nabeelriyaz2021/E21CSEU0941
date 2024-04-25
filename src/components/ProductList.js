import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products, filters, onFilterChange }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div>
      <h1>All Products</h1>

      <div>
        <label>
          Category:
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="Phone">Phone</option>
            <option value="Computer">Computer</option>
            {/* Add more category options */}
          </select>
        </label>

        <label>
          Company:
          <select
            name="company"
            value={filters.company}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="AMZ">AMZ</option>
            <option value="FLP">FLP</option>
            <option value="SUP">SUP</option>
            <option value="MYN">MYN</option>
            <option value="AZO">AZO</option>
          </select>
        </label>

        <label>
          Rating:
          <input
            type="number"
            name="rating"
            value={filters.rating}
            onChange={handleFilterChange}
            min="0"
            max="5"
            step="0.1"
          />
        </label>

        <label>
          Price Range:
          <input
            type="text"
            name="priceRange"
            value={filters.priceRange}
            onChange={handleFilterChange}
            placeholder="e.g. 100-500"
          />
        </label>

        <label>
          Availability:
          <select
            name="availability"
            value={filters.availability}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="true">Available</option>
            <option value="false">Out of Stock</option>
          </select>
        </label>
      </div>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              <h2>{product.name}</h2>
              <p>Company: {product.companyName}</p>
              <p>Category: {product.category}</p>
              <p>Price: {product.price}</p>
              <p>Rating: {product.rating}</p>
              <p>Discount: {product.discount}</p>
              <p>Availability: {product.availability ? 'Available' : 'Out of Stock'}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;