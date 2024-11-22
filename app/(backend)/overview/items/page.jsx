import DataTable from '@/components/dashboard/DataTable'
import FixedHeader from '@/components/dashboard/FixedHeader'
import { getRequest } from '@/lib/apiRequest'


export default async function Items() {
  const items = await getRequest('items');
  const suppliers = await getRequest('supplier')
  
 
  const updatedItems = items.map((adjustment) => {
    const supplierDetails = suppliers.find(supplier => supplier.id === adjustment.supplierId);
   
    return {
      ...adjustment,
      supplier: supplierDetails.title,  
      
    };
  })
  
  const columns = ['title', 'qty', 'buyingPrice', 'sellingPrice', 'supplier']
  return (

    <>
      <FixedHeader title={'Items'} newLink={'/overview/items/new'} />
      <div className="my-4 p-8">
        <DataTable data={updatedItems} columns={columns} />
      </div>

    </>
  )
}
