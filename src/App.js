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

import { ChromePicker } from 'react-color'

import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'

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
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [color, setColor] = useState('#fff')

  const [number, setNumber] = useState('')
  const [name, setName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [focus, setFocus] = useState('')

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

      <button
        onClick={() =>
          setShowColorPicker((showColorPicker) => !showColorPicker)
        }
      >
        {showColorPicker ? 'Close color picker' : 'Pick a color'}
      </button>
      {showColorPicker && (
        <ChromePicker
          color={color}
          onChange={(updatedColor) => setColor(updatedColor.hex)}
        />
      )}
      <h2>You picked {color}</h2>

      <Cards
        number={number}
        name={name}
        expiry={expiry}
        cvc={cvc}
        focused={focus}
      />
      <form>
        <input
          type='tel'
          name='number'
          placeholder='Card Number'
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          type='text'
          name='name'
          placeholder='Card Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          type='text'
          name='expiry'
          placeholder='MM/YY Expiry'
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          type='tel'
          name='cvc'
          placeholder='CVC'
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
      </form>
    </>
  )
}

export default App
