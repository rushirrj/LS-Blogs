import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
const navigate = useNavigate()
const [hamburger, setHamburger] = useState(false);
// const [user,setUser]= useState(false);

const signout =() =>{
  localStorage.clear();
  props.setUser(false);
  navigate('/signin')
}

return (
    <div>
      <div className="flex justify-around items-center p-4 shadow-lg">
        {/* Sidebar starts */}
        <div className=" flex flex-col justify-between w-3/6 sm:w-56"
          style={{
            minHeight: "100vh",
            background: "rgb(57 61 70 / 94%)",
            padding: 10,
            boxShadow: "6px 0px 2px rgba(0, 0, 0, 0.15)",
            zIndex: 2,
            position: "fixed",
            top: 0,
            left: !hamburger ? "-100%" : 0,
            bottom: 0,
            transition: "300ms ease-in",
          }}
        >
          <span onClick={() => setHamburger(false)}
            style={{
              position: "absolute",
              right: 10,
              top: 10,
              zIndex: 2,
              cursor: "pointer",
            }}
          >
            <CloseIcon style={{ color: "white" }} />
          </span>
          <div>
            <div className="flex flex-col gap-7 pr-8 justify-center items-center pt-11 ">
              {/* <Link to="/allblogs" className="cursor-pointer text-lg font-bold text-white w-full text-center hover:border-r-2">
                All Blogs
              </Link> */}
              <Link to="/login" className="cursor-pointer text-lg font-bold text-white w-full text-center hover:border-r-2">
                  Login
              </Link>
              <Link to="/auth/signup" className="cursor-pointer text-lg font-bold text-white w-full text-center hover:border-r-2">
                Signup
              </Link>
            </div>
          </div>
        </div>
        {/* Sidebar Ends */}
        <div className="flex flex-row sm:pl-8">
          <div  href="/blogs/allblogs" className="text-black cursor-pointer">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJdR77HH7k3UxrZRqPnoBaOs_-43zHXd1C3A&usqp=CAU" alt="" className="h-10 sm:h-10" />
          </div>
        </div>
        <div className="hidden md:flex flex-row gap-7 pr-8 justify-center items-center ">
        {
          props.user ? (
            <>
              <Link to="/allblogs"  className="cursor-pointer text-lg font-bold hover:underline">
                All Blogs
              </Link>
              <Link to="/myblogs" className="cursor-pointer text-lg font-bold hover:underline">
                My Blogs
              </Link>
              <Link to="/createblog" className="cursor-pointer text-lg font-bold hover:underline">
                Create Post
              </Link>
              <div className="cursor-pointer text-lg font-bold hover:underline"
                onClick={signout}
              >
                Logout
              </div>
            </>
          ):(
            <>
            <Link to="/signin"  className="cursor-pointer text-lg font-bold hover:underline">
                Login
              </Link>
              <Link to="/"  className="cursor-pointer text-lg font-bold hover:underline">
                Signup
              </Link>
            </>
          )
        }
        </div>
        
        <div className="md:hidden cursor-pointer" onClick={() => {setHamburger(true);}}>
          <MenuIcon
            className="text-black"
            style={{ height: "32px", width: "32px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

