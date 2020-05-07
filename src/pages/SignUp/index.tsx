import React from 'react';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex flex-col mt-20 p-5 bg-gray-300">
        <div className="text-2xl mb-4">Sign up</div>

        <div className="flex justify-between mb-4">
          <label className="w-full mr-4" htmlFor="email">
            Email
          </label>
          <input id="email" type="text" />
        </div>

        <div className="flex justify-between mb-4">
          <label className="w-full mr-4" htmlFor="password">
            Password
          </label>
          <input id="password" type="text" />
        </div>

        <button className="mb-1" type="button">
          Log in
        </button>

        <div className="text-right">
          <Link className="text-sm" to="/signin">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export { SignUp };
