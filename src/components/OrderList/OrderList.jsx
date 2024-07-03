import { useState, useEffect } from 'react'; 

function OrderList({ customerId = "" }) {
  const [orders, setOrders] = useState([]);
  
  // useEffect to make an API call!
  useEffect( () => {
    // simulate making an API call
    if (customerId) {
      const fetchedOrders = [
        { id: 101, date: '2024-06-15'},
        { id: 102, date: '2024-06-16'}
      ]
      
      setOrders(fetchedOrders);
    }
    
  }, [customerId])
  
  
  return (
    <div >
      <h3>Orders</h3>
      <ul className="lists">
        {orders.map( (order) => (
          <li key={order.id}>
            Order ID: {order.id}, Date: {order.date}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default OrderList
