import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Company: {product.companyName}</p>
      <p>Category: {product.category}</p>
      <p>Price: {product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Discount: {product.discount}</p>
      <p>Availability: {product.availability ? 'Available' : 'Out of Stock'}</p>
      {/* Add random product image */}
      <img
        src={`https://picsum.photos/seed/${product.id}/400/300`}
        alt={product.name}
      />
    </div>
  );
};

export default ProductDetails;