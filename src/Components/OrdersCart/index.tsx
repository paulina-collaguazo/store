import { CalendarDaysIcon } from '@heroicons/react/16/solid'
import { useShoppingContext, Order } from '../../Context'

interface OrderProps {
    order: Order;
}

const OrdersCart = ({ order }: OrderProps ) => {

    // const context = useShoppingContext()
    const { date, totalPriceProducts, totalProducts } = order
    
    
    const formattedDate = new Date(date).toLocaleDateString("es-ES");

    return (
        <div className="flex justify-between items-center mb-3  w-120 border-2 border-dotted  p-4 rounded-2xl">
          
            <div className='flex justify-between w-full'>
                <p className='flex flex-col'>
                    <CalendarDaysIcon className='size-8 text-black-500'/>
                    <span className='text-2xl'>{formattedDate}</span>
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