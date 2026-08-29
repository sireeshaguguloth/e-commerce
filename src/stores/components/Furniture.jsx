import React from 'react';
import { furnitureData} from '../data/furniture';
import { useNavigate } from 'react-router-dom';
const Furniture = () => {
    const navigate = useNavigate();
    const firstFiveImages= furnitureData;
    return (
         <>
        <div className="proTittle">
            <h1>Furniture</h1>
        </div>
        <div className="product-section">
        {firstFiveImages.map((item, index)=>{
                return(
                    <div 
                      className="product-item" 
                      key={index}
                      onClick={() => navigate(`/furnitures/${item.id}`)}
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
export default Furniture