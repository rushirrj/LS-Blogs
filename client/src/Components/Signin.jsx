import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const Signin = (props) => {
    const [value, setValues] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate();

    const login= async (e)=>{
        console.log(value)
        e.preventDefault();
        if(value.email===" " || value.password===" " || value.email==="" || value.password==="" || value.email===undefined || value.password===undefined ){
            toast("Add all the fields properly")
        }
        await axios.post("/auth/login", value)
        .then((res) => {
            toast("Logged in Successfully")
            setValues({
                email: "",
                password:"",
            }); // Clear the form
            localStorage.setItem("user",res?.data?.token)
            localStorage.setItem("id",res?.data?.id)
            props.setUser(true)
            navigate("/allblogs")
        })
        .catch((err) => {
            console.log(err);
        });

    }
    return (
        <div className='flex justify-center items-center py-8 sm:h-monitor'  >
            <div className='flex flex-col sm:flex-row px-5 py-9' style={{ boxShadow: "rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px, rgba(0, 0, 0, 0.2) 0px 1px 5px 0px" }}>
                <div className='h-56 w-full  flex justify-center items-center'>
                    <img className='w-3/4 h-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8a0bMHnjx5l6DBwLLM8shQQJLl2G-irVFrQ&usqp=CAU" alt="" />
                </div>
                <div className=' flex justify-center sm:justify-start items-center px-8 py-4 sm:py-0'>
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <div className=' text-2xl underline'>Login Your Account</div>
                        <div><input type="text" className='p-1 rounded-sm border ' placeholder='Email' onChange={(e) => { setValues({ ...value, email: e.target.value }) }} /></div>
                        <div><input type="text" className='p-1 rounded-sm border ' placeholder='Password..' onChange={(e) => { setValues({ ...value, password: e.target.value }) }} /></div>
                        <div className='w-2/3 flex justify-center items-center'>
                            <div className='rounded-lg  p-2 w-full flex justify-center items-center cursor-pointer bg-blue-500 hover:bg-blue-600'
                                onClick={login}
                            >
                                Login
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin