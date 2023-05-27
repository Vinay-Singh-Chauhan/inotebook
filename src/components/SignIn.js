import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
// const dotenv = require('dotenv');
// dotenv.config({ path: './../../.env.local' });
const Signin = (props) => {
    const host=process.env.REACT_APP_BACKEND_HOST;
    let navigate=useNavigate()
    const [credentials, setCredentials] = useState({email:'',password:""})
    const handleLogin=async (e)=>{
        e.preventDefault();
        let url=`${host}/api/auth/login`;
        const response = await fetch(url, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}),
          });
          // console.log(response.body)
          const json=await response.json();
        // console.log(json)
        if(json.success){
            props.showAlert("Successfully logged in","success")
            localStorage.setItem('token',json.authToken);
            navigate("/")
        }else{
            props.showAlert("invalid credentials","warning")
        }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div>
        <div className='container'>
        <form onSubmit={handleLogin}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" value ={credentials.email} name="email" onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" onChange={onChange} name="password" value={credentials.password} className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
    </div>
  )
}

export default Signin