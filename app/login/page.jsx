import LoginForm from '@/components/auth/LoginForm';
import { Warehouse } from 'lucide-react';
import React from 'react';

export default function Page() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen px-6 mx-auto bg-slate-100">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        {/* Left Image Section */}
        <div
          className="hidden lg:block lg:w-1/2"
          style={{
            backgroundImage: "url(/loginPage.jpg)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>

        {/* Right Form Section */}
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <Warehouse className="h-8 w-8" />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Login
          </p>

          <LoginForm />
        </div>
      </div>
    </section>
  );
}
