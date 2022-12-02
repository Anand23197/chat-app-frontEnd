import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/Logo.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { LoginRoute } from '../utils/APIRoutes';

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  .brand{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img{
      height: 5rem;
    }
    h1{
      color: white;
      text-transform: uppercase;
    }
  }
  form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input{
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius:  0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus{
        border: 0.1rem solid #997af0;
        outline: none;

      }
    }
    button{
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius:  0.4rem;
      text-transform: uppercase;
      transition : 0.5s ease-in-out;
      &:hover{
        background-color: #4e0eff ;
      }
    }
    span{
      color: white;
      text-transform: uppercase;
      a{
        color: #4e0eff;
        text-decoration : none
      }
    }
  }
`
const toastOptions = {
  position : "bottom-right",
  autoClose : 8000,
  pauseOnHover: true,
  theme: "dark"
}
const Login = () => {
  const navigate = useNavigate();
  const[values, setValues] = useState({
    username : "",
    password : ""
  })
  useEffect(()=>{
     if(localStorage.getItem('chat-app-user')){
      navigate('/');
     }
  },[])
    const handleSubmit =async (event)=>{
        event.preventDefault();
        if(handleValidation()){
      const {password, username} = values;
            const {data} = await axios.post(LoginRoute, {
              username,
              password
            });
             debugger
            if(data.status === false){
              toast.error(data.msg, toastOptions);
            }
            if(data.status === true){
              localStorage.setItem('chat-app-user', JSON.stringify(data.user))
              navigate("/");
            }
            
        }
    }
    const handleChange = (event)=>{
         setValues({ ...values,[event.target.name] : event.target.value})
    }

    const handleValidation = ()=>{
      debugger
      const {password, username} = values;
        if(password === ""){
          toast.error("password and cinfirm password should be same", toastOptions);
          return false;
        }else if(username.length === ""){
          toast.error("Username and password is required", toastOptions);
          return false;
        }
        return true;
    } 
  return (
    <>
     <FormContainer>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className='brand'>
            <img src={Logo} alt="" />
            <h1>snappy</h1>
            </div>
            <input type="text" placeholder='Username' min={2} name='username' onChange={e=>handleChange(e)} />
            <input type="password" placeholder='Password' name='password' onChange={e=>handleChange(e)} />
            <button type='submit'>Login</button>
            <span>Don't have an account ? <Link to="/register">Register</Link></span>
        </form>
     </FormContainer>
     <ToastContainer/>
    </>
  )
}


export default Login