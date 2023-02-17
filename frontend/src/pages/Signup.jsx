import "../css/Signup.css"
import { useState } from "react"
import { useSignup } from "../hooks/useSignup"



const Signup = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {signup,isLoading,error} = useSignup()
    const handleSubmit = async(e) => {
        e.preventDefault()
        await signup(email,password)
    }

    return(
        <div className="page">
            <form className="signForm"onSubmit={handleSubmit}>
                <h3>Create your account</h3>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" id="email"
                    onChange={(e)=> setEmail(e.target.value)}
                    value={email}
                    />
                <label htmlFor="password">Password</label>
                <input 
                type="password" id="password"
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
                />
                <button disabled={isLoading}>Sign Up</button>
                {error && <label className="error">{error}</label>}
            </form>
        </div>
    )
}

export default Signup