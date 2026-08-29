import React from 'react';
import { fridgeData } from '../data/fridge';
import { useNavigate } from 'react-router-dom';
const Fridge = () =>{
    const navigate = useNavigate();
    const firstFiveImages= fridgeData;
return(
    <>
    <div className="proTittle">
     <h1>Fridge</h1>
    </div>      
      <div className="product-section">
      {firstFiveImages.map((item, index) => {
          return (
            <div 
              className="product-item" 
              key={index}
              onClick={() => navigate(`/fridge/${item.id}`)}
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
 export default Fridge