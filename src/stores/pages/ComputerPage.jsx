import React from 'react'
 import { computerData } from '../data/computers'
 import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
const ComputerPage = () => {
  const navigate = useNavigate()
  return (
    <>
     <Navbar />
     <div className="page-container">
    <div className='pageSection'>{computerData.map((item, idx)=>{
    return(
        <div key={idx} className='pro-input' onClick={() => navigate(`/computers/${item.id}`)}
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

export default ComputerPage