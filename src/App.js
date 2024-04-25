import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';

function App() {
  
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    rating: '',
    priceRange: '',
    availability: '',
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      const {
        category,
        company,
        rating,
        priceRange,
        availability,
      } = filters;
      const [minPrice, maxPrice] = priceRange.split('-');
      const queryParams = new URLSearchParams({
        top: 10,
        minPrice: minPrice || '',
        maxPrice: maxPrice || '',
      });

      // const response = await axios.get(
      //   `http://20.244.56.144/test/companies/${company}/categories/${category}/products?${queryParams.toString()}`,
      //   headers: {
      //     'Authorization': `Bearer ${accessToken}`
      //   }
      // });
      const response = await axios.get(`http://20.244.56.144/test/companies/${company}/categories/${category}/products?${queryParams.toString()}`, {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE0MDQ0NzE5LCJpYXQiOjE3MTQwNDQ0MTksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjcwMjY0MWVlLTFjYjAtNDE2NC1iMzRlLWQxYTNmNTU0ODY2MiIsInN1YiI6ImUyMWNzZXUwOTQxQGJlbm5ldHQuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiUmVBc3oiLCJjbGllbnRJRCI6IjcwMjY0MWVlLTFjYjAtNDE2NC1iMzRlLWQxYTNmNTU0ODY2MiIsImNsaWVudFNlY3JldCI6ImlVUUdBUFJJc3ZKSGhQSG4iLCJvd25lck5hbWUiOiJNb2hhbW1lZCBOYWJlZWwgUml5YXoiLCJvd25lckVtYWlsIjoiZTIxY3NldTA5NDFAYmVubmV0dC5lZHUuaW4iLCJyb2xsTm8iOiJFMjFDU0VVMDk0MSJ9.8Vc6IUqM5y2ZjUJQXFY0GmjJahIG8aA3AWVUEd3NcHk`
        }
      });
      const products = response.data.map((product) => ({
        ...product,
        id: generateUniqueId(product),
      }));
      setProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const generateUniqueId = (product) => {
    return `${product.companyName}-${product.category}-${product.name}`;
  };

  const handleFilterChange = (filterName, filterValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
  };

  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">All Products</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/product/:id" element={<ProductDetails products={products} />} />
        <Route path="/" element={<ProductList products={products} filters={filters} onFilterChange={handleFilterChange} />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;