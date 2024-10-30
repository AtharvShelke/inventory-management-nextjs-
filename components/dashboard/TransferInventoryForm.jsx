'use client';
import FormHeader from '@/components/dashboard/FormHeader'
import SelectInput from '@/components/FormInputs/SelectInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import TextInput from '@/components/FormInputs/TextInput';

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

export default function TransferInventoryForm() {
    const branches = [
        {
          label: "Branch A",
          value: "branchA111"
        },
        {
          label: "Branch B",
          value: "branchB2222"
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
        console.log(data)
        setLoading(true);
        const baseUrl = 'http://localhost:3000'
        try {
          const response = await fetch(`${baseUrl}/api/inventoryadjustment/transfer`, {
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
    <section className='my-8'>
        <div className="py-8 px-4 mx-auto max-w-4xl lg:py-16 w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900 ">Inventory Adjustments</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

              <TextInput
                label={"Quantity of Stock Transfer"}
                name={"transferStockQty"}
                register={register}
                errors={errors}
                className='sm:col-span-2' 
                type='number'
                />
                <SelectInput
                register={register}
                className='w-full'
                name={'sendingBranchId'}
                label={'Select the Warehouse Branch to Send Stock From'}
                options={branches}
              />
                <SelectInput
                register={register}
                className='w-full'
                name={'receivingBranchId'}
                label={'Select the Warehouse Branch to Receive Stock From'}
                options={branches}
              />
                
              
              
              <TextareaInput
                label={"Adjustment Notes"}
                name={"description"}
                register={register}
                errors={errors} />
            </div>
            <SubmitButton isLoading={loading} title={'Warehouse'} />
          </form>
          </div>
</section>
  )
}
