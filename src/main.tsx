import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss'

//imports
import { createBrowserRouter , RouterProvider } from 'react-router-dom';

//import routes
import Home from './views/Home/Home.tsx'
import Pokemon from './views/Pokemon/Pokemon.tsx'
//types
type route = {path: string, element: React.ReactElement};
type routes = route[]

const routes: routes = [
    {
        path:'/',
        element : <Home/>
    },
    {
        path:'/Pokemon',
        element: <Pokemon/>
    }
  
]

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
