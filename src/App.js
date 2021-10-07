import { useState, forwardRef } from 'react'

import { IconContext } from 'react-icons'
import { FaReact } from 'react-icons/fa'
import { MdAlarm } from 'react-icons/md'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Modal from 'react-modal'

import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'

import CountUp, { useCountUp } from 'react-countup'

import './App.css'
import IdleTimerContainer from './components/IdleTimerContainer'

toast.configure()

const ChildrenTooltip = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <h2>Tooltip title</h2>
      <p>Tooltip content</p>
    </div>
  )
})

const CustomToast = ({ closeToast }) => (
  <>
    <div>Sth went wrong</div>
    <button onClick={closeToast}>Close</button>
  </>
)

Modal.setAppElement('#root')

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { countUp, start, pauseResume, reset, update } = useCountUp({
    duration: 5,
    end: 10000,
    startOnMount: false,
  })

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

      <Tippy
        content={<CustomToast />}
        arrow={false}
        delay={500}
        placement='right'
      >
        <button>Hover</button>
      </Tippy>

      <Tippy content={<CustomToast />}>
        <ChildrenTooltip />
      </Tippy>

      <div>
        <h5>{countUp}</h5>
        <button onClick={start}>Start</button>
        <button onClick={reset}>Reset</button>
        <button onClick={pauseResume}>Pause</button>
        <button onClick={() => update(2000)}>Update to 2000</button>
      </div>
      <CountUp start={500} end={1000} duration={5} prefix='$' decimals={2} />

      <IdleTimerContainer></IdleTimerContainer>
    </>
  )
}

export default App
