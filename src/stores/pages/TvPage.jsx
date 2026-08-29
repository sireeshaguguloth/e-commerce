import React from 'react'
import { tvData } from '../data/tv'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
const TvPage = () => {
  const navigate = useNavigate()
  return (
     <>
    <Navbar />
    <div className="page-container">
    <div className='pageSection'>{tvData.map((item, idx)=>{
    return(
        <div key={idx} className='pro-input' onClick={() => navigate(`/tv/${item.id}`)}
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

export default TvPage