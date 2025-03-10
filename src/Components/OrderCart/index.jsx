// import { XCircleIcon } from '@heroicons/react/16/solid'
import { TrashIcon } from '@heroicons/react/16/solid'
import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'

const OrderCart = props => {

    const context = useContext(ShoppingCartContext)
    const { id, title, imageUrl, price, flag=true} = props
    

    //eliminar un producto de la lista y actualizar el contador del carrito de compras
    const handleDeleteProduct = (id) => {
        //con el filtro le digo que me arme un nueov array con l lista de productos que cumplen la condicion e ser diferentes al id que le envio
        const newListProducts = context.listProducts.filter((product) => product.id != id)
        context.setListProducts(newListProducts)
    }
    
    return(
        <div className="flex justify-between items-center">
            <div className=" items-center gap-2">
                <figure className="w-20 h-20">
                    <img className="w-full h-full rounded-lg object-cover" src={imageUrl} alt={title} />
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