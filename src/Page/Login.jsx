import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";


 
const Login = () => {
  const navigate=useNavigate()
  const location=useLocation()
  const from=location.state?.pathname || '/'
    const{login,setUser,forgotPassword,signInWithGoogle}=useAuth()
     const [email,setEmail]=useState(null)
     const [showPassword, setShowPassword] = useState(false);

// handle google login
const handlegoogleLogin = () =>{
     signInWithGoogle()
    
                  .then(()=>{
                    Swal.fire({
      position: "center",
      icon: "success",
      title: "User Login Successfully",
      showConfirmButton: false,
      timer: 1500
    });
       navigate(from, { replace: true })         })
}


    //  HANDLE LOGIN FUNC
    const handleLogin =async (e) =>{
     e.preventDefault()
      const email=e.target.email.value;
      const password=e.target.password.value;
    console.log({email,password})
   try {
    
    // login Func
    const result=await   login(email,password)
    // Update the State
setUser(result.user)
Swal.fire({
  position: "center",
  icon: "success",
  title: "User Login Successfully",
  showConfirmButton: false,
  timer: 1500
});
   } catch (error) {
Swal.fire({
  title: "Login Failed",
  text: `${error}`,
  icon: "error"
}); 
  }
    }

// HANDLE FORGOT PASSWORD
const handleForgotPassword =async()=>{
  if(!email){
   return Swal.fire({
  title: "Enter your Email",
  text: "Login Failed",
  icon: "error"
}); 
  }
  
  try {
    await forgotPassword(email)
   Swal.fire({
  title: "password Reset Email Send",
  text: "",
  icon: "success"
}); 
  } catch (error) {
  
Swal.fire({
  title: `${error}`,
  text: "Login Failed",
  icon: "error"
}); 
  }
}
    return (
<div>

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Login
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Don’t have an account?{" "}
          <Link to={"/signup"} className="text-purple-600 hover:underline">
            Register Now
          </Link>
        </p>

        <form onChange={(e)=>setEmail(e.target.value)} onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />

          {/* Password field with eye toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                // Eye-off icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.07.168-2.1.475-3.075m2.1-2.1A9.956 9.956 0 0112 3c5.523 0 10 4.477 10 10 0 1.07-.168 2.1-.475 3.075m-2.1 2.1L4.575 4.575M9.88 9.88a3 3 0 104.24 4.24"
                  />
                </svg>
              ) : (
                // Eye icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Forgot password on left */}
          <div className="text-left">
            <a onClick={handleForgotPassword} href="#" className="text-sm text-purple-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-400">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button onClick={handlegoogleLogin} className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Sign In With Google
        </button>
      </div>
    </div>

        </div>
    );
};

export default Login;