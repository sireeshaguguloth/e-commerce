import React from 'react'
import { kitchenData } from '../data/kitchen'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
const KitchenPage = () => {
  const navigate = useNavigate()
  return (
     <>
    <Navbar />
    <div className="page-container">
    <div className='pageSection'>{kitchenData.map((item, idx)=>{
    return(
        <div key={idx} className='pro-input' onClick={() => navigate(`/kitchen/${item.id}`)}
          style={{ cursor: 'pointer' }}>
            <div className='pageImg'>
                <img src={item.image } alt={item.model}/>
            </div>
            <div className="proModel">
              {item.brand},{item.model}
            </div>
        </div>
    )
    })}
    
    </div>
    </div>
    </>
  )
}

export default KitchenPage