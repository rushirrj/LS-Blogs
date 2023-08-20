import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Signup from "./Components/Signup";
import SingleBlog from "./Components/SingleBlog";
import AllBlogs from "./Components/AllBlogs";
import CreateBlog from "./Components/CreateBlog";
import MyBlogs from "./Components/MyBlogs";
import EditBlog from "./Components/EditBlog";
import { Route, Routes } from "react-router-dom";
import Signin from "./Components/Signin";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  // const [userId, setUserId] = useState();
  const [user, setUser] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      
      setUser(true);
    } else {
      setUser(false);
      navigate("/");
    }
  }, []);

  const [data, setData] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get("/blogs");
      setData(res.data);
    };

    loadData();
  }, [reload]);
  // console.log(data)
  

  return (
    <div className="">
      <Navbar user={user} setUser={setUser} />
      <div
        className="flex justify-center overflow-y-scroll"
        style={{ height: "75vh" }}
      >
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route
            path="/Signin"
            element={<Signin user={user} setUser={setUser} />}
          />
          {user && <Route path="/singleblog/:id" element={<SingleBlog />} />}
          {user && (
            <Route path="/allblogs" element={<AllBlogs data={data} />} />
          )}
          {user && (
            <Route
              path="/createblog"
              element={<CreateBlog reload={reload} setReload={setReload} />}
            />
          )}
          {user && (
            <Route
              path="/myblogs"
              element={
                <MyBlogs data={data} reload={reload} user={user} setReload={setReload} />
              }
            />
          )}
          {/* {user &&<Route path="/edit/:id" element={<EditBlog/>} />} */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
