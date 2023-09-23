import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

import whiteBrain from '../../assets/images/white_brain.png';

const Navigation = ({isAuthenticated, onSignOut}) => {

    return (
        <Fragment>
            <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to={"/home"} className="flex items-center">
                        <img src={whiteBrain} className="h-8 mr-3" alt="Flowbite Logo"/>
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SmartBrain</span>
                    </Link>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                        <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                            {
                                isAuthenticated ?
                                    <li className="flex space-x-4">
                                        <Link to={"/home"}
                                              className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                                              aria-current="page">Home</Link>
                                        <Link
                                            className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                            to={"/signin"}
                                            onClick={onSignOut}
                                        >
                                            Sign Out
                                        </Link>
                                    </li>
                                    :
                                    <li className="flex space-x-4">
                                        <Link className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/signin">Sign In</Link>
                                        <Link className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/register">Register</Link>
                                    </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </Fragment>
    );
}

export default Navigation;