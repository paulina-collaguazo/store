import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import { Link } from 'react-router';
import { ChevronLeftIcon, CalendarIcon } from '@heroicons/react/24/solid'
import Layout from '../../Components/Layout';
import OrdersCart from '../../Components/OrdersCart';


function MyOrders() {

  const context = useContext(ShoppingCartContext)
  // debugger
    return (
      <Layout>
       <div className='flex items-center justify-center relative w-80'>
          <h1 className='font-medium text-xl'> My List Orders </h1>
       </div>

      
          {context.myOrder?.map((order, index)=> {

            return(
              <Link key={index} to={`/my-orders/${index}`}>
                <OrdersCart 
                  totalProducts = {order.totalProducts}
                  totalPriceProducts={order.totalPriceProducts}

                 
                />
              </Link>


            )


          })}
      
      </Layout>
    )
  }
  
export default MyOrders