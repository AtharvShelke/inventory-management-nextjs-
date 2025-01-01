import FormHeader from '@/components/dashboard/FormHeader';
import { getRequest } from '@/lib/apiRequest';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

export default async function InvoiceDetail({ params }) {
    const { id } = params;
    const endpoint = `invoice/${id}`;

    // Fetch invoice data using the endpoint
    const invoiceResponse = await getRequest(endpoint);
    const invoice = invoiceResponse.data;

    // If no invoice data is found, return a message
    if (!invoice) {
        return <div className="p-8 text-center text-xl">Invoice not found: {endpoint}</div>;
    }

    const session = await getServerSession(authOptions);
    const role = session?.user?.role;

    return (
        <>
            <FormHeader title='Invoice Details' href="/overview/invoice" />
            <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
                {/* Invoice Info Section with Card Style */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="space-y-4">
                        <p className="text-lg font-semibold text-gray-700 dark:text-white">Customer: <span className="font-normal">{invoice.customerName}</span></p>
                        <p className="text-lg font-semibold text-gray-700 dark:text-white">Date: <span className="font-normal">{new Date(invoice.date).toLocaleString()}</span></p>
                        <p className="text-lg font-semibold text-gray-700 dark:text-white">Description: <span className="font-normal">{invoice.description || 'N/A'}</span></p>
                    </div>

                    {role === 'ADMIN' && (
                        <div className="space-y-2 mt-4">
                            <p className="text-lg font-semibold text-gray-700 dark:text-white">Total Cost: <span className="font-normal">{invoice.totalCost}</span></p>
                            <p className="text-lg font-semibold text-gray-700 dark:text-white">Total Sale: <span className="font-normal">{invoice.totalSale}</span></p>
                            <p className="text-lg font-semibold text-gray-700 dark:text-white">Total Profit: <span className="font-normal">{invoice.totalProfit}</span></p>
                        </div>
                    )}
                </div>

                {/* Invoice Items Table with Card Style */}
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Invoice Items</h2>
                <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gradient-to-r from-blue-200 to-blue-100 dark:bg-gray-700 dark:text-gray-300">
                            <tr>
                                <th scope="col" className="px-6 py-3">Item Title</th>
                                <th scope="col" className="px-6 py-3">Quantity</th>
                                {role === 'ADMIN' && (
                                    <>
                                        <th scope="col" className="px-6 py-3">Total Buying Price</th>
                                        <th scope="col" className="px-6 py-3">Total Selling Price</th>
                                        <th scope="col" className="px-6 py-3">Total Profit</th>
                                    </>
                                )}
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
                                        className={`odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200`}
                                    >
                                        <td className="px-6 py-4">{item.item.title}</td>
                                        <td className="px-6 py-4">{item.qty}</td>
                                        {role === 'ADMIN' && (
                                            <>
                                                <td className="px-6 py-4">{totalBuyingPrice.toFixed(2)}</td>
                                                <td className="px-6 py-4">{totalSellingPrice.toFixed(2)}</td>
                                                <td className="px-6 py-4">{totalProfit.toFixed(2)}</td>
                                            </>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
