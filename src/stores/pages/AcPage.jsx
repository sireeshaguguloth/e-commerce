import React from 'react'
import { acData } from '../data/ac'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
const AcPage = () => {
  const navigate = useNavigate()
  return (
     <>
    <Navbar />
    <div className="page-container">
    <div className='pageSection'>{acData.map((item, idx)=>{
    return(
        <div key={idx} className='pro-input' onClick={() => navigate(`/ac/${item.id}`)}
          style={{ cursor: 'pointer' }}>
            <div className='pageImg'>
                <img src={item.image } alt={item.model}/>
            </div>
            <div className="proModel">
              {item.company},{item.model}
            </div>
        </div>
    )
    })}
    
    </div>
    </div>
    </> 
  )
}

export default AcPage