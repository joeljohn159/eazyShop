import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from '../src/RootLayout'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Provider } from 'react-redux';
import store from './store.js';
import CartScreen from './screens/CartScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingScreen from './screens/ShippingScreen.jsx';
import ProtectedRoute from './components/PrivateRoute.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import OrderListScreen from './screens/admin/OrderListScreen.jsx';
import ProductListScreen from './screens/admin/ProductListScreen.jsx';
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx';
import UserListScreen from './screens/admin/UserListScreen.jsx';
import UserEditScreen from './screens/admin/UserEditScreen.jsx';
import { HelmetProvider } from 'react-helmet-async';


const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, children: [
      { index: true, path: '/', element: <HomeScreen /> },
      { path: '/search/:keyword', element: <HomeScreen /> },
      { path: '/page/:pageNumber', element: <HomeScreen /> },
      { path: '/search/:keyword/page/:pageNumber', element: <HomeScreen /> },
      { path: 'product/:id', element: <ProductScreen /> },
      { path: '/cart', element: <CartScreen /> },
      { path: '/login', element: <LoginScreen /> },
      { path: '/register', element: <RegisterScreen /> },
      {
        path: '', element: <ProtectedRoute />, children:
          [{ path: '/shipping', element: <ShippingScreen /> },
          { path: '/payment', element: <PaymentScreen /> },
          { path: '/placeorder', element: <PlaceOrderScreen /> },
          { path: '/order/:id', element: <OrderScreen /> },
          { path: '/profile', element: <ProfileScreen /> }
          ]
      },
      {
        path: '', element: <AdminRoute />, children: [
          { path: '/admin/orderlist', element: <OrderListScreen /> },
          { path: '/admin/productList', element: <ProductListScreen /> },
          { path: '/admin/productList/:pageNumber', element: <ProductListScreen /> },
          { path: '/admin/product/:id/edit', element: <ProductEditScreen /> },
          { path: '/admin/userlist', element: <UserListScreen /> },
          { path: '/admin/user/:id/edit', element: <UserEditScreen /> }
        ]
      }
    ]
  }
])

function App() {

  return (
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer />
      </Provider>
    </HelmetProvider>

  )
}

export default App
