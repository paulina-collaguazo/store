import React, { createContext, useState, useEffect } from 'react'

    
interface Product  {
  id: number,
  title: string,
  description: string,
  price: number,
  category: Category
  
  
}
type Category = {
  id: number;
  name: string;
  image: string;
}

type Order = {
  currentDate: string;
  products: Product[];
  totalPriceProducts: number;
  totalProducts: number;

}

type ProductContextType = {
  count: number;
  setCount: (value: number) => void;
  

  isProductDetailOpen: boolean;
  openProductDetail: () => void;
  closeProductDetail: () => void;

  isShopingCartOpen: boolean;
  openShopingCart: () => void;
  closeShopingCart: () => void;

  products: Product[];
  setProducts: (value: Product[]) => void;
  
  selectedProduct: Product | undefined;
  setSelectedProduct: (value: Product) => void;


  listProducts: Product[];
  setListProducts: (value: Product[]) => void;
  storeProductsSelected:(value: Product) => void;

  searchByTitle: string;
  setSearchByTitle: (value: string) => void;

  filteredProducts: Product[];
  setFilteredProducts: (value: Product[]) => void

  searchByCategory: string;
  setSearchByCategory: (value: string) => void;

  // filteredProductsByTitle:(products: Product[], searchByTitle: string)=> Product[] 

  myOrder: Order[]
  setMyOrder: (value: Order[]) => void

  // filteredProductByCategory: (products: Product[], searchByCategory: string) => Product[]

  // filterBy: (searchType: string, products: Product[], searchByTitle: string, searchByCategory: string) => Product[]


}

export const ShoppingCartContext = createContext<ProductContextType | undefined>(undefined);

export const ShoppingCartProvider = ({ children }: {children: React.ReactNode}) => {
  //Shopping Cart counter
  const [count, setCount] = useState<number>(0);

 

  //Detail product
  const [isProductDetailOpen, setIsProductDetailOpen] = useState<boolean>(false);
  //OPen/close Product Detail
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  //Open detail shoping cart
  const [isShopingCartOpen, setIsShopingCartOpen] = useState<boolean>(false);
  //open close Shopingcart
  const openShopingCart = () => setIsShopingCartOpen(true);
  const closeShopingCart = () => setIsShopingCartOpen(false);

  //Selected product 
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

  //Get list products
  const [listProducts, setListProducts] = useState <Product[]>([]);
  //fijar la lista de productos en setListProducts
  const storeProductsSelected = (product: Product) => {
    // setListProducts((currentProducts)=> [...currentProducts, product])
    setListProducts([...listProducts, product]);
  };

  //State for save my current order
  const [myOrder, setMyOrder] = useState<Order[]>([]);

  //Get API products 
  const [products, setProducts] = useState<Product[]>([]);

  //Search product by title
  const [searchByTitle, setSearchByTitle] = useState<string>('');

  //Filtered products by title
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  //Filtered products by category
  const [searchByCategory, setSearchByCategory] = useState<string>('');

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        // setFilteredProducts(data)
      });
  }, []);




  const filteredProductsByTitle = (products: Product[], searchByTitle: string): Product[] => {
    if(!searchByTitle) return products;
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };


  const filteredProductByCategory = (products: Product[], searchByCategory: string): Product[] => {
    if(!searchByCategory) return products
    return products.filter((product) =>
      product.category.name.toLowerCase().includes(searchByCategory.toLowerCase())
    );
  };


  const filterBy = (searchType: string, products: Product[], searchByTitle: string, searchByCategory: string): Product[] => {
    if(searchType === 'TITLE'){
        return filteredProductsByTitle(products, searchByTitle)
    }
    if(searchType === 'CATEGORY'){
        return filteredProductByCategory(products, searchByCategory)
    }
    if(searchType === 'TITLE_CATEGORY'){

        const listProductsByCategory: Product[] = filteredProductByCategory(products, searchByCategory)

        return filteredProductsByTitle(listProductsByCategory, searchByTitle)
    }
    return products
    

  }

  //Escuchando los cambios del estado segun se cambia el input o  la categoria
  useEffect(() => {
    if (searchByTitle && searchByCategory)
        setFilteredProducts(filterBy('TITLE_CATEGORY', products, searchByTitle, searchByCategory));
    if (searchByTitle && !searchByCategory)
      setFilteredProducts(filterBy('TITLE', products, searchByTitle, searchByCategory));
    if (!searchByTitle && searchByCategory) 
      setFilteredProducts(filterBy('CATEGORY',products, searchByTitle, searchByCategory));
    if (!searchByTitle && !searchByCategory) 
        setFilteredProducts(filterBy('', products, searchByTitle, searchByCategory));

  }, [products, searchByTitle, searchByCategory]);




  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        isProductDetailOpen,
        openProductDetail,
        closeProductDetail,
        selectedProduct,

        setSelectedProduct,
        isShopingCartOpen,
        openShopingCart,
        closeShopingCart,
        listProducts,
        setListProducts,
        storeProductsSelected,
        myOrder,
        setMyOrder,
   
        products,
        setProducts,
        filteredProducts,
        setFilteredProducts,
        searchByTitle,
        setSearchByTitle,
        searchByCategory,
        setSearchByCategory,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
