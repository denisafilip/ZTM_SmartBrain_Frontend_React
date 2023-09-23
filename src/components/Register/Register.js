import React, {Fragment, useState} from 'react';
import Logo from "../Logo/Logo";
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../AuthService";

// using React Hooks, we can use state in functional components
function Register() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const onNameChange = (event) => {
        setUser({...user, name: event.target.value});
    }

    const onEmailChange = (event) => {
        setUser({...user, email: event.target.value});
    }

    const onPasswordChange = (event) => {
        setUser({...user, password: event.target.value});
    }

    const onConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const onSubmitRegister = (event) => {
        event.preventDefault();
        if (validateForm()) {
            alert("Passwords don't match");
        } else {
            AuthService
                .register(user.name, user.email, user.password)
                .then(data => {
                    if (data === 'Error registering user') {
                        alert(data);
                    } else {
                        navigate('/signin');
                    }
                });
        }
    }

    const validateForm = () => {
        return user.password !== confirmPassword || !user.password || !confirmPassword;
    }

    return (
        <Fragment>
            <section className="bg-white dark:bg-white">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Logo/>
                    <p className="flex items-center mb-6 text-2xl font-bold text-black dark:text-black">SmartBrain</p>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="full name"
                                        required
                                        value={user.name}
                                        onChange={onNameChange}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required
                                        value={user.email}
                                        onChange={onEmailChange}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        value={user.password}
                                        onChange={onPasswordChange}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="confirm-password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Confirm password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirm-password"
                                        id="confirm-password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        value={confirmPassword}
                                        onChange={onConfirmPasswordChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    onClick={onSubmitRegister}
                                >
                                    Register
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?{" "}
                                    <Link
                                        to={"/signin"}
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Sign in here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default Register;