
import CreateInvoiceForm from '@/components/dashboard/CreateInvoiceForm';

import FormHeader from '@/components/dashboard/FormHeader';

import { getRequest } from '@/lib/apiRequest';

export default async function Newinvoice() {

const items = await getRequest('items')

  return(
    <>
    {/* header */}
    <FormHeader title='New Client' href="/overview/invoice" />
    <CreateInvoiceForm
      items={items}
      />
    </>
  );
  
}
