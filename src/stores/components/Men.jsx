import React from 'react';
import{menData} from '../data/men';
import { useNavigate } from 'react-router-dom';
const Men = () =>{
    const navigate = useNavigate();
    const firstFiveImages= menData;
    return(
        <>
      <div className="proTittle">
        <h1>Men</h1>
      </div>
      <div className="product-section">
      {firstFiveImages.map((item, index) => {
          return (
            <div 
              className="product-item" 
              key={index}
              onClick={() => navigate(`/men/${item.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="product-image-container">
                <img className="product-image" src={item.image} alt={item.model} />
              </div>
              <div className="product-info">
                <p className="product-name">{item.model}</p>
                <p className="product-price">₹{item.price}</p>
              </div>
            </div>
          )
        })
        }
      </div>
    </>
    )
}
export default Men