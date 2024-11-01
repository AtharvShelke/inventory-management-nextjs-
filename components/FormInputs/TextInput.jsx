"use client"
import React from 'react'
import { useForm } from 'react-hook-form'

export default function TextInput({ label,
    name,
    isRequired = true,
    register,
    errors,
    type = 'text',
    className = 'sm:col-span-2'
}) {

    return (
        <div className={className}>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 ">{label}</label>
            <input
                type={type}
                {...register(`${name}`, { required: isRequired })}
                name={name}
                id={name}
                autoComplete={name}
                
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder={`Enter ${label}`}
                required="" />
            {errors[`${name}`] && (
                <span className="text-sm text-red-600 ">{label} is required</span>
            )}
        </div>
    )
}
