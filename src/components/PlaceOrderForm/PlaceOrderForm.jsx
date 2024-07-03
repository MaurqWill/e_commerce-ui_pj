import { useState } from 'react'; 
import { useParams } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'; 
// import Modal from 'react-bootstrap/Modal';

import axios from 'axios'; 


import style from './PlaceOrderForm.module.css';

function PlaceOrderForm() {
  const { customerId } = useParams();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    product: '',
    quantity: 1,
    notes: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      try {
        const response = await axios.post(`http://127.0.0.1:5000/orders`, formData);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error placing order:', error);
        
      }
    }
  }

  return (
    <Container>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className={`${style.form} border border-white rounded p-4`}>
        <h3>Place Order</h3>
        <FloatingLabel
          htmlFor="product"
          label="Product"
          className="mb-3 text-dark"
        >
          <Form.Control type="text" id="product" name="product" placeholder="Enter product name" onChange={handleChange} required/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please enter a valid product name</Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel
          htmlFor="quantity"
          label="Quantity"
          className="mb-3 text-dark"
        >
          <Form.Control type="number" id="quantity" name="quantity" min="1" placeholder="Enter quantity" onChange={handleChange} required/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please enter a valid quantity</Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel
          htmlFor="notes"
          label="Notes"
          className="mb-3 text-dark"
        >
          <Form.Control as="textarea" id="notes" name="notes" rows={3} placeholder="Enter any notes (optional)" onChange={handleChange} />
        </FloatingLabel>
        
        <Button type="submit" className={`${style.button} btn btn-primary w-25`}>Place Order</Button>
      </Form>
    </Container>
  );
}

export default PlaceOrderForm;
