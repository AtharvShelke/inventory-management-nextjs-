import RegisterForm from "@/components/auth/RegisterForm";
import { Warehouse } from "lucide-react";


export default function Register() {
    return (
        <section className=" px-6 mx-auto h-screen lg:py-0 w-full  flex flex-col items-center justify-center bg-slate-100">

            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
                <div
                    className="hidden  lg:block lg:w-1/2"
                    style={{
                        backgroundImage:
                            "url(/loginPage.jpg)",
                        backgroundSize: 'contain',
                        backgroundRepeat: "no-repeat", // Optional: Ensure no repetition
                        backgroundPosition: "center",
                    }}
                ></div>

                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                    <div className="flex justify-center mx-auto">
                        <Warehouse className="h-8 w-8" />
                    </div>

                    <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                        Create New Account
                    </p>

                    <RegisterForm />
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm font-light text-gray-500">
                            Already have an account?{" "}
                            <a href="/login" className="font-medium text-blue-600 hover:underline">
                                Sign In
                            </a>
                        </p>
                    </div>
                </div>
            </div>

        </section>
    )
}