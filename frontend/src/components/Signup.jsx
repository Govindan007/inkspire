import React, { useState } from 'react'
import { Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Signup = () => {
  var navigate=useNavigate()
  var [inp, setInp]=useState({email:"", password:""})
  var [pass, setPass]=useState("")

    const inputHandler=(e)=>{
        setInp({...inp, [e.target.name]:e.target.value})
        console.log(inp)
    }

    


    const submitHandler=async()=>{
      if (inp.password !== pass) {
      alert("Passwords do not match!")
      return
      }

        try {
          const check = await axios.post("http://localhost:3004/l", {
            email: inp.email,
            password: inp.password
          })

          if (check.data.success) {
            // ✅ If login succeeds, user already exists
            alert("User already exists. Please log in.")
            setInp({ email: "", password: "" }) // ✅ Reset fields
            setPass("")                         // ✅ Reset confirm field
            return
          }
        } catch (err) {
          // ✅ If user not found (expected during signup), continue
          if (err.response?.data?.message !== "User not found") {
            alert("Something went wrong while checking user.")
            return
          }
        }

      axios.post('http://localhost:3004/s',inp)
          .then((res)=>{
            console.log(res)
            alert(res.data)
            navigate("/d")
          })
          .catch((err)=>{
            console.log(err)
          })
      
        
    }


  return (
      <div className='signup'style={{textAlign: 'center'}}>
      <Typography variant='h3'style={{fontFamily:'serif'}}>Sign-Up</Typography><br /><br />
      <TextField variant='outlined' placeholder='Username' type='email' value={inp.email} name="email" onChange={inputHandler}></TextField><br /><br />
      <TextField variant='outlined' placeholder='Password' type='password' value={inp.password} name="password" onChange={inputHandler}></TextField><br /><br />
      <TextField variant='outlined' placeholder='Confirm Password' type='password' name="pass" value={pass}></TextField><br /><br />
      <Button id='signupbutton' variant='contained' sx={{ mt: 2}}style={{textAlign:'center'}} onClick={submitHandler}>Sign-up</Button>
    </div>
  )
}

export default Signup






  


// try {
//         const res=await axios.post("http://localhost:3004/sc",{
//           email: inp.email,
//           password: inp.password
//         })
//         if(res.data.success){
//           alert("user already exist")
//           navigate("/s")
//         }
//         else{
          
//         }
//       } catch (err) {
//           alert("Signin failed " + (err.response?.data?.message || err.message))
//         }




// try {
//       const res=await axios.post("http://localhost:3004/l",{
//         email: inp.email,
//         password: inp.password
//       })
//       if(res.data.success){
//         alert("Login successfull")
//         navigate("/d")
//       }
//       else{
//         alert(res.data.message)
//       }
//     } catch (err) {
//       alert("Login failed: " + (err.response?.data?.message || err.message))
//     }