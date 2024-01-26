import './App.css'
import MyTabs from './screens/Teach'
import { ConfigProvider } from 'antd'

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
        <MyTabs />
      </div>
    </ConfigProvider>
  )
}

export default App
