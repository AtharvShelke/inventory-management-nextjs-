import DataTable from '@/components/dashboard/DataTable'
import FixedHeader from '@/components/dashboard/FixedHeader'
import { getRequest } from '@/lib/apiRequest'
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';



export default async function Items() {
  const items = await getRequest('items');
  const suppliers = await getRequest('supplier')

  const session = await getServerSession(authOptions);
  const role = session?.user?.role;


  const updatedItems = items.map((adjustment) => {
    const supplierDetails = suppliers.find(supplier => supplier.id === adjustment.supplierId);

    return {
      ...adjustment,
      supplier: supplierDetails.title,

    };
  })

  const adminColumns = ['title', 'qty', 'buyingPrice', 'sellingPrice', 'supplier'];
  const employeeColumns = ['title', 'qty', 'supplier'];
  const columns = role === 'USER' ? employeeColumns : adminColumns;
 
  return (

    <>
      <FixedHeader title={'Items'} newLink={'/overview/items/new'} />
      <div className="my-4 p-8">
        <DataTable data={updatedItems} columns={columns} resourceName={'items'} />
      </div>

    </>
  )
}
