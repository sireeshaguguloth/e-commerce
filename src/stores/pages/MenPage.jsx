import React from 'react'
import { menData } from '../data/men'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
const MenPage = () => {
  const navigate = useNavigate()
  return (
     <>
    <Navbar />
    <div className="page-container">
    <div className='pageSection'>{menData.map((item, idx)=>{
    return(
        <div key={idx} className='pro-input' onClick={() => navigate(`/men/${item.id}`)}
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

export default MenPage