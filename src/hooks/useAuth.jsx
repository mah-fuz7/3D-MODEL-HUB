import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"

const useAuth = () =>{
    const authinfo=useContext(AuthContext)
    return authinfo
}
export default useAuth