import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import InvoiceDetailView from '@/components/dashboard/InvoiceDetailView';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function InvoiceDetailPage({ params }) {
  const { id } = params;

  let invoice = null;

  try {
    invoice = await db.invoice.findUnique({
      where: { id },
      include: {
        invoiceItems: {
          include: {
            item: {
              select: {
                id: true,
                title: true,
                description: true,
                category: true,
                brand: true,
                sku: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  } catch (err) {
    console.error('Error fetching invoice details:', err);
  }

  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Card className="p-8 max-w-md text-center shadow-md">
          <FileText className="h-12 w-12 mx-auto text-slate-400 mb-3" />
          <h2 className="text-xl font-bold text-slate-900 mb-1">Invoice not found</h2>
          <p className="text-sm text-slate-500 mb-6">
            The requested invoice with ID <code className="text-xs bg-slate-100 p-1 rounded">{id}</code> could not be found.
          </p>
          <Link href="/invoice">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Invoices
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === 'ADMIN';

  // Normalize numbers
  invoice.totalSale = Number(invoice.totalSale) || 0;
  invoice.totalProfit = Number(invoice.totalProfit) || 0;
  invoice.totalCost = Number(invoice.totalCost) || 0;
  invoice.taxRate = Number(invoice.taxRate) || 0;
  invoice.discount = Number(invoice.discount) || 0;

  return <InvoiceDetailView invoice={invoice} isAdmin={isAdmin} />;
}
