'use client'
import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'
import styles from '@/app/ui/login/login.module.css'
export default function Login() {
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const session = useSession();
    const router = useRouter();
    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/dashboard')
        } else {
            router.push('/login')
        }
    })
    const loginUser = (e) => {
        e.preventDefault()
        signIn('credentials', {...data, redirect: false})
            .then((callback) => {
                if (callback?.error) {
                    toast.error(callback.error);
                }

                if (callback?.ok && callback?.error) {
                    toast.success('User logged in successfully');
                }
            })
    }

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="text-center text-3xl font-extrabold leading-9">solidServe™</h1>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
                        Sign in to your account
                    </h2>
                </div>

                <div className={styles.form}>
                    <form className="space-y-6" onSubmit={loginUser}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6">
                                    Password
                                </label>
                                {/*<div className="text-sm">*/}
                                {/*    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                                {/*        Forgot password?*/}
                                {/*    </a>*/}
                                {/*</div>*/}
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Register Now!
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
