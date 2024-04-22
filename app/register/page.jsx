'use client'
import {useState} from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import {Router} from "next/router";
import {useRouter} from "next/navigation";
import styles from '@/app/ui/register/register.module.css'
export default function Register() {
    const router = useRouter()
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        managedBy: '',
        centerCode: ''
    });

    const registerUser = async (e) => {
        e.preventDefault();
        axios.post('/api/register', data).then(
            ()  => {
                toast.success('User registered successfully');
                router.push('/login');
            }
        ).catch(
            () => toast.error('An error occurred while registering the user. Please try again.')
        )
    }
    const roles = ['Entrepreneur', 'M-Staff', 'C-Staff']

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="text-center text-3xl font-extrabold leading-9">solidServe™</h1>
                    <h2 className="mt-5 text-center text-2xl font-semibold leading-9 tracking-tight">
                        Register for an account
                    </h2>
                </div>

                <div className={styles.form}>
                    <form className="space-y-6" onSubmit={registerUser}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="name"
                                    value={data.name}
                                    onChange={(e) => setData({...data, name: e.target.value})}
                                    autoComplete="name"
                                    required
                                    className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

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
                                    onChange={(e) => setData({...data, email: e.target.value})}
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

                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData({...data, password: e.target.value})}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="center-code" className="block text-sm font-medium leading-6">
                                Akshaya Center Code
                            </label>
                            <div className="mt-2">
                                <input
                                    id="center-code"
                                    name="center-code"
                                    type="name"
                                    value={data.centerCode}
                                    onChange={(e) => setData({...data, centerCode: e.target.value})}
                                    autoComplete="center-code"
                                    required
                                    className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className='mt-2'>
                                <label htmlFor='role' className='block text-sm font-medium leading-6'>
                                    Role
                                </label>
                            </div>
                            <div className='flex-auto mt-2'>
                                <select
                                    id="role"
                                    name="role"
                                    value={data.role}
                                    onChange={(e) => setData({...data, role: e.target.value})}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option value="" disabled>Select a role</option>
                                    <option value="Entrepreneur">Entrepreneur</option>
                                    <option value="M-Staff">M-Staff</option>
                                    <option value="C-Staff">C-Staff</option>
                                </select>

                            </div>
                        </div>
                        {data.role !== 'Entrepreneur' && (
                            <div>
                                <label htmlFor='managedBy' className='block text-sm font-medium leading-6'>
                                    Works under (Entrepreneur Email)
                                </label>
                                <div className='mt-2'>
                                    <input
                                        id='managedBy'
                                        name='managedBy'
                                        type='text'
                                        value={data.managedBy}
                                        onChange={(e) => setData({...data, managedBy: e.target.value})}
                                        autoComplete='managedBy'
                                        required
                                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    />
                                </div>
                            </div>
                        )}

                        <div className="text-sm">
                            <a href="login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Back to Login
                            </a>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
