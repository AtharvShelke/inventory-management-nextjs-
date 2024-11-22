
import { Building2 } from 'lucide-react'

import React from 'react'

export default function HomeNav() {



    return (


        <div className="flex space-x-3">
            <div className="flex w-12 h-12 rounded-lg items-center justify-center ">
                <Building2 />
            </div>
            <div className="flex items-center">
                <p className='font-semibold text-xl'>Enrich Kitchen Studio</p>
            </div>
        </div>


    )
}
