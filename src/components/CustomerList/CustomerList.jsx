import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import styles from './CustomerList.module.css';

function CustomerList() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setCustomerId] = useState(null);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await axios.get("http://127.0.0.1:5000/customers");
        setCustomers(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (selectedCustomerId !== null) {
      alert(`New customer selected: ID ${selectedCustomerId}`);
    }
  }, [selectedCustomerId]);

  function handleCustomerId(id) {
    setCustomerId(id);
  }

  async function handleDeleteCustomer(id) {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/customers/${id}`);
      console.log(response);

      let currentCustomers = [...customers];
      currentCustomers = currentCustomers.filter(customer => customer.customer_id !== id);
      setCustomers(currentCustomers);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container className="mt-5">
      <h3>Customers</h3>
      <div className="grid-container">
        {customers.map((customer) => (
          <div key={customer.customer_id} className="card">
            <h5>{customer.name}</h5>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone}</p>
            <Button onClick={() => navigate(`/edit-customers/${customer.customer_id}`)} variant="outline-info" size="sm">Edit</Button>
            <Button onClick={() => handleDeleteCustomer(customer.customer_id)} variant="outline-danger" size="sm" className="ms-2">Delete</Button>
          </div>
        ))}
      </div>
      {selectedCustomerId && <OrderList customerId={selectedCustomerId} />}
    </Container>
  );
}

export default CustomerList;

