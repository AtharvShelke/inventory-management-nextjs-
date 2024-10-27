'use client';
import FormHeader from '@/components/dashboard/FormHeader'
import SelectInput from '@/components/FormInputs/SelectInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import TextInput from '@/components/FormInputs/TextInput';
import { UploadButton } from '@/lib/uploadthing';
import { Plus, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

export default function NewItem() {
  const [imageUrl, setImageUrl] = useState('');
  const categories = [
    {
      label: "Electronics",
      value: "asdfaef988"
    },
    {
      label: "Electronics",
      value: "asdfaef988"
    },
  ]
  const units = [
    {
      label: "Kg",
      value: "asdfaef988"
    },
    {
      label: "Count",
      value: "asdfaef988"
    },
  ]
  const brands = [
    {
      label: "hp",
      value: "asdfaef988"
    },
    {
      label: "dell",
      value: "asdfaef988"
    },
  ]
  const warehouses = [
    {
      label: "Main",
      value: "main"
    },
    {
      label: "Branch",
      value: "branch"
    },
  ]
  const suppliers = [
    {
      label: "SupplierA",
      value: "main"
    },
    {
      label: "SupplierB",
      value: "branch"
    },
  ]
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    data.imageUrl=imageUrl;
    console.log('data: ',data)
    setLoading(true);
    const baseUrl = 'http://localhost:3000'
    try {
      const response = await fetch(`${baseUrl}/api/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
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
      <FormHeader title='New Item' href="/overview/inventory" />
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
                name={'categoryId'}
                label={'Select the Item category'}
                options={categories}
              />
              <SelectInput
                register={register}
                className='w-full'
                name={'supplierId'}
                label={'Select the Item Supplier'}
                options={suppliers}
              />

              <TextInput
                label={"Item SKU"}
                name={"sku"}
                register={register}
                errors={errors}
                className='w-full'
              />
              <TextInput
                label={"Item Barcode"}
                name={"barcode"}
                register={register}
                errors={errors}
                isRequired={false}
                className='w-full'
              />
              <TextInput
                label={"Item Quantity"}
                name={"qty"}
                register={register}
                errors={errors}
                type='number'

                className='w-full'
              />
              <SelectInput
                register={register}
                className='w-full'
                name={'unitId'}
                label={'Select the Item unit'}
                options={units}
                isRequired={false}
              />
              <SelectInput
                register={register}
                className='w-full'
                name={'brandId'}
                label={'Select the Item brands'}
                options={brands}
                isRequired={false}
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
              <TextInput
                label={"Re-order Point"}
                name={"reorderPoint"}
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
                label={"Item Weight in Kgs"}
                name={"weight"}
                register={register}
                errors={errors}
                type='number'
                className='w-full'
              />
              <TextInput
                label={"Item Dimensions in cm (20 x 30)"}
                name={"dimensions"}
                register={register}
                errors={errors}

                className='w-full'
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
              <div className="sm:col-span-2">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImageUrl(res[0].url)
                    
                    console.log("Files: ", res);
                    alert("Upload Completed");
                  }}
                  onUploadError={(error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                 
                />
              </div>
            </div>
            <SubmitButton isLoading={loading} title={'Item'} />
          </form>
        </div>
      </section>
    </>
  )
}
