import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const navigate= useNavigate()
    const [value, setValues] = useState({
        username: "",
        email: "",
        password: "",
    })
    const addUser = async(e) =>{
        console.log(value)
        e.preventDefault();
        if(value.username===" " || value.email===" " || value.password===" " || value.username==="" || value.email==="" || value.password==="" || value.username===undefined || value.email===undefined || value.password===undefined ){
            toast("Add all the fields properly")
        }
        await axios.post("http://localhost:5000/auth/register", value)
        .then((res) => {
            toast("New User Created Sucessfully")
            setValues({
                username: "",
                email: "",
                password:"",
            }); // Clear the form   
            navigate("/signin")
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
                        <div className=' text-2xl underline'>Register Your Account</div>
                        <div><input type="text" className='p-1 rounded-sm border ' placeholder='Username' onChange={(e) => { setValues({ ...value, username: e.target.value }) }} /></div>
                        <div><input type="text" className='p-1 rounded-sm border ' placeholder='Email' onChange={(e) => { setValues({ ...value, email: e.target.value }) }} /></div>
                        <div><input type="text" className='p-1 rounded-sm border ' placeholder='Password..' onChange={(e) => { setValues({ ...value, password: e.target.value }) }} /></div>
                        <div className='w-2/3 flex justify-center items-center'>
                            <div className='rounded-lg  p-2 w-full flex justify-center items-center cursor-pointer bg-blue-500 hover:bg-blue-600'
                                onClick={addUser}
                            >
                                Register
                            </div>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup