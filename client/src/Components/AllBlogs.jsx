import React,{useEffect, useState} from 'react'
import axios from 'axios'
import BlogCard from '../Utils/BlogCard'
import { Link } from 'react-router-dom'

const AllBlogs = ({data}) => {

  return (
    <div>
      <div className='py-5 flex gap-6 items-center justify-center flex-col'>
        {data?.map((element,key)=>{
          return(
          <Link to={`/singleBlog/${element.id}`} >
              <BlogCard key={element.id} id={element.id} title={element.title} desc={element.desc} admin={false}/>
            </Link>
          ) 
        })}
      </div>
    </div>
  )
}

export default AllBlogs