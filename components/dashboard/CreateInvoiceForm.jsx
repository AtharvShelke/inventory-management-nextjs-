'use client';

import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import { getRequest, makePostRequest } from '@/lib/apiRequest';
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

export default function CreateInvoiceForm({ items }) {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, control, formState: { errors }, setValue } = useForm({
    defaultValues: {
      items: [{ itemId: '', qty: '', buyingPrice: '', sellingPrice: '' }]
    }
  });

  // For dynamically adding/removing items
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const handleSelectInput = async (e, index) => {
    const selectedItem = await getRequest(`items/${e.target.value}`);
    console.log(selectedItem.buyingPrice);
    console.log(selectedItem.sellingPrice);

    // Update buyingPrice and sellingPrice for the selected item
    setValue(`items[${index}].buyingPrice`, selectedItem.buyingPrice);
    setValue(`items[${index}].sellingPrice`, selectedItem.sellingPrice);
  };

  const onSubmit = async (data) => {
    console.log('Invoice data:', data);
    makePostRequest(reset, setLoading, 'invoice', 'Invoice', data);
  };

  return (
    <>
      {/* Form */}
      <section className="my-8">
        <div className="py-8 px-4 mx-auto max-w-3xl lg:py-16 w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Create New Invoice</h2>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {/* Customer Information */}
              <TextInput
                label="Customer Name"
                name="customerName"
                register={register}
                errors={errors}
              />
              <TextareaInput
                label="Description"
                name="description"
                register={register}
                errors={errors}
              />
            </div>

            {/* Invoice Items Section */}
            <div className="my-4">
              <h3 className="text-lg font-semibold text-gray-700">Invoice Items</h3>

              {fields.map((field, index) => {
                return (
                  <div key={field.id} className="grid gap-4 sm:grid-cols-4 sm:gap-6 my-2 border-b pb-4">
                    {/* Item selection */}
                    <SelectInput
                      register={register}
                      name={`items[${index}].itemId`}
                      label="Select Item"
                      options={items}
                      onChange={(e) => handleSelectInput(e, index)}  // Handle onChange for each item
                    />

                    {/* Quantity */}
                    <TextInput
                      label="Quantity"
                      name={`items[${index}].qty`}
                      register={register}
                      errors={errors}
                      type="number"
                    />

                    {/* Buying Price */}
                    <TextInput
                      label="Buying Price"
                      name={`items[${index}].buyingPrice`}
                      register={register}
                      errors={errors}
                      type="number"
                      disabled // Prevent manual entry, auto-set by SelectInput
                    />

                    {/* Selling Price */}
                    <TextInput
                      label="Selling Price"
                      name={`items[${index}].sellingPrice`}
                      register={register}
                      errors={errors}
                      type="number"
                      disabled // Prevent manual entry, auto-set by SelectInput
                    />

                    {/* Remove item button */}
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 mt-8"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}

              {/* Add New Item Button */}
              <button
                type="button"
                onClick={() => append({ itemId: '', qty: '', buyingPrice: '', sellingPrice: '' })}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Item
              </button>
            </div>

            {/* Submit Button */}
            <SubmitButton isLoading={loading} title="Invoice" />
          </form>
        </div>
      </section>
    </>
  );
}