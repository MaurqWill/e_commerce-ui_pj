import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, [id]);

  const handleOrderProduct = async (product) => {
    // Implement the order functionality here
    console.log(`Order product: ${product.name}`);
  };

  return (
    <Container className="mt-5">
      {product && (
        <div className="card">
          <img src={product.image_url} alt={product.name} />
          <h5>{product.name}</h5>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <Button onClick={() => handleOrderProduct(product)} variant="outline-success" size="sm">Order</Button>
        </div>
      )}
    </Container>
  );
}

export default ProductDetails;
