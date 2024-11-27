'use client';

import SelectInput from '@/components/FormInputs/SelectInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import TextInput from '@/components/FormInputs/TextInput';
import { makePostRequest } from '@/lib/apiRequest';

import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';

export default function AddAdjustmentForm({ warehouses, items, initialData = {}, isUpdate = false }) {
  const [loading, setLoading] = useState(false);

  // Initializing form with react-hook-form
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialData });

  // Use useCallback to memoize the onSubmit function
  const onSubmit = useCallback(async (data) => {
    setLoading(true);
    await makePostRequest(reset, setLoading, 'inventoryadjustment/add', 'Stock', data);
  }, [reset]);

  return (
    <section className="my-8">
      <div className="py-8 px-4 mx-auto max-w-4xl lg:py-16 w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Inventory Adjustments</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

            <TextInput
              label="Reference Number"
              name="referenceNumber"
              register={register}
              errors={errors}
              className="sm:col-span-2"
            />

            <SelectInput
              register={register}
              name="itemId"
              label="Select the Item to Add"
              options={items}
            />

            <TextInput
              label="Quantity of Stock to Add"
              name="addStockQty"
              register={register}
              errors={errors}
              className="sm:col-span-2"
              type="number"
            />

            <SelectInput
              register={register}
              name="warehouseId"
              label="Select the Warehouse to receive Stock"
              options={warehouses}
            />

            <TextareaInput
              label="Adjustment Notes"
              name="description"
              register={register}
              errors={errors}
            />

          </div>
          <SubmitButton isLoading={loading} title="Add stock" />
        </form>
      </div>
    </section>
  );
}
