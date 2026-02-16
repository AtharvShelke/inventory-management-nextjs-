'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import FormHeader from '@/components/dashboard/FormHeader';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextInput from '@/components/FormInputs/TextInput';
import { makePostRequest } from '@/lib/apiRequest';

export default function NewUser() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await makePostRequest(reset, setLoading, 'user', 'User', data);
            router.push('/user');
        } catch (error) {
            console.error('Error creating user:', error);
            setLoading(false);
        }
    };

    return (
        <>
            <FormHeader title="New User" href="/user" />
            <section className='my-8'>
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16 w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                    <h2 className="mb-4 text-xl font-bold text-gray-900">Add a new User</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <TextInput
                                label="Full Name"
                                name="name"
                                register={register}
                                errors={errors}
                                className='w-full'
                            />
                            <TextInput
                                label="Email Address"
                                name="email"
                                type="email"
                                register={register}
                                errors={errors}
                                className='w-full'
                            />
                            <TextInput
                                label="Password"
                                name="password"
                                type="password"
                                register={register}
                                errors={errors}
                                className='w-full'
                            />
                            <TextInput
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                register={register}
                                errors={errors}
                                className='w-full'
                            />
                        </div>
                        <SubmitButton isLoading={loading} title="Create User" />
                    </form>
                </div>
            </section>
        </>
    );
}
