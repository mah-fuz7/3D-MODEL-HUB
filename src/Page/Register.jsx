import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

 
const Register = () => {
    const {      signInWithGoogle,
        registerUser,
              updateUserProfile,
              setUser,
              user

}=useAuth()

// HANDEL GOOGLE SIGN IN
    const handleGoogleSignIn = () =>{
              signInWithGoogle()

              .then(()=>{
                Swal.fire({
  position: "center",
  icon: "success",
  title: "User Register Successfully",
  showConfirmButton: false,
  timer: 1500
});
              })

    }

// HANDLE EMAIL PASSWORD SIGN IN
    const handleEmailPassSignIn =async(e) =>{
e.preventDefault()
const name=e.target.name.value
const email=e.target.email.value
const password=e.target.password.value
const url=e.target.url.value
        console.log({name,email,password,url})

       try {
const result= await registerUser(email,password)
await updateUserProfile(name,url)

// update the Local state of user instantly
setUser(
    {
        ...result.user,
        displayName:name,
        photoURL:url,
    }
)
 Swal.fire({
  position: "center",
  icon: "success",
  title: "User Register Successfully",
  showConfirmButton: false,
  timer: 1500
});
console.log(user)
e.target.reset();
       } catch (error) {
        console.log(error.message)
       }
    }
    return (
       <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Register Now!
          </h2>
          <p className="text-sm text-center text-gray-500 mb-6">
            Already have an account?{" "}
            <Link to={'/login'} className="text-purple-600 hover:underline">
              Login Now
     </Link>
          </p>

          <form onSubmit={handleEmailPassSignIn} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <input
            name="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <input
              type="text"
              name="url"
              placeholder="Image-URL"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <input
            name="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Register
            </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-400">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign Up With Google
          </button>
        </div>
      </div>
    </div>
    );
};

export default Register;