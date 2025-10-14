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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Info } from 'lucide-react';
import { toast } from 'sonner'; // or your toast library

export default function CreateItemForm({ warehouses, suppliers, initialData, isUpdate }) {
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const router = useRouter();
  
  const { 
    register, 
    handleSubmit, 
    reset, 
    watch,
    formState: { errors, isDirty, isValid } 
  } = useForm({
    defaultValues: {
      title: '',
      qty: '',
      description: '',
      supplierId: '',
      warehouseId: '',
      buyingPrice: '',
      sellingPrice: '',
      taxRate: '',
      category: '',
      brand: '',
      sku: '',
      barcode: '',
      reorderPoint: 30,
      minStockLevel: 10,
      maxStockLevel: '',
      ...initialData
    },
    mode: 'onChange' // Enable real-time validation
  });

  const { data: session } = useSession();
  const role = session?.user?.role;
  const username = session?.user?.name;

  // Watch buying and selling prices for profit margin calculation
  const buyingPrice = watch('buyingPrice');
  const sellingPrice = watch('sellingPrice');
  const qty = watch('qty');

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  // Calculate profit margin
  const profitMargin = React.useMemo(() => {
    if (buyingPrice && sellingPrice) {
      const buying = parseFloat(buyingPrice);
      const selling = parseFloat(sellingPrice);
      if (buying > 0 && selling > 0) {
        return (((selling - buying) / buying) * 100).toFixed(2);
      }
    }
    return null;
  }, [buyingPrice, sellingPrice]);

  // Calculate potential profit
  const potentialProfit = React.useMemo(() => {
    if (buyingPrice && sellingPrice && qty) {
      const buying = parseFloat(buyingPrice);
      const selling = parseFloat(sellingPrice);
      const quantity = parseInt(qty);
      if (buying > 0 && selling > 0 && quantity > 0) {
        return ((selling - buying) * quantity).toFixed(2);
      }
    }
    return null;
  }, [buyingPrice, sellingPrice, qty]);

  const onSubmit = async (data) => {
  try {
    setLoading(true);
    setSubmitError(null);

    // Validation checks
    if (!data.supplierId) {
      setSubmitError('Please select a supplier');
      setLoading(false);
      return;
    }

    if (role === 'ADMIN' && data.sellingPrice && data.buyingPrice) {
      const selling = parseFloat(data.sellingPrice);
      const buying = parseFloat(data.buyingPrice);
      if (selling < buying) {
        setSubmitError('Selling price cannot be less than buying price');
        setLoading(false);
        return;
      }
    }

    // Prepare data with proper types
    const submitData = {
      title: data.title,
      description: data.description || null,
      qty: data.qty.toString(),
      supplierId: data.supplierId,
      username: username || 'Unknown',
    };

    // Add optional fields
    if (data.buyingPrice) submitData.buyingPrice = data.buyingPrice.toString();
    if (data.sellingPrice) submitData.sellingPrice = data.sellingPrice.toString();
    if (data.warehouseId) submitData.warehouseId = data.warehouseId;
    if (data.taxRate) submitData.taxRate = data.taxRate.toString();
    if (data.category) submitData.category = data.category;
    if (data.brand) submitData.brand = data.brand;
    if (data.sku) submitData.sku = data.sku;
    if (data.barcode) submitData.barcode = data.barcode;
    if (data.dimensions) submitData.dimensions = data.dimensions;
    
    submitData.reorderPoint = data.reorderPoint ? parseInt(data.reorderPoint) : 30;
    submitData.minStockLevel = data.minStockLevel ? parseInt(data.minStockLevel) : 10;
    if (data.maxStockLevel) submitData.maxStockLevel = parseInt(data.maxStockLevel);

    if (isUpdate) {
      // Update existing item
      await updateRequest(
        null, // No reset needed for update
        setLoading,
        `items/${initialData.id}`,
        'Item',
        submitData
      );
      
      // Navigate on success
      router.push('/items');
    } else {
      // Create new item
      await makePostRequest(
        reset,
        setLoading,
        'items',
        'Item',
        submitData
      );
      
      // Navigate on success
      router.push('/items');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    
    // Extract and display error message
    const errorMessage = error.message || 'Failed to save item. Please try again.';
    setSubmitError(errorMessage);
    
    // Toast is already shown by apiRequest, no need to show again
  } finally {
    // setLoading is handled in apiRequest, but ensure it's false
    setLoading(false);
  }
};


  const renderAdminFields = () => (
    <>
      <TextInput
        label="Buying Price"
        name="buyingPrice"
        register={register}
        errors={errors}
        type="number"
        step="0.01"
        min="0"
        className="w-full"
        isRequired={false}
      />
      <TextInput
        label="Selling Price"
        name="sellingPrice"
        register={register}
        errors={errors}
        type="number"
        step="0.01"
        min="0"
        className="w-full"
        isRequired={false}
      />
      <TextInput
        label="Tax Rate (%)"
        name="taxRate"
        register={register}
        errors={errors}
        type="number"
        step="0.01"
        min="0"
        max="100"
        className="w-full"
        isRequired={false}
      />

      {/* Profit Margin Display */}
      {profitMargin !== null && (
        <div className="col-span-2">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <span className="font-medium">Profit Margin: </span>
              <span className={profitMargin > 0 ? 'text-green-600' : 'text-red-600'}>
                {profitMargin}%
              </span>
              {potentialProfit && (
                <span className="ml-4">
                  <span className="font-medium">Potential Profit: </span>
                  ₹{potentialProfit}
                </span>
              )}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );

  return (
    <section className="my-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>{isUpdate ? 'Update Item' : 'Add a New Product'}</CardTitle>
          <CardDescription>
            {isUpdate 
              ? 'Update the item details below' 
              : 'Fill in the details to add a new item to your inventory'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitError && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          {warehouses.length === 0 && (
            <Alert className="mb-4">
              <Info className="h-4 w-4" />
              <AlertDescription>
                No warehouses found. Please create a warehouse first.
              </AlertDescription>
            </Alert>
          )}

          {suppliers.length === 0 && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                No suppliers found. Please create a supplier first before adding items.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <TextInput
                label="Item Title"
                name="title"
                register={register}
                errors={errors}
                isRequired={true}
                className="w-full"
              />
              
              <SelectInput
                register={register}
                className="w-full"
                name="supplierId"
                label="Select Supplier"
                options={suppliers}
                isRequired={true}
                errors={errors}
              />

              <TextInput
                label="Item Quantity"
                name="qty"
                register={register}
                errors={errors}
                type="number"
                min="0"
                className="w-full"
                isRequired={true}
              />

              <SelectInput
                register={register}
                className="w-full"
                name="warehouseId"
                label="Select Warehouse"
                options={warehouses}
                isRequired={false}
                errors={errors}
              />

              <TextInput
                label="Category"
                name="category"
                register={register}
                errors={errors}
                className="w-full"
                isRequired={false}
                placeholder="e.g., Electronics, Furniture"
              />

              <TextInput
                label="Brand"
                name="brand"
                register={register}
                errors={errors}
                className="w-full"
                isRequired={false}
              />

              <TextInput
                label="SKU"
                name="sku"
                register={register}
                errors={errors}
                className="w-full"
                isRequired={false}
                placeholder="Stock Keeping Unit"
              />

              <TextInput
                label="Barcode"
                name="barcode"
                register={register}
                errors={errors}
                className="w-full"
                isRequired={false}
              />

              <TextInput
                label="Reorder Point"
                name="reorderPoint"
                register={register}
                errors={errors}
                type="number"
                min="0"
                className="w-full"
                isRequired={false}
              />

              <TextInput
                label="Min Stock Level"
                name="minStockLevel"
                register={register}
                errors={errors}
                type="number"
                min="0"
                className="w-full"
                isRequired={false}
              />

              <TextInput
                label="Max Stock Level"
                name="maxStockLevel"
                register={register}
                errors={errors}
                type="number"
                min="0"
                className="w-full"
                isRequired={false}
              />

              {role === 'ADMIN' && renderAdminFields()}

              <TextareaInput
                label="Item Description"
                name="description"
                register={register}
                errors={errors}
                className="col-span-2"
                isRequired={false}
              />
            </div>

            <SubmitButton 
              isLoading={loading} 
              title={isUpdate ? 'Update Item' : 'Create Item'}
              disabled={loading || suppliers.length === 0 || (isUpdate ? false : !isDirty)}
            />
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
