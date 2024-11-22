
import CreateItemForm from '@/components/dashboard/CreateItemForm';
import FormHeader from '@/components/dashboard/FormHeader';
import { getRequest, makePostRequest } from '@/lib/apiRequest';
// categories, units, brands, warehouses, suppliers
export default async function NewItem({initialData={}, isUpdate=false}) {
  const [warehouses, suppliers] = await Promise.all([
    
   
    getRequest('warehouse'),
    getRequest('supplier'),
  ]);

  return(
    <>
    {/* header */}
    <FormHeader title={isUpdate?"Update Item":"New Item"} href="/overview/inventory" />
    <CreateItemForm
      initialData={initialData}
      isUpdate={isUpdate}
      warehouses={warehouses}
      suppliers={suppliers}
      />
    </>
  ); 
}
