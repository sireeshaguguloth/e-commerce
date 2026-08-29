import React from 'react'
 import { mobileData } from '../data/mobiles'
 import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useState } from 'react'

const MobilePage = () => {
  const navigate = useNavigate()
  const [selectedProduct,setSelectedProduct]=useState([])
  const companyHandler=(mango)=>{
    if(selectedProduct.includes(mango)){
      setSelectedProduct(selectedProduct.filter(item => item !== mango))
    }else{
      setSelectedProduct([...selectedProduct,mango])
    }
  }
  const filterProduct=selectedProduct.length===0?
  mobileData : mobileData.filter((orange)=>selectedProduct.includes(orange.company))
  return (
    <>
    <Navbar />
    <div className="page-container">
    <div className="fullpage">
      <div className="pro-selected">
      <h3>Filter by Company</h3>
      {[...new Set(mobileData.map(phone => phone.company))].map((company, idx)=>{
        return(
          <div key={idx}>
          <label>
          <input type="checkbox"  
          checked = {selectedProduct.includes(company)}
          onChange={()=>companyHandler(company)}
          />
          {company}
          </label>
          </div>
        )
      })}
    </div>
    <div className="product-listing-area">
    <div className='pageSection'>{filterProduct.map((item, idx)=>{
    return(
        <div key={idx} className='pro-input' onClick={() => navigate(`/mobiles/${item.id}`)}
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
    </div>
    </div>
    </>
  )
}

export default MobilePage
