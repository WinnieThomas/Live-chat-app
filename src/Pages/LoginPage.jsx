import React,{useState,useEffect} from 'react'
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import '../index.css'

const LoginPage = () => {
  const {user, handleUserLogin} = useAuth()
  const [credentials, setCredentials] = useState({email:"", password:""})

  const navigate = useNavigate()

  useEffect(() => {
    if (user){
        navigate('/')
    }
}, [])

const handleInputChange = async(e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setCredentials({...credentials, [name]:value});
}

  return (
    <div className='auth--container'>
      <div className='form--wrapper'>
        <form onSubmit={(e)=> {handleUserLogin(e,credentials)}}>
         <div className='field-wrapper'> 
         <label>Email</label>
          <input required
          type="email"
          placeholder="Enter your email"
          name="email"
          value={credentials.email} 
          onChange={handleInputChange}
          />
         </div> 

          <div className='field--wrapper'> 
          <label>Password</label>
          <input required
          type="password"
          name="password"
          placeholder='Enter your password'
          value={credentials.password} 
          onChange={handleInputChange}
          />
          </div>

          <div className="field--wrapper">

            <input 
            type="submit"
            value="Login"
            className="btn btn--lg btn--main"
           />

    </div>

        </form>

        <p>Dont have an account? Register <Link to="/register">here</Link></p>
      </div>
      
    </div>
  )
}

export default LoginPage
