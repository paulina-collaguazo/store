import { useContext } from "react"
import { PlusIcon, CheckIcon } from "@heroicons/react/16/solid"
import { ShoppingCartContext } from "../../Context"

const Card = (item) => {
    // debugger
    let urlImage = item.item.images[0].replace('["', '').replace('"]', '')

    const context = useContext(ShoppingCartContext)

    if ((urlImage.search('placeimg') >= 0)) {

        urlImage = item.item.category.image
    } else if (urlImage.search('pravatar') >= 0) {
        urlImage = urlImage.replace('pravatar', 'i.pravatar')


    }

    const showProduct = (productDetail) => {
        context.openProductDetail()
        context.setSelectedProduct(productDetail)
        context.closeShopingCart()


    }

    const openCheckoutSideMenu = (event, product) => {
        event.stopPropagation()
        context.storeProductsSelected(product)
        context.openShopingCart()
        context.closeProductDetail()

    }

    const renderIcon = (id) => {
        let isIconCardSelected = context.listProducts.filter((productSelected) => productSelected.id === id).length > 0

        if (isIconCardSelected) {
            return(
                <div
                    className="absolute top-0 right-0 flex justify-center items-center bg-green-600 w-6 h-6 rounded-full m-2 p-1"  >
                    <CheckIcon className="h-6 w-6 text-white" />
                </div>
            )

        } else {
            return(
                <div
                    className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
                    onClick={() => context.setCount(context.count + 1)}
                >
                    <PlusIcon className="h-6 w-6"
                        onClick={(event) => openCheckoutSideMenu(event, item.item)}
                    />
                </div>
            )
        }
    }




    return (
        <div
            className="bg-white cursor-pointer w-56 h-60 rounded-lg"
            // onClick={()=> context.isProductDetailOpen ? context.closeProductDetail() : context.openProductDetail(item.item)}
            onClick={() => showProduct(item.item)}

        >
            <figure className="relative mb-2 w-full h-4/5">
                <span
                    className="absolute bottom-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">
                    {item.item.category.name}
                </span>

                <img
                    className="w-full h-full object-cover rounded-lg"
                    src={urlImage} alt="headphones" />

                {renderIcon(item.item.id)}
            </figure>
            <p className="flex justify-between">
                <span className="text-sm font-light"> {item.item.title} </span>
                <span className="text-lg font-medium"> ${item.item.price} </span>

            </p>
        </div>
    )
}
export default Card