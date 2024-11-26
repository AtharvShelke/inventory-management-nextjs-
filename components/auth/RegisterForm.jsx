'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import TextInput from '../FormInputs/TextInput';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';


export default function RegisterForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const [emailErr, setEmail] = useState("");

    async function onSubmit(data) {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
            setLoading(true);
            const response = await fetch(`${baseUrl}/api/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();

            if (response.ok) {
                setLoading(false);
                toast.success("User Created Successfully");
                setEmail("");
                reset();
                router.push("/login");
            } else {
                setLoading(false);
                if (response.status === 409) {
                    setEmail("User with this Email already exists");
                    toast.error("User with this Email already exists");
                } else {
                    console.error("Server Error:", responseData.message || "No message provided");
                    toast.error("Oops! Something went wrong.");
                }
            }
            
        } catch (error) {
            setLoading(false);
            console.error("Network Error:", error);
            toast.error("It seems there is an issue with the network.");
        }
    }

    return (
        <form
            
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6 w-full">
            <TextInput
                label={"Name"}
                name={"name"}
                register={register}
                errors={errors}
            />
            <TextInput
                label={"Email"}
                name={"email"}
                register={register}
                errors={errors}
            />
            <TextInput
                label={"Password"}
                name={"password"}
                register={register}
                errors={errors}
                type='password'
            />

            <TextInput
                label={"Confirm Password"}
                name={"confirmPassword"}
                register={register}
                errors={errors}
                type='password'
            />

            <button
                type="submit"
                disabled={loading}
                className={`w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500"
                    }`}
            >
                {loading ? "Processing..." : "Sign Up"}
            </button>
            {emailErr && <p className="text-red-500 text-sm">{emailErr}</p>}
        </form>
    );
}