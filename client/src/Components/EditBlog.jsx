import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import axios from 'axios';
import { useNavigate ,useLocation} from 'react-router-dom';
import parse from "html-react-parser";

const EditBlog = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.pathname.split("/")[2];
    const[data,setData]= useState()

    const [blog, setBlog] = useState({
    title: "",
    body: "",
    img: "",
    desc: "",
    });
    
    useEffect(()=>{
        const loadData = async () => {
            try {
            const res = await axios.get(`http://localhost:5000/blogs/${id}`)
            // const value = res.json();
            setData(res.data)
            setBlog({...blog,title:data.title,body:data.body,img:data.img,desc:data.desc})
            } catch (error) {
            console.log(error)
            }
        }
        loadData()
    },[id])

    
    const [value, setValue] = useState('')


    const createNewBlog = async () => {
    await setBlog({ ...blog, body: value })
    console.log("BLOG: ", blog);
    if (
        blog.title === "" ||
        blog.body === "" ||
        blog.title === undefined ||
        blog.body === undefined
    ) {
        alert("Please fill all the fields");
        return;
    }
    await axios
        .post("http://localhost:5000/blogs", blog, {
            headers: {
                Authorization: localStorage.getItem("user"),
            },
        })
        .then((res) => {
            alert("New Post Created Successfully.");
            setBlog({
                title: "",
                body: "",
                img: "",
                desc: "",
            }); // Clear the form
            navigate('/allblogs')
        })
        .catch((err) => {
            console.log(err);
        });
    };
    const postImage = async (image) => {
    if (image === undefined || image.size < 100) {
        alert("Please select a valid image");
        return;
    }

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "omen123");

    await fetch("https://api.cloudinary.com/v1_1/omen123/image/upload", {
        method: "POST",
        body: data,
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setBlog({ ...blog, img: data.url });
        })
        .catch((error) => {
            console.log(error);
        });
    };

return (
    <div>
        <div className="w-1/2 pb-10">
            <p className="text-center font-bold text-2xl my-3">Edit Blog Post</p>
            <input
                className="mb-3 w-full bg-white border-0 border-b-2 px-4 py-2 focus:border-gray-300"
                type="text"
                value={blog.title}
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                placeholder="Add Title"
            />
            <input
                className="mb-3 w-full bg-white border-0 border-b-2 px-4 py-2 focus:border-gray-300"
                type="text"
                value={blog.desc}
                onChange={(e) => setBlog({ ...blog, desc: e.target.value })}
                placeholder="Add Description"
            />
            <input
                type="file"
                class="w-full bg-white border border-gray-300 rounded px-4 py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={(e) => {
                    postImage(e.target.files[0]);
                }}
            />
            <p className="text-center font-bold text-xl my-3">Add Blog Content</p>

            <ReactQuill theme='snow' value={value} onChange={setValue}></ReactQuill>


            <div className="flex justify-end gap-2">
                <button className="bg-blue-400 w-1/4 text-white rounded-sm mt-3">
                    Cancel
                </button>
                <button
                    onClick={createNewBlog}
                    className="bg-blue-400 w-1/4 text-white rounded-sm mt-3"
                >
                    Post
                </button>
            </div>
        </div>
    </div>
    )
}

export default EditBlog