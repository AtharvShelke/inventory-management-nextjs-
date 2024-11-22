'use client';
import ImageInput from '@/components/FormInputs/ImageInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import TextInput from '@/components/FormInputs/TextInput';
import { makePostRequest } from '@/lib/apiRequest';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

export default function CreateItemForm({warehouses, suppliers}) {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    data.imageUrl = imageUrl;
    console.log('data: ', data)
    makePostRequest(reset, setLoading, 'items', 'Item', data);
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
              
             

              <TextInput
                label={"Buying Price"}
                name={"buyingPrice"}
                register={register}
                errors={errors}
                type='number'
                className='w-full'
              />
              <TextInput
                label={"Selling Price"}
                name={"sellingPrice"}
                register={register}
                errors={errors}
                type='number'
                className='w-full'
              />
              
              <SelectInput
                register={register}
                className='w-full'
                name={'warehouseId'}
                label={'Select the Item Warehouse'}
                options={warehouses}
                isRequired={false}
              />
              
              
              <TextInput
                label={"Tax Rate in %"}
                name={"taxRate"}
                register={register}
                errors={errors}
                type='number'
                className='w-full'
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
            <SubmitButton isLoading={loading} title={'Item'} />
          </form>
        </div>
      </section>
    </>
  )
}
