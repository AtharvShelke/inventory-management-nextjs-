import FormHeader from '@/components/dashboard/FormHeader';
import { getRequest } from '@/lib/apiRequest';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Printer, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function InvoiceDetail({ params }) {
    const { id } = params;
    const endpoint = `invoice/${id}`;

    const invoiceResponse = await getRequest(endpoint);
    const invoice = invoiceResponse.data;

    if (!invoice) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-4">
                    <FileText className="h-12 w-12 mx-auto text-gray-400" />
                    <h2 className="text-xl font-semibold text-gray-600">Invoice not found</h2>
                    <p className="text-gray-500">The requested invoice ({endpoint}) could not be found</p>
                    <Link href="/overview/invoice">
                        <Button variant="outline" className="mt-4">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Invoices
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const session = await getServerSession(authOptions);
    const role = session?.user?.role;
    const isAdmin = role === 'ADMIN';
    const statusColor = invoice.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <FormHeader title="Invoice Details" href="/overview/invoice" />
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                    </Button>
                </div>
            </div>

            <div className="space-y-6">
                {/* Invoice Header Card */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Invoice #{invoice.invoiceNumber}</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className={statusColor}>
                                    {invoice.status || 'PENDING'}
                                </Badge>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Issued: {new Date(invoice.date).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-semibold text-gray-700 dark:text-white">
                                Total: ${invoice.totalSale?.toFixed(2) || '0.00'}
                            </p>
                            {isAdmin && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Profit: ${invoice.totalProfit?.toFixed(2) || '0.00'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Customer and Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Customer Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Customer Information</h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                                <p className="font-medium text-gray-800 dark:text-white">{invoice.customerName}</p>
                            </div>
                            {invoice.customerEmail && (
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                    <p className="font-medium text-gray-800 dark:text-white">{invoice.customerEmail}</p>
                                </div>
                            )}
                            {invoice.customerPhone && (
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                                    <p className="font-medium text-gray-800 dark:text-white">{invoice.customerPhone}</p>
                                </div>
                            )}
                            {invoice.description && (
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Notes</p>
                                    <p className="font-medium text-gray-800 dark:text-white">{invoice.description}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Summary Card (Admin Only) */}
                    {isAdmin && (
                        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Financial Summary</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Total Cost</span>
                                    <span className="font-medium">${invoice.totalCost?.toFixed(2) || '0.00'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Total Sale</span>
                                    <span className="font-medium">${invoice.totalSale?.toFixed(2) || '0.00'}</span>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between">
                                    <span className="font-semibold text-gray-800 dark:text-white">Total Profit</span>
                                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                                        ${invoice.totalProfit?.toFixed(2) || '0.00'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Invoice Items Table */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                    <div className="p-6 pb-0">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Items</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Item</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Qty</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Unit Price</th>
                                    {isAdmin && (
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Unit Cost</th>
                                    )}
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {invoice.invoiceItems.map((item, index) => {
                                    const totalPrice = parseFloat(item.sellingPrice) * parseInt(item.qty);
                                    const totalCost = parseFloat(item.buyingPrice) * parseInt(item.qty);
                                    const profit = totalPrice - totalCost;

                                    return (
                                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900 dark:text-white">{item.item.title}</div>
                                                {item.item.description && (
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        {item.item.description}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">{item.qty}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                ${parseFloat(item.sellingPrice).toFixed(2)}
                                            </td>
                                            {isAdmin && (
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-gray-500 dark:text-gray-400">
                                                    ${parseFloat(item.buyingPrice).toFixed(2)}
                                                </td>
                                            )}
                                            <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                                                ${totalPrice.toFixed(2)}
                                                {isAdmin && (
                                                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                                                        +${profit.toFixed(2)} profit
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <td 
                                        colSpan={isAdmin ? 4 : 3} 
                                        className="px-6 py-3 text-right font-medium text-gray-600 dark:text-gray-300"
                                    >
                                        Subtotal
                                    </td>
                                    <td className="px-6 py-3 text-right font-medium">
                                        ${invoice.totalSale?.toFixed(2) || '0.00'}
                                    </td>
                                </tr>
                                {invoice.taxRate > 0 && (
                                    <tr>
                                        <td 
                                            colSpan={isAdmin ? 4 : 3} 
                                            className="px-6 py-3 text-right font-medium text-gray-600 dark:text-gray-300"
                                        >
                                            Tax ({invoice.taxRate}%)
                                        </td>
                                        <td className="px-6 py-3 text-right font-medium">
                                            ${(invoice.totalSale * invoice.taxRate / 100).toFixed(2)}
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <td 
                                        colSpan={isAdmin ? 4 : 3} 
                                        className="px-6 py-3 text-right font-bold text-gray-800 dark:text-white"
                                    >
                                        Total
                                    </td>
                                    <td className="px-6 py-3 text-right font-bold text-lg text-gray-800 dark:text-white">
                                        ${(invoice.totalSale * (1 + (invoice.taxRate || 0) / 100)).toFixed(2)}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}