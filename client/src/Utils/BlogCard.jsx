import React, { useEffect, useState } from "react";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Link ,useNavigate} from 'react-router-dom'

const BlogCard = (props) => {
  const navigate=useNavigate();

  const deleteBlog=async ({reload,setReload})=>{
    await axios
    .delete(`/blogs/${props.id}`, {
      headers: {
        Authorization: `${localStorage.getItem("user")}`,
      },
    })
    .then(() => {
      alert("deleted successfully.");
      if(props.reload){props.setReload(false);navigate('/allblogs')}
      else{props.setReload(true)
      navigate('/allblogs')}
    })
    .catch((err) => {
      console.log(err);
    });
  }
  return (
    <div  className="flex flex-col sm:flex-row w-[350px] md:w-[600px] p-3 m-3 sm:m-0 gap-7  justify-between hover:shadow-lg  rounded-sm border border-gray-300 cursor-pointer">  
      <div className="flex flex-col gap-4 ">
        <div >
          <h2 className="font-bold text-xl">{props.title}</h2>
        </div>
        <div>
          <p className="text-black">{props.desc}</p>
        </div>
      </div>
      <div>
        {props.admin ? (
          <div className="flex  sm:flex-col gap-4 sm:border-l sm:border-b sm:border-gray-500 pl-2 pb-2">
            {/* <div><DriveFileRenameOutlineOutlinedIcon className="cursor-pointer hover:text-navBlue hover:bg-gray-200 text-2xl"/></div> */}
            <DeleteIcon onClick={deleteBlog} className="cursor-pointer hover:text-navBlue hover:bg-gray-200 text-2xl"/>
            
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
