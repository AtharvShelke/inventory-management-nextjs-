'use client';
import FormHeader from '@/components/dashboard/FormHeader'
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import TextInput from '@/components/FormInputs/TextInput';
import { Plus, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

export default function NewCategory() {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();
  const onSubmit = async(data) => {
    console.log(data)
    setLoading(true);
    const baseUrl = 'http://localhost:3000'
    try {
      const response = await fetch(`${baseUrl}/api/categories`, {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      })
      if (response.ok) {
        console.log(response)
        setLoading(false)
        reset();
      }      
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  return (
    <>
      {/* header */}
      <FormHeader title='New Category' href="/overview/inventory" />
      {/* Form */}
      <section className='my-8'>
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16 w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900 ">Add a new product</h2>
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
