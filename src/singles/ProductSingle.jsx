import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Navbar from '../stores/components/Navbar'
import { useCart } from '../stores/context/CartContext'

const ProductSingle = ({ dataSource }) => {
    const { id } = useParams()
    const { addToCart, decreaseQuantity, getQuantity } = useCart()
    const navigate = useNavigate()

    const product = dataSource.find((item) => item.id === id)

    if (!product) {
        return (
            <>
                <Navbar />
                <div className="product-not-found">
                    <h2>Product not found</h2>
                    <button onClick={() => navigate('/')}>Back to Home</button>
                </div>
            </>
        )
    }

    const quantity = getQuantity(product)

    return (
        <>
            <Navbar />
            <div className="product-detail-container">
                <div className="product-detail-section">
                    <div className="product-detail-image">
                        <img src={product.image} alt={product.model || product.title} />
                    </div>
                    
                    <div className="product-detail-info">
                        {(product.company || product.brand) && (
                            <div className="detail-company">
                                <h2>{product.company || product.brand}</h2>
                            </div>
                        )}
                        
                        <div className="detail-title">
                            <h1>{product.model || product.title}</h1>
                        </div>

                        {product.author && (
                            <div className="detail-author">
                                <p><strong>Author:</strong> {product.author}</p>
                            </div>
                        )}

                        <div className="detail-price">
                            <h2 className="price-tag">₹{product.price}</h2>
                        </div>

                        <div className="detail-description">
                            <h3>Description</h3>
                            <p>{product.description}</p>
                        </div>

                        {product.category && (
                            <div className="detail-category">
                                <p><strong>Category:</strong> {product.category}</p>
                            </div>
                        )}

                        <div className="detail-actions">
                            {quantity === 0 ? (
                                <button className="btn-add-cart" onClick={() => addToCart(product)}>
                                    Add to Cart
                                </button>
                            ) : (
                                <div className="qty-box">
                                    <span className="qty-label">In your cart</span>
                                    <div className="qty-control">
                                        <button
                                            className="qty-btn"
                                            aria-label="Decrease quantity"
                                            onClick={() => decreaseQuantity(product)}
                                        >
                                            −
                                        </button>
                                        <span className="qty-value">{quantity}</span>
                                        <button
                                            className="qty-btn"
                                            aria-label="Increase quantity"
                                            onClick={() => addToCart(product)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}
                            <button className="btn-back" onClick={() => navigate(-1)}>
                                Back
                            </button>
                        </div>

                        {quantity > 0 && (
                            <p className="detail-cart-note">
                                <Link to="/cart">Go to cart →</Link>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductSingle
