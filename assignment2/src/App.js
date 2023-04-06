import logo from './logo.svg';
import './App.css';
import { Products } from './products';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';

const Navbar = () => {
  const [view, setView] = useState('products');
  const [cartItems, setCartItems] = useState([]);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleAddToCart = (product) => {
    const itemIndex = cartItems.findIndex((item) => item.id === product.id);
    if (itemIndex === -1) {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    } else {
      const newCartItems = [...cartItems];
      newCartItems[itemIndex].quantity++;
      setCartItems(newCartItems);
    }
  };

  const handleRemoveFromCart = (productId) => {
    const newCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(newCartItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">My Store</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#" onClick={() => handleViewChange('products')}>Products</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => handleViewChange('cart')}>Shopping Cart ({cartItems.length})</a>
            </li>
          </ul>
        </div>
      </div>
      {view === 'products' && <ProductGrid onAddToCart={handleAddToCart} />}
      {view === 'cart' && <ShoppingCart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} total={calculateTotal()} />}
    </nav>
  );
};

const ProductGrid = ({ onAddToCart }) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {Products.map((product) => (
        <div className="col" key={product.id}>
          <div className="card">
            <img src={product.image} className="card-img-top" alt={product.title} />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">${product.price}</p>
              <p className="card-text"><small className="text-muted">{product.rating.rate} ({product.rating.count})</small></p>
              <button className="btn btn-primary" onClick={() => onAddToCart(product)}>Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ShoppingCart = ({ cartItems, onRemoveFromCart, total }) => {
  const getTotalPrice = () => {
    const totalPrice = cartItems.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price;
    }, 0);

    return totalPrice;
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td><button onClick={() => onRemoveFromCart(item.id)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-price">Total: ${total}</div>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Navbar;


