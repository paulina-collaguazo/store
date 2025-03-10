import { CalendarDaysIcon } from '@heroicons/react/16/solid'

import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'

const OrdersCart = props => {

    const context = useContext(ShoppingCartContext)
    const {  totalPriceProducts, totalProducts } = props

    let currentDate = context.formatDate
    

    return (
        <div className="flex justify-between items-center mb-3  w-120 border-2 border-dotted  p-4 rounded-2xl">
          
            <div className='flex justify-between w-full'>
                <p className='flex flex-col'>
                    <CalendarDaysIcon className='size-8 text-black-500'/>
                    <span className='text-2xl'>{currentDate}</span>
                </p>
                <span className='font-medium text-sky-500'>Articles: {totalProducts}</span>
            
                <span className='flex gap-1 text-lg font-semibold text-black'>
                    ${totalPriceProducts}
                </span>
            </div>

        </div>
    )

}
export default OrdersCart