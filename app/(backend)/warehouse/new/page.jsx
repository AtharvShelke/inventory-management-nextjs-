'use client';
import FormHeader from '@/components/dashboard/FormHeader';
import SelectInput from '@/components/FormInputs/SelectInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import TextInput from '@/components/FormInputs/TextInput';
import { makePostRequest, updateRequest } from '@/lib/apiRequest';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function NewWarehouse({ initialData = {}, isUpdate = false }) {
  const selectOptions = [
    { title: "Main", id: "main" },
    { title: "Branch", id: "branch" },
  ];

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialData,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (isUpdate) {
        await updateRequest(reset, setLoading, `warehouse/${initialData.id}`, 'Warehouse', data);
        toast.success('Warehouse updated successfully');
      } else {
        await makePostRequest(reset, setLoading, 'warehouse', 'Warehouse', data);
        toast.success('Warehouse created successfully');
      }
      router.push('/overview/warehouse');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* header */}
      <FormHeader title={isUpdate ? "Update Warehouse" : "New Warehouse"} href="/overview/warehouse" />
      {/* Form */}
      <section className='my-8'>
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16 w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900 ">Add a New Warehouse</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <TextInput
                label="Warehouse Title"
                name="title"
                register={register}
                errors={errors}
                className="w-full"
              />
              <TextInput
                label="Warehouse Location"
                name="location"
                register={register}
                errors={errors}
                className="w-full"
              />
              <SelectInput
                register={register}
                className="w-full"
                name="warehouseType"
                label="Select Warehouse Type"
                options={selectOptions}
              />
              <TextareaInput
                label="Warehouse Description"
                name="description"
                register={register}
                errors={errors}
              />
            </div>
            <SubmitButton isLoading={loading} title={isUpdate ? "Update Warehouse" : "Create Warehouse"} />
          </form>
        </div>
      </section>
    </>
  );
}
