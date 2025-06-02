import axios from 'axios'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Login = () => {

    const [input, setInput] = useState({ username: '', password: '' })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await axios.post('https://socailenz-backend.onrender.com/api/user/login', input,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                })
            if (res.data.success) {
                toast.success(res.data.message || "Login successful!");
                navigate('/');
                setInput({ username: "", password: "" });
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)

        } finally {
            setLoading(false)
        }



    }



    return (
        <>
            <div className="min-h-screen bg-black flex flex-col items-center justify-center py-10 px-4 text-white">
                <div className="w-full max-w-sm bg-zinc-900 p-6 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-semibold font-cursive text-center mb-4  bg-gradient-to-r from-red-600 via-purple-500 to-red-400  text-transparent bg-clip-text">Socialenz</h1>

                    <form className="space-y-3" onSubmit={handleLogin}>
                        <input
                            type="text"
                            name='username'
                            value={input.username}
                            onChange={changeEventHandler}
                            placeholder="Username "
                            className="w-full px-4 py-2 bg-zinc-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            name='password'
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="Password"
                            className="w-full px-4 py-2 bg-zinc-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="w-full mt-3 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold flex justify-center items-center gap-2"
                            disabled={loading}
                        >
                            {loading && (
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    ></path>
                                </svg>
                            )}
                            {loading ? "Logining ..." : "Login "}
                        </button>
                    </form>

                    <div className="flex items-center justify-center my-4">
                        <div className="flex-grow border-t border-gray-700"></div>
                        <span className="mx-2 text-gray-400">OR</span>
                        <div className="flex-grow border-t border-gray-700"></div>
                    </div>

                    <div className="text-center mb-4">

                        <p className="mt-2 text-sm text-blue-400 hover:underline cursor-pointer">
                            Forgotten your password?
                        </p>
                    </div>
                </div>

                <div className="w-full max-w-sm text-center bg-zinc-900 border-t border-gray-800 py-4 mt-4 rounded shadow">
                    <p>
                        Don’t have an account?{' '}
                        <span className="text-blue-400 hover:underline font-semibold cursor-pointer" onClick={() => navigate('/signup')}>Sign up</span>
                    </p>
                </div>



                <footer className="text-center text-gray-500 text-sm mt-10 space-y-2">
                    <div className="flex flex-wrap justify-center gap-4 text-xs">
                        <span>About</span>
                        <span>Blog</span>
                        <span>Jobs</span>
                        <span>Help</span>
                        <span>API</span>
                        <span>Privacy</span>
                        <span>Terms</span>
                        <span>Locations</span>
                        <span>Socialenz Lite</span>
                        <span>Contact uploading and non-users</span>
                        <span>Deeprise.solution</span>
                    </div>
                    <div>
                        <p>English (UK) ▼</p>
                        <p>© 2025 Socialenz from Deeprise.solution</p>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Login
