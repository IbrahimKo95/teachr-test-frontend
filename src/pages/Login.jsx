import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../redux/authSlicer";
import ErrorBanner from "../components/ErrorBanner";


export default function Login() {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {isAuthenticated} = useSelector(state => state.auth)

    if (isAuthenticated) {
        window.location.href = "/"
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email || !password) {
            return
        }
        const body = {
            "username": email,
            "password": password
        }
        dispatch(login(body))
    }
    return (
        <div className="flex justify-center items-center h-full w-full flex-col">
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <ErrorBanner/>
                <form onSubmit={handleSubmit} className="mt-5">
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" className="mt-1 p-2 w-full border border-gray-300 rounded-lg" required/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" className="mt-1 p-2 w-full border border-gray-300 rounded-lg" required/>
                    </div>
                    <button type="submit" className="w-full bg-primary hover:opacity-75 text-white font-bold py-2 rounded-lg">Connexion</button>
                </form>
            </div>
        </div>
    )
}