import { useState } from 'react'

import { IconContext } from 'react-icons'
import { FaReact } from 'react-icons/fa'
import { MdAlarm } from 'react-icons/md'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Modal from 'react-modal'

import './App.css'

toast.configure()

const CustomToast = ({ closeToast }) => (
  <>
    <div>Sth went wrong</div>
    <button onClick={closeToast}>Close</button>
  </>
)

Modal.setAppElement('#root')

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const notify = () => {
    toast('Notification!!!', {
      position: toast.POSITION.TOP_LEFT,
    })
    toast.success('Sucess Notification!!!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 10000,
    })
    toast.error(<CustomToast />, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: false,
    })
  }
  return (
    <>
      <IconContext.Provider value={{ size: '15rem', color: 'yellow' }}>
        <div className='App'>
          <FaReact />
          <MdAlarm />

          <button onClick={notify}>Notify</button>
        </div>
      </IconContext.Provider>

      <button onClick={() => setModalIsOpen(true)}>Open modal</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Modal title</h2>
        <p>Modal content</p>

        <div>
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </div>
      </Modal>
    </>
  )
}

export default App
