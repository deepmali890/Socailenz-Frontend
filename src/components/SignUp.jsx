import axios from 'axios'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const SignUp = () => {

    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
        phoneNumber: ""

    })

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handelSignUp = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const res = await axios.post('https://socailenz-backend.onrender.com/api/user/register', input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message || "Signup successful!");
                navigate('/login');
                setInput({ username: "", email: "", password: "", phoneNumber: "" })
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
            <div className="min-h-screen flex bg-black items-center justify-center py-10 px-4">
                <div className="w-full max-w-md bg-zinc-900 text-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-semibold font-cursive text-center mb-4  bg-gradient-to-r from-red-600 via-purple-500 to-red-400  text-transparent bg-clip-text">Socialenz</h1>
                    <p className="text-center text-gray-300 mb-4">
                        Sign up to see photos and videos from your friends.
                    </p>

                    <form className="space-y-3" onSubmit={handelSignUp}>
                        <input
                            type="text"
                            name='email'
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="Email Address"
                            className="w-full px-4 py-2 bg-zinc-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            name='phoneNumber'
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            className="w-full px-4 py-2 bg-zinc-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="text"
                            name='username'
                            placeholder="Username"
                            value={input.username}
                            onChange={changeEventHandler}
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



                        <p className="text-xs text-gray-400 mt-2">
                            People who use our service may have uploaded your contact information to Socialennz.{' '}
                            <a href="#" className="text-blue-400 hover:underline">Learn more</a>
                        </p>

                        <p className="text-xs text-gray-400 mt-2">
                            By signing up, you agree to our{' '}
                            <a href="#" className="text-blue-400 hover:underline">Terms</a>,{' '}
                            <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a> and{' '}
                            <a href="#" className="text-blue-400 hover:underline">Cookies Policy</a>.
                        </p>

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
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>

                    </form>

                    <div className="mt-6 text-center border-t border-gray-800 pt-4">
                        <p>
                            Have an account?{' '}
                            <span  className="text-blue-400 hover:underline cursor-pointer"  onClick={() => navigate('/login')}>Log in</span>
                        </p>
                    </div>


                </div>
            </div>
        </>
    )
}

export default SignUp
