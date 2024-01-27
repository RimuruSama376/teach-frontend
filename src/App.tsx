import './App.css'
import MyTabs from './screens/Teach'
import { ConfigProvider } from 'antd'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MyTabs />
  }
])

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Nunito'
        }
      }}
    >
      <div className='App'>
        <RouterProvider router={router} />
      </div>
    </ConfigProvider>
  )
}

export default App
