// import { XCircleIcon } from '@heroicons/react/16/solid'
import { TrashIcon } from '@heroicons/react/16/solid'
import { useContext } from 'react'
import { useShoppingContext, Product} from '../../Context'

interface OrderProps {
    product: Product
    flag: boolean
}

const OrderCart = ({ product, flag}: OrderProps) => {

    const context = useShoppingContext();
    const { id, title, images, price } = product
 
    const handleDeleteProduct = (id: number) => {
        const newListProducts = context.listProducts.filter((product) => product.id !== id)
        context.setListProducts(newListProducts)
    }
    
    return(
        <div className="flex justify-between items-center">
            <div className=" items-center gap-2">
                <figure className="w-20 h-20">
                    <img className="w-full h-full rounded-lg object-cover" src={images[0]?.replace('["', '').replace('"]', '') || ''} alt={title} />
                </figure>
                <p className="text-sm font-light">{title}</p>
            </div>
            <div className="flex items-center gap-2">
                <p className="text-lg font-medium"> {price} </p>
                { flag && <TrashIcon  className="size-6 text-gray-400 hover:not-focus:bg-indigo-700 " 
                    onClick={()=> handleDeleteProduct(id)} /> }
                
            </div>


        </div>
    )

}
export default OrderCart