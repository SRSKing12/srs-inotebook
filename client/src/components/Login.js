import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

let host = "https://srs-inotebook.herokuapp.com"

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        })
        const json = await response.json()
        if (json.success){
            // Save auth-token & redirect
            localStorage.setItem('token', json.authToken)
            navigate("/")
            props.showAlert("Logged in Successfully!", "success")
        }
        else{
            props.showAlert("Invalid credentials!", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='mt-3'>
            <h2>Login to continue to iNoteBook!</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" value={credentials.email} className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" value={credentials.password} className="form-control" name="password" id="password" onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-warning">Login</button>
            </form>
        </div>
    )
}

export default Login