import React, {Component} from 'react';
import Logo from "../Logo/Logo";
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../AuthService";

// using a stateful component
class SignInClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    onSubmitSignIn = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        console.log({ email, password });

        AuthService
            .signin(email, password)
            .then(data => {
                if (data === 'Wrong credentials' || data === 'Error signing in') {
                    alert(data);
                } else {
                    localStorage.setItem('user', JSON.stringify(data));
                    this.props.onSignIn();
                    this.props.navigate('/home');
                }
            });
    }

    render = () => {
        return (
            <section className="bg-white">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Logo/>
                    <p className="flex items-center mb-6 text-2xl font-semibold text-black dark:text-black">SmartBrain</p>
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Your email
                                    </label>
                                    <input type="email" name="email" id="email"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="name@company.com" required
                                           value={this.email}
                                           onChange={this.onEmailChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        type="password" name="password" id="password" placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        value={this.password}
                                        onChange={this.onPasswordChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    onClick={this.onSubmitSignIn}
                                >
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?
                                    <Link
                                        to={"/register"}
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    > Register
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const SignIn = ({onSignIn}) => {
    const navigate = useNavigate();

    return <SignInClass navigate={navigate} onSignIn={onSignIn} />;
}

export default SignIn;