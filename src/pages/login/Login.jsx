import React, { useContext, useState } from "react";
import "./Login.scss";
import Input from "../../comp/input/Input";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../comp/loader/Loader";
import { UserContext } from "../../Context";
const Login = () => {
  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const { getUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    try {
      setLoader(true);
      e.preventDefault();

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}auth/LoginUser`,
        formData
      );

      console.log(response);

      if (response.status === 200) {
        const token = response.data.data.token;
        const eid = response.data.data.eid;
        const role = response.data.data.role;

        localStorage.setItem("token", token);
        localStorage.setItem("eid", eid);
        localStorage.setItem("role", role);
        
        getUser(eid, token,role);
        toast.success("Login Successfull");
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.responseMessage === "Invalid Username") {
        toast.error("Invalid Username");
      }
      if (error.response.data.responseMessage === "Invalid Password") {
        toast.error("Invalid Password");
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader && <Loader />}
      <div class="login_parent parent">
        <div class="login_cont cont">
          <form class="login_form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div class="form-row">
              <Input
                label="Enter Your Username"
                value={formData.userName}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
              />
            </div>
            <div class="form-row">
              <Input
                className="password"
                type={toggle ? "text" : "password"}
                label="Enter Your Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <span class="eye" onClick={() => setToggle(!toggle)}>
                {toggle ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <button type="submit" class="btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
