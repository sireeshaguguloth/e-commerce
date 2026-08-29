import React from 'react'
import { booksData } from '../data/books'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
const BookPage = () => {
  const navigate = useNavigate()
  return (
     <>
    <Navbar />
    <div className="page-container">
    <div className='pageSection'>{booksData.map((item, idx)=>{
    return(
        <div key={idx} className='pro-input' onClick={() => navigate(`/books/${item.id}`)}
          style={{ cursor: 'pointer' }}>
            <div className='pageImg'>
                <img src={item.image } alt={item.title}/>
            </div>
            <div className="proModel">
              {item.title},{item.author}
            </div>
        </div>
    )
    })}
    
    </div>
    </div>
    </>
  )
}

export default BookPage