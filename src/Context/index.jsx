import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  //Shopping Cart
  const [count, setCount] = useState(0);

  //date
  const [dateInitial] = useState(new Date());
  const formatDate = dateInitial.toLocaleDateString("es-ES");

  //view detalle del product al hacer clic en "+"
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  //OPen/close Product Detail
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  //Abir el detalle de el carrito de compras
  const [isShopingCartOpen, setIsShopingCartOpen] = useState(false);
  //open close Shopingcart
  const openShopingCart = () => setIsShopingCartOpen(true);
  const closeShopingCart = () => setIsShopingCartOpen(false);

  //obtener el producto seleccionado
  const [selectedProduct, setSelectedProduct] = useState({});

  //Obtener Lista de Productos
  const [listProducts, setListProducts] = useState([]);
  //fijar la lista de productos en setListProducts
  const storeProductsSelected = (product) => {
    // setListProducts((currentProducts)=> [...currentProducts, product])
    setListProducts([...listProducts, product]);
  };

  //estado para guardar mi orden actual
  const [myOrder, setMyOrder] = useState([]);

  //Get products API
  const [items, setItems] = useState([]);

  //Seacrh prodcut by title
  const [searchByTitle, setSearchByTitle] = useState(null);

  //Filtered products by title
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  //filtered products by category
  const [searchByCategory, setSearchByCategory] = useState(null);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        // setFilteredProducts(data)
      });
  }, []);

  const renderToFilteredProduct = (items, searchByTitle) => {
    return items.filter((item) =>
      item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };


  const filteredProductByCategory = (items, searchByCategory) => {
    return items.filter((item) =>
      item.category.name.toLowerCase().includes(searchByCategory.toLowerCase())
    );
  };


  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if(searchType == 'TITLE'){
        return renderToFilteredProduct(items, searchByTitle)
    }
    if(searchType == 'CATEGORY'){
        return filteredProductByCategory(items, searchByCategory)
    }
    if(searchType == 'TITLE_CATEGORY'){

        const listProductsByCategory = filteredProductByCategory(items,searchByCategory)

        return renderToFilteredProduct(listProductsByCategory, searchByTitle)
    }

    if(!searchType){
        return items
    }

  }

  //Escuchando lso cambios del estado segun se cambia el input o de la categoria
  useEffect(() => {
    if (searchByTitle && searchByCategory)
        setFilteredProducts(filterBy('TITLE_CATEGORY', items, searchByTitle, searchByCategory));
    if (searchByTitle && !searchByCategory)
      setFilteredProducts(filterBy('TITLE', items, searchByTitle, searchByCategory));
    if (!searchByTitle && searchByCategory) 
      setFilteredProducts(filterBy('CATEGORY',items, searchByTitle, searchByCategory));
    if (!searchByTitle && !searchByCategory) 
        setFilteredProducts(filterBy(null,items, searchByTitle, searchByCategory));

  }, [items, searchByTitle, searchByCategory]);

  console.log("products filteres", filteredProducts);



  //Filtered category items


  
  console.log("products filteres by category and title", searchByCategory, searchByTitle);

  //function to filtered products
  //   const renderToFilteredProduct = (event) => {
  //     //Value input
  //     let valueSearchByTitle = event.target.value.toLowerCase()
  //     // Assign valu input to setSearchByTitle
  //     setSearchByTitle(valueSearchByTitle)

  //     //Filter products
  //     const filteredProductsByTitle = items.filter(item => item.title.toLowerCase().includes(valueSearchByTitle))

  //     if(filteredProductsByTitle.length > 0){
  //       context.setFilteredProducts(filteredProductsByTitle)

  //     }else{
  //       return (
  //         <div>Article not found!</div>
  //       )
  //     }

  //   }

  //  debugger
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
        dateInitial,
        formatDate,
        items,
        setItems,
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
