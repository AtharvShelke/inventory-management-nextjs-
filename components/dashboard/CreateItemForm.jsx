'use client';
import SelectInput from '@/components/FormInputs/SelectInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import TextInput from '@/components/FormInputs/TextInput';
import { makePostRequest, updateRequest } from '@/lib/apiRequest';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function CreateItemForm({ warehouses, suppliers, initialData, isUpdate }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({
    defaultValues: initialData
  });

  const { data: session } = useSession();
  const role = session?.user?.role;
  const username = session?.user?.name;
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    console.log('data: ', data);
    data.username = username;
    const requestAction = isUpdate ? updateRequest : makePostRequest;
    const requestUrl = isUpdate ? `items/${initialData.id}` : 'items';
    
    await requestAction(reset, setLoading, requestUrl, 'Item', data);
    router.push('/overview/items');
  };

  const renderAdminFields = () => (
    <>
      <TextInput
        label="Buying Price"
        name="buyingPrice"
        register={register}
        errors={errors}
        type="number"
        className="w-full"
        isRequired={false}
      />
      <TextInput
        label="Selling Price"
        name="sellingPrice"
        register={register}
        errors={errors}
        type="number"
        className="w-full"
        isRequired={false}
      />
      <TextInput
        label="Tax Rate in %"
        name="taxRate"
        register={register}
        errors={errors}
        type="number"
        className="w-full"
        isRequired={false}
      />
    </>
  );

  return (
    <section className="my-8">
      <div className="py-8 px-4 mx-auto max-w-3xl lg:py-16 w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">{isUpdate ? 'Update Item' : 'Add a New Product'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <TextInput
              label="Item Title"
              name="title"
              register={register}
              errors={errors}
            />
            <SelectInput
              register={register}
              className="w-full"
              name="supplierId"
              label="Select the Item Supplier"
              options={suppliers}
            />
            <TextInput
              label="Item Quantity"
              name="qty"
              register={register}
              errors={errors}
              type="number"
              className="w-full"
            />

            {role === 'ADMIN' && renderAdminFields()}

            <SelectInput
              register={register}
              className="w-full"
              name="warehouseId"
              label="Select the Item Warehouse"
              options={warehouses}
              isRequired={false}
            />

            <TextareaInput
              label="Item Description"
              name="description"
              register={register}
              errors={errors}
            />

            
          </div>
          <SubmitButton isLoading={loading} title={isUpdate ? 'Update Item' : 'New Item'} />
        </form>
      </div>
    </section>
  );
}
