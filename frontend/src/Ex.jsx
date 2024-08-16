import React from 'react'
import { useSelector } from 'react-redux'
import Explore from './components/explorepage/Explore'
const Ex = () => {
    const posts=useSelector(state=>state.posts)
  return (
    <div>
        {
            posts.map((p,index)=>(
                <Explore post={p} key={index}/>      
            ))
        }

       
    </div>
  )
}

export default Ex
