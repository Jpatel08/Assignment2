import logo from './logo.svg';
import './App.css';
import { Products } from './products';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';

const Navbar = ({ cartItemsCount, onViewChange }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light"
         style={{backgroundColor: "#ff6150"}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/" style={{color: "white"}}>My Store</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#"
                 onClick={() => onViewChange('products')}
                 style={{color: "white"}}>Products</a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#" id="navCheckout"
                 onClick={() => onViewChange('cart')}
                 style={{color: "white"}}>Checkout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};




const ProductGrid = ({ onAddToCart }) => {
  const [quantities, setQuantities] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  let numClick =0;

  const handleIncrement = (productId,numClick) => {
    numClick+=1;
    setQuantities({
      ...quantities,
      [productId]: (quantities[productId] || 0) + numClick,
    });
  };

  const handleDecrement = (productId) => {
    numClick -=1
    const newQuantities = { ...quantities };
    newQuantities[productId]--;
    if (newQuantities[productId] < 0) {
      newQuantities[productId] = 0;
    }
    setQuantities(newQuantities);
  };

  const filteredProducts = Products.filter((product) => {
    return product.title.toLowerCase().includes(searchTerm.toLowerCase());
  });


  return (
    <div >
 <div className="d-flex justify-content-center mb-4">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search products"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button className="btn btn-primary searchCstm">Search</button>
    </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredProducts.map((product) => (
          <div className="col" key={product.id}>
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.title} />
              <div className="cardBG">
                <h5 className="card-title w">{product.title}</h5>
                <p className="card-text w">{product.description}</p>
                <p className="card-text w">${product.price}</p>
                <p className="card-text w"><small className="text-muted w">{product.rating.rate} ({product.rating.count})</small></p>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                  <button className="btn btn-primary me-2 btn-custom" onClick={() => onAddToCart({ ...product, quantity: (quantities[product.id] || 0) + 1 })}>Add to Cart</button>                    <span className="fs-5">{quantities[product.id] || 0}</span>
                  </div>
                  <div>
                    <button className="btn btn-secondary me-2" onClick={() => handleDecrement(product.id)}>-</button>
                    <button className="btn btn-secondary" onClick={() => handleIncrement(product.id,numClick)}>+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
};

const ShoppingCart = ({ cartItems, onRemoveFromCart, total }) => {
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
                <th scope="col">Quantity</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => onRemoveFromCart(item.id)}>Remove</button>
                  </td>
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



const Cart = ({ cartItems, onRemoveFromCart, total, onViewChange }) => {
  return (
    <div className="container mt-3">
      <h1>Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => onRemoveFromCart(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-price">Total: ${total}</div>
          <div>
            <form>

{/* NEED TO ADD FORM STUFF HERE FOR USER INFO */}
              
            <div></div><button className ="btn btn-danger" onClick={() => onViewChange('confirmation')}>Order</button>
            </form>
          </div>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};
const Confimation = ({cartItems, total, userInfo}) => {
  return(
    <div className="container mt-3">
      <h1>Confimation</h1>
      <>
      <table className="table">
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Image</th>
          <th scope="col"></th>
        </tr>
      </thead>
      {cartItems.map((item) => (
        <tr key={item.id}>
          <td>{item.title}</td>
          <td>${item.price}</td>
          <td>{item.quantity}</td>
          <td><img src={item.image} alt={item.title} className="img-thumbnail" width="115px" height="115px"></img></td>
        </tr>
      ))}
      </table>
      <div className="total-price">Total: ${total}</div>
      <div>
        
        <table className="table">
          <thread>
          <tr>
            <th scope="col">Full Name</th>
            <th scope="col">Card Info</th>
            <th scope="col">Address</th>
          </tr>
          </thread>
          {userInfo.map((item) => (
            <><td>{userInfo.firstName} {userInfo.lastName}</td>
            <td>{userInfo.cardInfo}</td>
            <td>{userInfo.address}</td></>

          ))}
        </table>
      </div>
      </>
    </div>
  )
}
const App = () => {
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
    const total = cartItems.reduce((total, item) => (total + item.price * item.quantity * 1.07), 0);
    return total.toFixed(2);
  };
  
  
  return (
    <div class="pageBG">
      <Navbar onViewChange={handleViewChange} cartItems={cartItems} />
      <div className="container">
        {view === 'products' && <ProductGrid onAddToCart={handleAddToCart} />}
        {view === 'cart' && <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} total={calculateTotal()} onViewChange={handleViewChange} />}
        {view === 'confirmation' && <Confimation cartItems={cartItems} total={0} userInfo={[]} />} 
      </div>
    </div>
  );
};


export default App;


