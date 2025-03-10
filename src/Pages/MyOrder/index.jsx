import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'
import OrderCart from '../../Components/OrderCart'
import { Link } from 'react-router'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'

function MyOrder() {
  
  const context = useContext(ShoppingCartContext)
  const currentPath = window.location.pathname
  let param = currentPath.split('/')[2]
  const indexOrder = param == 'last' ? context.myOrder.length-1 : param

  const renderSelectedOrder = (index) => {
   
      return(
        context.myOrder?.[index]?.products.map((product)=>{
          return(
              <OrderCart key={product.id}
                      id = {product.id}
                      title = {product.title} 
                      imageUrl = {product.images[0].replace('["', '').replace('"]', '')}
                      price = {product.price}
                      flag = {false}
              />

          )
      })
      )

    }
  


 



    return (
      <Layout>
        <div className='flex items-center justify-center w-80 relative mb-6'>
          <Link to={'/my-orders'} className='absolute left-0'>
            <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer'/>
          </Link>

          <h1> My Order</h1>
        </div>
  
        <div className='flex-1 flex-col w-100 '>
          {/* colocar esos el simbolo de pregunta, me ayuda a cersiorarme de que si existe realemnte el objeto
           ya que si no existe sera como un null o undefined, y undefined no tiene el metodo slice y lanzara un TypeError
          es para  */}
                {/* {context.myOrder?.slice(-1)[0]?.products.map((product)=>{ */}
                {/* {context.myOrder?.[context.myOrder.length-1]?.products.map((product)=>{

                  
                
                    return(
                        <OrderCart key={product.id}
                                id = {product.id}
                                title = {product.title} 
                                imageUrl = {product.images[0].replace('["', '').replace('"]', '')}
                                price = {product.price}
                                flag = {false}
                        />

                    )
                })} */}
                {renderSelectedOrder(indexOrder)}
             
            </div>

      </Layout>
    )
  }
  
export default MyOrder

