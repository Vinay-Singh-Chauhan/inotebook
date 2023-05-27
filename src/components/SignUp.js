import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
const Signup = (props) => {
  const host=process.env.REACT_APP_BACKEND_HOST;
    let navigate=useNavigate()
    const [credentials, setCredentials] = useState({name:"",email:'',password:"",cpassword:""})
    const handleLogin=async (e)=>{
        // const {name , em,pass}=credentials;
        e.preventDefault();
        let url=`${host}/api/auth/createUser`;
        const response = await fetch(url, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}),
          });
          const json=await response.json();
        // console.log(json)
        if(json.success){
            props.showAlert("Successfully logged in","success")
            localStorage.setItem('token',json.authToken);
            navigate("/")
        }else{
            props.showAlert("invalid credentials","danger")
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
    <label htmlFor="exampleInputname" className="form-label">Name</label>
    <input type="text" value ={credentials.name} name="name" onChange={onChange} className="form-control" id="exampleInputname" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  {/* <div className="mb-3"> */}
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" value ={credentials.email} name="email" onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" onChange={onChange} name="password" value={credentials.password} className="form-control" id="exampleInputPassword1"/>
  </div>
  <div>
    <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
    <input type="cpassword" onChange={onChange} name="cpassword" value={credentials.cpassword} className="form-control" id="exampleInputPassword2"/>
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

export default Signup