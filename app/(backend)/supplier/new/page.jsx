'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import FormHeader from '@/components/dashboard/FormHeader';
import SelectInput from '@/components/FormInputs/SelectInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import TextInput from '@/components/FormInputs/TextInput';
import { makePostRequest, updateRequest } from '@/lib/apiRequest';

const selectOptions = [
  { label: "Main", value: "main" },
  { label: "Branch", value: "branch" },
];

export default function NewSupplier({ initialData = {}, isUpdate = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialData,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const action = isUpdate ? updateRequest : makePostRequest;
      await action(reset, setLoading, `supplier${isUpdate ? `/${initialData.id}` : ''}`, 'Supplier', data);
      router.push('/supplier');
    } catch (error) {
      console.error('Error submitting form:', error);
      setLoading(false);
    }
  };

  const renderTextInput = (label, name, type = 'text') => (
    <TextInput
      label={label}
      name={name}
      register={register}
      errors={errors}
      type={type}
      className='w-full'
    />
  );

  return (
    <>
      <FormHeader title={isUpdate ? "Update Supplier" : "New Supplier"} href="/supplier" />
      <section className='my-8'>
        <div className="py-8 px-4 mx-auto max-w-3xl lg:py-16 w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Add a new Supplier</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {renderTextInput("Supplier Name", "title")}
              {renderTextInput("Supplier Phone", "phone")}
              {renderTextInput("Supplier Email", "email", "email")}
              {renderTextInput("Supplier Address", "address")}
              {renderTextInput("Contact Person", "contactPerson")}
              {renderTextInput("Supplier Code", "supplierCode")}
              {renderTextInput("Payment Terms", "paymentTerms")}
              {renderTextInput("Tax Id", "taxId")}
              <TextareaInput
                label="Supplier Description"
                name="description"
                register={register}
                errors={errors}
              />
            </div>
            <SubmitButton isLoading={loading} title={isUpdate ? "Updated Supplier" : "New Supplier"} />
          </form>
        </div>
      </section>
    </>
  );
}
