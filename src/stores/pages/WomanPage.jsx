import React from 'react'
import { womanData } from '../data/woman'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
const WomanPage = () => {
  const navigate = useNavigate()
  return (
     <>
    <Navbar />
    <div className="page-container">
    <div className='pageSection'>{womanData.map((item, idx)=>{
    return(
        <div key={idx} className='pro-input' onClick={() => navigate(`/woman/${item.id}`)}
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

export default WomanPage