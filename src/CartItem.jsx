import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Hilfsfunktion: Preis in Zahl umwandeln (entfernt Währungszeichen)
  const parsePrice = (price) => {
    if (typeof price === 'string') {
      return parseFloat(price.replace(/[^0-9.,]/g, '').replace(',', '.')); // Entfernt alles außer Zahlen, Komma & Punkt
    }
    return parseFloat(price);
  };

  // Berechnet den Gesamtbetrag für alle Produkte im Warenkorb
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const itemCost = parsePrice(item.cost);
      if (!isNaN(itemCost)) {
        total += item.quantity * itemCost;
      }
    });
    return total.toFixed(2); // Rundet auf zwei Nachkommastellen
  };

  // Weiter einkaufen
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  // Erhöht die Anzahl eines Artikels
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Verringert die Anzahl eines Artikels (wenn 1, dann wird der Artikel entfernt)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Entfernt ein Element aus dem Warenkorb
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Berechnet die Gesamtkosten für einen einzelnen Artikel
  const calculateTotalCost = (item) => {
    const itemCost = parsePrice(item.cost);
    return isNaN(itemCost) ? '0.00' : (item.quantity * itemCost).toFixed(2);
  };

  // Checkout-Funktion (zukünftige Implementierung)
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: €{calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{parsePrice(item.cost).toFixed(2)} €</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: {calculateTotalCost(item)} €</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
     <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;



