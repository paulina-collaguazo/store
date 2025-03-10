import { useRoutes, BrowserRouter } from 'react-router-dom'
import { ShoppingCartProvider } from '../../Context'

import Home from '../Home'
import MyOrder from '../MyOrder'
import MyAccount from '../MyAccount'
import MyOrders from '../MyOrders'
import SignIn from '../SignIn'
import NotFound from '../NotFound'
import './App.css'
import NavBar from '../../Components/NavBar'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'

const AppRoutes = () => {
    let routes = useRoutes([
        { path: '/', element: <Home /> },
        { path: '/shopi', element: <Home /> },
        { path: '/shopi', element: <Home /> },
        { path: '/clothes', element: <Home /> },
        { path: '/electronics', element: <Home /> },
        { path: '/furniture', element: <Home /> },
        { path: '/shoes', element: <Home /> },


        { path: '/my-account', element: <MyAccount /> },
        { path: '/my-order', element: <MyOrder /> },
        { path: '/my-orders', element: <MyOrders /> },
        { path: '/my-orders/last', element: <MyOrder /> },
        { path: '/my-orders/:id', element: <MyOrder /> },
        { path: '/sign-in', element: <SignIn /> },
        { path: '/*', element: <NotFound /> },
    ])

    return routes
}

const App = () => {
//   const [count, setCount] = useState(0)

  return (
    <ShoppingCartProvider>
      <BrowserRouter >
        <AppRoutes />
        <NavBar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App
