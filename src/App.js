import { IconContext } from 'react-icons'
import { FaReact } from 'react-icons/fa'
import { MdAlarm } from 'react-icons/md'

import './App.css'

function App() {
  return (
    <IconContext.Provider value={{ size: '15rem', color: 'yellow' }}>
      <div className='App'>
        <FaReact />
        <MdAlarm />
      </div>
    </IconContext.Provider>
  )
}

export default App
