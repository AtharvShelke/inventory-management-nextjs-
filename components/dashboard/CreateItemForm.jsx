'use client';
import ImageInput from '@/components/FormInputs/ImageInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import TextInput from '@/components/FormInputs/TextInput';
import { makePostRequest, updateRequest } from '@/lib/apiRequest';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

export default function CreateItemForm({warehouses, suppliers, initialData, isUpdate}) {
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
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
  const { data: session } = useSession();
  const role = session?.user?.role;
  
  const onSubmit = async (data) => {
    data.imageUrl = imageUrl;
    console.log('data: ', data)
    if (isUpdate) {
      updateRequest(reset, setLoading, `items/${initialData.id}`, 'Item', data);
    }else{
      makePostRequest(reset, setLoading, 'items', 'Item', data);
    }
    router.push('/overview/items')
  }
  return (
    <>  
      {/* Form */}
      <section className='my-8'>
        <div className="py-8 px-4 mx-auto max-w-3xl lg:py-16 w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900 ">Add a new product</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

              <TextInput
                label={"Item Title"}
                name={"title"}
                register={register}
                errors={errors}
              />
              
              <SelectInput
                register={register}
                className='w-full'
                name={'supplierId'}
                label={'Select the Item Supplier'}
                options={suppliers}
              />

             
              
              <TextInput
                label={"Item Quantity"}
                name={"qty"}
                register={register}
                errors={errors}
                type='number'

                className='w-full'
              />
              
             {role==='ADMIN'?<><TextInput
                label={"Buying Price"}
                name={"buyingPrice"}
                register={register}
                errors={errors}
                type='number'
                className='w-full'
                isRequired={false}
              />
              <TextInput
                label={"Selling Price"}
                name={"sellingPrice"}
                register={register}
                errors={errors}
                type='number'
                className='w-full'
                isRequired={false}
              />
              <TextInput
                label={"Tax Rate in %"}
                name={"taxRate"}
                register={register}
                errors={errors}
                type='number'
                className='w-full'
                isRequired={false}
              /></>:''}

              
              
              <SelectInput
                register={register}
                className='w-full'
                name={'warehouseId'}
                label={'Select the Item Warehouse'}
                options={warehouses}
                isRequired={false}
              />
              
              
              
              <TextareaInput
                label={"Item Description"}
                name={"description"}
                register={register}
                errors={errors}
              />
              <ImageInput 
                label="Item Image"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                endpoint='imageUploader'/>
            </div>
            <SubmitButton isLoading={loading} title={isUpdate?"Updated Item":"New Item"} />
          </form>
        </div>
      </section>
    </>
  )
}
