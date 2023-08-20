import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../Utils/BlogCard";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const MyBlogs = ({ data, reload, setReload, user }) => {
  const uid = localStorage.getItem("id");
  const myBlogs = data?.filter((e) => e.uid == uid);
  console.log(data, user);
  console.log(myBlogs,uid);
  return (
    <div>
      {
            user ? (
            <div className='py-5 flex gap-6 items-center justify-center flex-col'>
                {myBlogs?.map((element, key) => {
                    return (
                        <Link to={`/singleBlog/${element.id}`} >
                            <BlogCard reload={reload} setReload={setReload} key={element.id} id={element.id} title={element.title} desc={element.desc} body={element.body} img={element.img} admin={true} />
                        </Link>
                    )
                })}
            </div>
            ) : (
                <>
                Loading....
                </>
            )
        }
    </div>
  );
};

export default MyBlogs;
