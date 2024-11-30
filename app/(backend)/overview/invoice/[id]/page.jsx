import FormHeader from '@/components/dashboard/FormHeader';
import { getRequest } from '@/lib/apiRequest'; // Adjust the import path if needed
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

export default async function InvoiceDetail({ params }) {
    const { id } = params;
    const endpoint = `invoice/${id}`;

    // Fetch invoice data using the endpoint
    const invoiceResponse = await getRequest(endpoint);
    const invoice = invoiceResponse.data
    console.log(invoice)
    // If no invoice data is found, return a message
    if (!invoice) {
        return <div>Invoice not found: {endpoint}</div>;
    }
    const session = await getServerSession(authOptions)
    const role = session?.user?.role;
    return (<>
        <FormHeader title='Invoice Details' href="/overview/invoice" />
        <div className="p-8">



            
            <div className="mb-8">
                <p><strong>Customer:</strong> {invoice.customerName}</p>
                <p><strong>Date:</strong> {new Date(invoice.date).toLocaleString()}</p>
                <p><strong>Description:</strong> {invoice.description || 'N/A'}</p>
                {role === 'ADMIN' ? <>
                    <p><strong>Total Cost:</strong> {invoice.totalCost}</p>
                    <p><strong>Total Sale:</strong> {invoice.totalSale}</p>
                    <p><strong>Total Profit:</strong> {invoice.totalProfit}</p>
                </> : ''}
            </div>

            
            <h2 className="text-xl font-semibold mb-4">Invoice Items</h2>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Item Title</th>
                        <th scope="col" className="px-6 py-3">Quantity</th>
                        {role==='ADMIN'?<><th scope="col" className="px-6 py-3">Total Buying Price</th>
                        <th scope="col" className="px-6 py-3">Total Selling Price</th>
                        <th scope="col" className="px-6 py-3">Total Profit</th></>:<></>}
                    </tr>
                </thead>
                <tbody>
                    {invoice.invoiceItems.map((item, rowIndex) => {
                        const totalBuyingPrice = parseFloat(item.buyingPrice) * parseInt(item.qty);
                        const totalSellingPrice = parseFloat(item.sellingPrice) * parseInt(item.qty);
                        const totalProfit = totalSellingPrice - totalBuyingPrice;

                        return (
                            <tr
                                key={rowIndex}
                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                            >
                                <td className="px-6 py-4">{item.item.title}</td>
                                <td className="px-6 py-4">{item.qty}</td>
                                {role==='ADMIN'?<><td className="px-6 py-4">{totalBuyingPrice.toFixed(2)}</td>
                                <td className="px-6 py-4">{totalSellingPrice.toFixed(2)}</td>
                                <td className="px-6 py-4">{totalProfit.toFixed(2)}</td></>:''}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
       
    </>
    );
}