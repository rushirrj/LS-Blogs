import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import parse from "html-react-parser";
import { useLocation } from 'react-router-dom';

const SingleBlog = () => {
  // const { id } = useParams();
  const [data, setData] = useState()
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(`/blogs/${id}`)
        // const value = res.json();
        setData(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    loadData();
  }, [id])



  return (
    <div className="w-full flex justify-center py-4">
      {
        data ? (
          <>
            <div className="w-3/4">
              <p className="text-center font-bold text-2xl my-3">View Blog Post</p>
              <div className="h-1/3 flex items-center justify-center">
                {data?.img && (
                  <img className="p-2 pb-1 text-center max-h-full" src={data.img} />
                )}
              </div>

              <p className="py-3 font-bold text-2xl text-center">Title: {data.title}</p>
              <hr />
              <>
                {data.desc && (
                  <p className="py-2 text-center">
                    Description: {data.desc}
                  </p>
                )}
              </>
              <hr />
              <div className="flex justify-center items-center py-4"> {parse(data.body)}</div>
            </div>
          </>) :
          (<>Loading.....</>)
      }

    </div>
  )
}

export default SingleBlog