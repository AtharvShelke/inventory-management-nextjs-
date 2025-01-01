// 'use client'
import DataTable from '@/components/dashboard/DataTable'
import FixedHeader from '@/components/dashboard/FixedHeader'
import { getRequest } from '@/lib/apiRequest'
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'

export default async function Adjustment() {
 
  const [addStockAdjustment, transferStockAdjustment, items, session] = await Promise.all([
    getRequest('inventoryadjustment/add'),
    getRequest('inventoryadjustment/transfer'),
    getRequest('items'),
    getServerSession(authOptions)
  ]);

  const role = session?.user?.role;

  const itemMap = items.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

  const calculateCostOrSale = (quantity, price) => quantity * price;

  const updateAdjustments = (adjustments, isAddStock) => {
    return adjustments.map((adjustment) => {
      const { itemId, addStockQty, transferStockQty } = adjustment;
      const itemDetails = itemMap[itemId];

      if (!itemDetails) return adjustment; 

      const quantity = parseInt(isAddStock ? addStockQty : transferStockQty);
      const price = isAddStock ? parseInt(itemDetails.buyingPrice) : parseInt(itemDetails.sellingPrice);
      const total = calculateCostOrSale(quantity, price);

      return {
        ...adjustment,
        item: itemDetails.title,
        [isAddStock ? 'buyingPrice' : 'sellingPrice']: price,
        [isAddStock ? 'cost' : 'sale']: total
      };
    });
  };

  const updatedAddStockAdjustments = updateAdjustments(addStockAdjustment, true);
  const updatedTransferStockAdjustments = updateAdjustments(transferStockAdjustment, false);

  // Column definitions
  const columnsAdd = ['referenceNumber', 'addStockQty', 'item', 'buyingPrice', 'cost', 'username'];
  const employeeColumnsAdd = ['referenceNumber', 'addStockQty', 'item'];
  const columnTransfer = ['referenceNumber', 'transferStockQty', 'item', 'sellingPrice', 'sale', 'username'];
  const employeeColumnTransfer = ['referenceNumber', 'transferStockQty', 'item'];

  return (
    <>
      <FixedHeader title="Adjustment" newLink="/overview/inventoryadjustment/new" />
      <div className="my-4 p-8">
        <h2 className="py-4 text-xl font-semibold">Purchase Stock</h2>
        <DataTable
          data={updatedAddStockAdjustments}
          columns={role === 'ADMIN' ? columnsAdd : employeeColumnsAdd}
          resourceName="inventoryadjustment/add"
        />
      </div>
      <div className="my-4 p-8">
        <h2 className="py-4 text-xl font-semibold">Sale Stock</h2>
        <DataTable
          data={updatedTransferStockAdjustments}
          columns={role === 'ADMIN' ? columnTransfer : employeeColumnTransfer}
          resourceName="inventoryadjustment/transfer"
        />
      </div>
    </>
  );
}
