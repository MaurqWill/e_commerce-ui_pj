import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ProductList from './components/ProductList/ProductList';
import ProductForm from './components/ProductForm/Productform';
import HomePage from './components/HomePage/HomePage';
import CustomerList from './components/CustomerList/CustomerList';
import CustomerForm from './components/CustomerForm/CustomerForm';
import ProductDetails from './components/ProductDetails'; // Add this import
import NotFound from './components/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <div id="app-container">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/add-customer" element={<CustomerForm />} />
        <Route path="/edit-customer/:id" element={<CustomerForm />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/edit-product/:id" element={<ProductForm />} />
        <Route path="/products/:id" element={<ProductDetails />} /> {/* Add this route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
