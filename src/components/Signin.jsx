import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {

  // Define the two hooks for capturing/storing the users input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Declare the three additional hooks
  const[loading, setLoading] = useState("");
  const[success, setSuccess] = useState("");
  const[error, setError] = useState("");

  // Below we have the useNavigate hook to redirect us to another oage on successful login/signin
  const navigate = useNavigate()

  // Below is the function to handle the signin action
  const handleSubmit = async (e) => {
    // Prevent the page from loading
    e.preventDefault()

    // Update the loading hook with a message
    setLoading("Please wait while we authenticate your account...")

    try{
      // Create a FormData object that will hold the email and the password
      const formdata = new FormData()

      // Insert/append the email and the password in the FormData created 
      formdata.append("email", email);
      formdata.append("password", password);

      // Interact with axios for the response
      const response = await axios.post("https://jmmwikali.alwaysdata.net/api/signin", formdata); 

      // Set the loading hook back to default
      setLoading("");

      // Check whether the user exists as part of your response from the API
      if (response.data.user){
        // If user is there, definately the details entered during sign in are correct
        // setSuccess("Login Successful")
        // If it is successful, let a person get redirected to another page

        // Store user details
        // LocalStorage only stores strings
        localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/")

      }
      else{
        // Use is not found, that means the credentials entered in the form are incorrect
        setError("The email or password is incorrect. Please try again")
      }

      setTimeout(() => {
        setError("");
      }, 3000);

      console.log(response.data.user)

    }
    catch(error){
      // Set loading back to default
      setLoading("")

      // Update the error hook with an error message
      setError("Oops, something went wrong. Please try again...")
    }

  }

  return (
    <div className='row justify-content-center mt-5'>
      <div className="card col-md-6 shadow p-4">
        <h1 className='text-primary'>Sign In</h1> <br />

        <h5 className="text-info">{loading}</h5>
        <h4 className="text-success">{success}</h4>
        <h5 className="text-danger">{error}</h5>

        <form onSubmit={handleSubmit}>
          <input type="email"
          placeholder='Enter the email address here...'
          className='form-control'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)} /> <br />

          {/* {email} */}

          <input type="password"
          placeholder='Enter the password here...'
          className='form-control'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)} /> <br />

          {/* {password} */}

          <input type="submit"
          value={"Signin"}
          className='btn btn-primary w-100' /> <br /> <br />

          Don't have an account yet? <Link to={"/signup"}>Signup</Link>

        </form>
      </div>
    </div>
  )
}

export default Signin;

// How can you store the users details into the local storage