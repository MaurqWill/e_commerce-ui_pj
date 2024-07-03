import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    }

    fetchOrder();
  }, [orderId]);

  return (
    <div>
      {order ? (
        <div>
          <h2>Order Details</h2>
          <p>Order ID: {order.orderId}</p>
          <p>Order Date: {order.orderDate}</p>
          <p>Customer ID: {order.customerId}</p>
          <p>Shipping Address: {order.shippingAddress}</p>
          <p>Status: {order.status}</p>
          <p>Total Amount: {order.totalAmount}</p>

          <ul>
            {order.products.map(product => (
              <li key={product.productId}>
                {product.name} - {product.price}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
}

export default OrderDetails;
