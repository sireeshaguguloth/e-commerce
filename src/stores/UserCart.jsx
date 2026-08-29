import React from 'react'
import { useCart } from './context/CartContext'
import Navbar from './components/Navbar'

const UserCart = () => {
    const {
        cartItems,
        removFromCart,
        addToCart,
        decreaseQuantity,
        totalQuantity,
        totalPrice,
    } = useCart()

    return (
        <>
            <Navbar />
            <div className="cart-page-container">
                <div className="cart-header">
                    <h1>Shopping Cart</h1>
                    <p className="cart-count">
                        {totalQuantity} item{totalQuantity !== 1 ? 's' : ''} in cart
                    </p>
                </div>

                <div className="cart-items-wrapper">
                    {cartItems.length === 0 ? (
                        <div className="cart-empty">
                            <h2>Your cart is empty</h2>
                            <p>Add some products to get started!</p>
                        </div>
                    ) : (
                        cartItems.map((item, index) => {
                            return (
                                <div className="cart-section" key={index}>
                                    <div className="cart-img">
                                        <img src={item.image} alt={item.model || item.title} />
                                    </div>
                                    <div className="cart-details">
                                        <h3>{item.product}</h3>
                                        <p className="cart-model">{item.model || item.title}</p>
                                        <h2>₹{item.price}</h2>
                                    </div>
                                    <div className="cart-actions">
                                        <div className="qty-control">
                                            <button
                                                className="qty-btn"
                                                aria-label="Decrease quantity"
                                                onClick={() => decreaseQuantity(item)}
                                            >
                                                −
                                            </button>
                                            <span className="qty-value">{item.quantity}</span>
                                            <button
                                                className="qty-btn"
                                                aria-label="Increase quantity"
                                                onClick={() => addToCart(item)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="cart-line-total">
                                            ₹{(Number(item.price) * item.quantity).toFixed(2)}
                                        </p>
                                        <button
                                            className="cart-remove-btn"
                                            onClick={() => removFromCart(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-summary">
                        <span>Total</span>
                        <span className="cart-total-price">₹{totalPrice.toFixed(2)}</span>
                    </div>
                )}
            </div>
        </>
    )
}

export default UserCart
