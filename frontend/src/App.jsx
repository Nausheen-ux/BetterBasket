import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Challenge from './pages/Challenge';
import Cart from './components/Cart';
import SearchResults from './components/SearchResults';

function App() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredProducts([]);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.brand.toLowerCase().includes(lowerQuery)
      );
      setFilteredProducts(filtered);
    }
  }, [query, products]);

  return (
    <>
      <Navbar query={query} setQuery={setQuery} /> 
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchResults products={filteredProducts} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
