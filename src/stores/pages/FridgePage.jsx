import React from 'react'
import { fridgeData } from '../data/fridge'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
const FridgePage = () => {
  const navigate = useNavigate()
  return (
  <>
    <Navbar />
    <div className="page-container">
    <div className='pageSection'>{fridgeData.map((item, idx)=>{
    return(
        <div key={idx} className='pro-input' onClick={() => navigate(`/fridge/${item.id}`)}
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

export default FridgePage