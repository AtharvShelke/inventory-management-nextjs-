'use client';
import FormHeader from '@/components/dashboard/FormHeader'
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import TextInput from '@/components/FormInputs/TextInput';
import { makePostRequest } from '@/lib/apiRequest';

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function NewCategory() {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();
  const onSubmit = async(data) => {
    makePostRequest(reset, setLoading, 'categories', 'Category', data)
   
  }
  return (
    <>
      {/* header */}
      <FormHeader title='New Category' href="/overview/inventory" />
      {/* Form */}
      <section className='my-8'>
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16 w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900 ">Add a new Category</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <TextInput label={"Category Title"} name={"title"} register={register} errors={errors} />
              <TextareaInput label={"Category Description"} name={"description"} register={register} errors={errors} />
              

              
              
              
            </div>
            <SubmitButton isLoading={loading} title={'Category'} />
          </form>
        </div>
      </section>
    </>
  )
}
