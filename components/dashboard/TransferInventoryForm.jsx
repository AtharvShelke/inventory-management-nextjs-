'use client';
import FormHeader from '@/components/dashboard/FormHeader'
import SelectInput from '@/components/FormInputs/SelectInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import TextInput from '@/components/FormInputs/TextInput';
import { makePostRequest } from '@/lib/apiRequest';

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function TransferInventoryForm({ warehouse, items }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await makePostRequest(reset, setLoading, 'inventoryadjustment/transfer', 'Transfer Stock', {
        referenceNumber: data.referenceNumber,
        itemId: data.itemId,
        transferStockQty: data.transferStockQty,
        description: data.description,
        
      });
    } catch (error) {
      console.error(error);
      toast.error('Error transferring stock: ' + error.message);
    }
  };

  return (
    <section className='my-8'>
      <div className="py-8 px-4 mx-auto max-w-4xl lg:py-16 w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900 ">Inventory Adjustments</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <TextInput
              label={"Reference Number"}
              name={"referenceNumber"}
              register={register}
              errors={errors}
              className='sm:col-span-2' 
            />
            <SelectInput
              register={register}
              className='w-full'
              name={'itemId'}
              label={'Select the Item To Send'}
              options={items}
            />
            <TextInput
              label={"Quantity of Stock Transfer"}
              name={"transferStockQty"}
              register={register}
              errors={errors}
              className='w-full' 
              type='number'
            />
            
            <TextareaInput
              label={"Adjustment Notes"}
              name={"description"}
              register={register}
              errors={errors} 
            />
          </div>
          <SubmitButton isLoading={loading} title={'Warehouse'} />
        </form>
      </div>
    </section>
  );
}
