import FixedHeader from '@/components/dashboard/FixedHeader'
import InvoiceTable from '@/components/dashboard/InvoiceTable';
import { getRequest } from '@/lib/apiRequest'



export default async function Invoice() {
  const [invoices, invoiceItem, items] = await Promise.all([
    getRequest('invoice'),
    getRequest('invoiceitem'),
    getRequest('items')
  ]);
  
 
  const formattedInvoices = invoices.map(invoice => ({
    ...invoice,
    date: new Date(invoice.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }));
  const columns = ['date','customerName', 'description']
  
  return (

    <>
      <FixedHeader title={'Invoice'} newLink={'/overview/invoice/new'} />
      <div className="my-4 p-8">
        <InvoiceTable data={formattedInvoices} columns={columns}  />
      </div>
    </>
  )
}
