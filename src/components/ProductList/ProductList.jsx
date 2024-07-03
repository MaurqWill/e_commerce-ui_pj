import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './ProductList.module.css';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://127.0.0.1:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderProduct = async (product) => {
    
    console.log(`Order product: ${product.name}`);
  };

  return (
    <Container className="mt-5">
      <h3>Product List</h3>
      <div className="grid-container">
        {products.map(product => (
          <div key={product.id} className="card">
            <img src={product.image_url} alt={product.name} />
            <h5>{product.name}</h5>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <Button onClick={() => handleOrderProduct(product)} variant="outline-success" size="sm">Order</Button>
            <Button onClick={() => handleDeleteProduct(product.id)} variant="outline-danger" size="sm" className="ms-2">Delete</Button>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default ProductList;
