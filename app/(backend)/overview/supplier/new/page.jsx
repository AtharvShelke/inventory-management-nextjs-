'use client';
import FormHeader from '@/components/dashboard/FormHeader'
import SelectInput from '@/components/FormInputs/SelectInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import TextInput from '@/components/FormInputs/TextInput';
import { makePostRequest, updateRequest } from '@/lib/apiRequest';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';


export default function NewSupplier({initialData={}, isUpdate=false}) {
  const selectOptions = [
    {
      label: "Main",
      value: "main"
    },
    {
      label: "Branch",
      value: "branch"
    },
  ]
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues:initialData
  });
  const onSubmit = async (data) => {
    console.log(data)
    
    if (isUpdate) {
      updateRequest(reset, setLoading, `supplier/${initialData.id}`, 'Supplier', data);
    }else{
      makePostRequest(reset, setLoading, 'supplier', 'Supplier', data);
    }
    router.push('/overview/supplier')
  }
  return (
    <>
      {/* header */}
      <FormHeader title={isUpdate?"Update Supplier":"New Supplier"} href="/overview/supplier" />
      {/* Form */}
      <section className='my-8'>
        <div className="py-8 px-4 mx-auto max-w-3xl lg:py-16 w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900 ">Add a new Supplier</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

              <TextInput
                label={"Supplier Name"}
                name={"title"}
                register={register}
                errors={errors}
                className='w-full' />
              <TextInput
                label={"Supplier Phone"}
                name={"phone"}
                register={register}
                errors={errors}
                className='w-full' />
              <TextInput
                label={"Supplier Email"}
                name={"email"}
                register={register}
                errors={errors}
                type='email'
                className='w-full' />
              <TextInput
                label={"Supplier address"}
                name={"address"}
                register={register}
                errors={errors}
                className='w-full' />
              <TextInput
                label={"Contact Person"}
                name={"contactPerson"}
                register={register}
                errors={errors}
                className='w-full' />
              <TextInput
                label={"Supplier Code"}
                name={"supplierCode"}
                register={register}
                errors={errors}
                className='w-full' />
             
              <TextInput
                label={"Payment Terms"}
                name={"paymentTerms"}
                register={register}
                errors={errors}
                className='w-full' />
              <TextInput
                label={"Tax Id"}
                name={"taxId"}
                register={register}
                errors={errors}
                className='w-full' />
             <TextareaInput
                label={"Supplier Description"}
                name={"description"}
                register={register}
                errors={errors} />
              
            </div>
            <SubmitButton isLoading={loading} title={isUpdate?"Updated Supplier":"New Supplier"} />
          </form>
        </div>
      </section>
    </>
  )
}
