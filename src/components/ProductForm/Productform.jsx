import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

import style from './ProductForm.module.css'; 

function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("Success");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: ""
  });

  useEffect(() => {
    if (id) {
    
      async function fetchProduct() {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/products/${id}`);
          const { name, price, description } = response.data;
          setFormData({ name, price, description });
        } catch (error) {
          console.log(error);
        }
      }
      fetchProduct();
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      try {
        if (id) {
          await axios.put(`http://127.0.0.1:5000/products/${id}`, formData);
          setMessage(`Successfully updated product: ${formData.name}`);
        } else {
          await axios.post(`http://127.0.0.1:5000/products`, formData);
          setMessage(`Successfully added product: ${formData.name}`);
        }
        setMessageType("Success");
        setShowModal(true);
      } catch (error) {
        console.error("Error:", error);
        setMessageType("Error");
        setMessage(`Error ${id ? "updating" : "adding"} product to the server. Please try again.`);
        setShowModal(true);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/products');
  };

  return (
    <Container>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="border border-white rounded p-4">
        <h3>{id ? "Edit Product" : "Add Product"}</h3>
        <FloatingLabel htmlFor="name" label="Name" className="mb-3 text-dark">
          <Form.Control type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter product name" required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please provide a valid product name.</Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel htmlFor="price" label="Price" className="mb-3 text-dark">
          <Form.Control type="number" id="price" name="price" value={formData.price} onChange={handleChange} placeholder="Enter product price" required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please provide a valid product price.</Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel htmlFor="description" label="Description" className="mb-3 text-dark">
          <Form.Control as="textarea" id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Enter product description" required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please provide a valid product description.</Form.Control.Feedback>
        </FloatingLabel>
        <Button type="submit" className={`${style.button} btn btn-primary w-25`}>{id ? "Update" : "Submit"}</Button>
      </Form>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{messageType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
      </Modal>
    </Container>
  );
}

export default ProductForm;
