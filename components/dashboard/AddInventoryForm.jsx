'use client';
import FormHeader from '@/components/dashboard/FormHeader';
import SelectInput from '@/components/FormInputs/SelectInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import TextInput from '@/components/FormInputs/TextInput';
import { makePostRequest } from '@/lib/apiRequest';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function AddInventoryForm() {
    const branches = [
        {
          label: "Main A",
          value: "60c72b2f9b1d3e3a2c8b4567" // Example ObjectID
        },
        {
          label: "Branch A",
          value: "60c72b2f9b1d3e3a2c8b4568" // Example ObjectID
        },
        {
          label: "Branch B",
          value: "60c72b2f9b1d3e3a2c8b4569" // Example ObjectID
        },
    ];
    
    const items = [
        {
          label: "Item A",
          value: "60c72b2f9b1d3e3a2c8b4570" // Example ObjectID
        },
        {
          label: "Item B",
          value: "60c72b2f9b1d3e3a2c8b4571" // Example ObjectID
        },
    ];

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        
        // Make sure to pass the correct data with ObjectIDs
        const postData = {
            referenceNumber: data.referenceNumber,
            addStockQty: data.addStockQty,
            warehouseId: data.warehouseId, // This should be an ObjectID
            description: data.description,
            itemId: data.itemId, // You need to ensure this is provided in your form
        };

        makePostRequest(reset, setLoading, 'inventoryadjustment/add', 'Stock', postData);
    }

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
                      
                        <TextInput
                            label={"Quantity of Stock to Add"}
                            name={"addStockQty"}
                            register={register}
                            errors={errors}
                            className='sm:col-span-2' 
                            type='number'
                        />
                        
                        <SelectInput
                            register={register}
                            className='sm:col-span-2'
                            name={'warehouseId'}
                            label={'Select the Warehouse to receive Stock'}
                            options={branches}
                        />

                        <SelectInput
                            register={register}
                            className='sm:col-span-2'
                            name={'itemId'} // Add itemId field
                            label={'Select the Item to Add'}
                            options={items}
                        />
                        
                        <TextareaInput
                            label={"Adjustment Notes"}
                            name={"description"}
                            register={register}
                            errors={errors} 
                        />
                    </div>
                    <SubmitButton isLoading={loading} title={'Add stock'} />
                </form>
            </div>
        </section>
    );
}
