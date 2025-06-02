import React from 'react'
import Post from './Post'

const Posts = () => {
  return (
    <div className='mx-auto'>
      {
        [1,2,3,4,5,6].map((item,index)=> <Post key={index}/>)
      }
    </div>
  )
}

export default Posts
