import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

let host = "https://srs-inotebook.herokuapp.com"

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate()

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {name, email, password} = credentials
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    })
    const json = await response.json()
    if (json.success) {
      // Save auth-token & redirect
      localStorage.setItem('token', json.authToken)
      props.showAlert(`Welcome ${name} !`, "success")
      navigate("/")
    }
    else {
      props.showAlert("Invalid details!", "danger")
    }
  }

  return (
    <div className='mt-3'>
      <h2>Signup for free to use iNoteBook!</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" onChange={onChange} className="form-control" id="name" name="name" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" onChange={onChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" required/>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" onChange={onChange} className="form-control" name="password" id="password" minLength={5} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input type="password" onChange={onChange} className="form-control" name="cpassword" id="cpassword" minLength={5} required />
        </div>

        <button type="submit" className="btn btn-success">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup