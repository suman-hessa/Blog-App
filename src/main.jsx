import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AddPosts, AllPosts, EditPosts, Home, Login, Signup, Post} from './pages/index.js'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { AuthLayout } from './components/index.js'
import store from './store/store.js'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      },
      {
        path: "/signup",
        element: <AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>      
        },
      {
        path: "/all-posts",
        element: <AuthLayout authentication={true}>
          <AllPosts />
        </AuthLayout>
      },
      {
        path: "/add-posts",
        element: <AuthLayout authentication={true}>
          <AddPosts />
        </AuthLayout>
      },
      {
        path: "/edit-post/:slug",
        element: <AuthLayout authentication={true}>
          <EditPosts />
        </AuthLayout>
      },
      {
        path: "/post/:slug",
        element: <AuthLayout authentication={true}>
          <Post />
        </AuthLayout>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
      <RouterProvider router={router}>
      <App />
      </RouterProvider>
     </Provider>    
    </StrictMode>,
)
