import React from 'react';
import { womanData} from '../data/woman';
import { useNavigate } from 'react-router-dom';
const Woman = () => {
    const navigate = useNavigate();
    const firstFiveImages= womanData;
    return (
         <>
        <div className="proTittle">
            <h1>Women</h1>
        </div>
        <div className="product-section">
        {firstFiveImages.map((item, index)=>{
                return(
                    <div 
                      className="product-item" 
                      key={index}
                      onClick={() => navigate(`/woman/${item.id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                        <div className="product-image-container">
                            <img className="product-image" src={item.image} alt={item.model}/>
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
export default Woman