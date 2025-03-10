import { useContext, useState, useEffect } from "react"

import Layout from "../../Components/Layout"
import Card from "../../Components/Card"
import ProductDetail from "../../Components/ProductDetail"


import { ShoppingCartContext } from "../../Context"


function Home() {
  const context = useContext(ShoppingCartContext)
  const currentPath = window.location.pathname
  const categoryProducts = currentPath.split('/')[1]
//solo actualiza la primera vez que accedo
  useEffect(()=>{
    if(categoryProducts == 'shopi'){
      context.setSearchByCategory(null)
      context.setFilteredProducts(null)
    }else{
      context.setSearchByCategory(categoryProducts)
    }
    
  },  [])
 



  const renderView = () => {
    if(context.searchByTitle?.length > 0  || context.searchByCategory?.length > 0) {
      if(context.filteredProducts?.length > 0){
        return (
          context.filteredProducts?.map((item)=> (
          
              <Card 
                  key={item.id}
                  item ={item}
                  
                
                />
          ))
        )  
        
        
      } else{
        return <p>Article not found </p>
      }
    }else{
      return (
        context.items?.map((item)=>{
          return(
            <Card 
              key={item.id}
              item ={item}
              
            
            />
          )
        })

      )
        
      
    }
  }
  //Get products by Title usign in input
  
  

  




  return (
      <Layout >
        
        {/* <label for="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-Black">Search article</label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <MagnifyingGlassIcon className='size-6' />
            </div>Search
            <input type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="article" />
          </div> */}
        <div className="flex flex-col mb-2">
          <h1 className="text-2xl">Home</h1>
          <label >
            Search:  
            <input type='text' 
                  name='searchArticle' 
                  className='border border-gray-300 text-gray-600 rounded-lg' 
                  value={context.searchByTitle}
                  placeholder="search article"
                  onChange={(event) => context.setSearchByTitle(event.target.value)}
            />
          </label>
          {/* <button onClick={()=> searchProduct(nameProduct)}>search</button> */}

        </div>
        
        



        <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
          
          {/* {context.items?.map((item)=>{
              return(
                <Card 
                  key={item.id}
                  item ={item}
                  
                
                />
              )
            })} */}
            {renderView()}
        
        </div>
       
        {/* //esto es para mostrar si se presenta el product detail */}
        {/* { context.isProductDetailOpen ? <ProductDetail />: null} */}
        {/* Cuando no necesitas la else, también puedes utilizar una sintaxis lógica&& más corta : */}
        {context.isProductDetailOpen && <ProductDetail />}
        
      </Layout>
    )
  }
  
export default Home