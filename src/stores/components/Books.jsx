import React from 'react';
import { booksData} from '../data/books';
import { useNavigate } from 'react-router-dom';

const Books = () => {
  const navigate = useNavigate();
  const firstFiveImages = booksData;
  
  return (
    <>
      <div className="proTittle">
        <h1>Books</h1>
      </div>
      <div className="product-section">
      {firstFiveImages.map((item, index) => {
          return (
            <div 
              className="product-item" 
              key={index}
              onClick={() => navigate(`/books/${item.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="product-image-container">
                <img className="product-image" src={item.image} alt={item.title} />
              </div>
              <div className="product-info">
                <p className="product-name">{item.title}</p>
                <p className="product-price">₹{item.price}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Books