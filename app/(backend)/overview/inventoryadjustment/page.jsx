import DataTable from '@/components/dashboard/DataTable'
import FixedHeader from '@/components/dashboard/FixedHeader'
import { getRequest } from '@/lib/apiRequest'
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';


export default async function Adjustment() {
  const addStockAdjustment = await getRequest('inventoryadjustment/add');
  const transferStockAdjustment = await getRequest('inventoryadjustment/transfer');

  const items = await getRequest('items')
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  const updatedAddStockAdjustments = addStockAdjustment.map((adjustment) => {
    const itemDetails = items.find(item => item.id === adjustment.itemId);
    const quantity = parseInt(adjustment.addStockQty);
    const buyingPrice = parseInt(itemDetails.buyingPrice);
    const cost = quantity*buyingPrice;
    return {
      ...adjustment,
      item: itemDetails.title,
      buyingPrice:itemDetails.buyingPrice,
      cost:cost  
    };
  });
 
  const updatedTransferStockAdjustments = transferStockAdjustment.map((adjustment) => {
    const itemDetails = items.find(item => item.id === adjustment.itemId);
    const quantity = parseInt(adjustment.transferStockQty);
    const sellingPrice = parseInt(itemDetails.sellingPrice);
    const sale = quantity*sellingPrice;
    return {
      ...adjustment,
      item: itemDetails.title,
      sellingPrice:itemDetails.sellingPrice,
      sale:sale    
    };
  });



  const columnsAdd = ['referenceNumber', 'addStockQty', 'item', 'buyingPrice', 'cost'];
  const employeeColumnsAdd = ['referenceNumber', 'addStockQty', 'item'];

  const columnTransfer = ['referenceNumber', 'transferStockQty', 'item', 'sellingPrice', 'sale']
  const employeeColumnTransfer = ['referenceNumber', 'transferStockQty', 'item']
  return (

    <>
      <FixedHeader title={'Adjustment'} newLink={'/overview/inventoryadjustment/new'} />
      <div className="my-4 p-8">
        <h2 className='py-4 text-xl font-semibold'>Purchase Stock</h2>
        <DataTable data={updatedAddStockAdjustments} columns={role==='ADMIN'?columnsAdd:employeeColumnsAdd} resourceName={'inventoryadjustment/add'}/>
      </div>
      <div className="my-4 p-8">
        <h2 className='py-4 text-xl font-semibold'>Sale Stock</h2>
        <DataTable data={updatedTransferStockAdjustments} columns={role==='ADMIN'?columnTransfer:employeeColumnTransfer} resourceName={'inventoryadjustment/transfer'}/>
      </div>

    </>
  )
}