import React, { useState } from 'react'
import s from '../styles/Home.module.css'
import { motion } from 'framer-motion'
import useSound from 'use-sound'
import checkSound from '/public/enable-sound.mp3'
import uncheckSound from '/public/disable-sound.mp3'
function Footer({ setOpenNew }) {
  const [active, setactive] = useState(false)

  const [playOn] = useSound(checkSound,
    { volume: 0.1 })
  const [playOff] = useSound(uncheckSound,
    { volume: 0.1 })
  function handle() {
    // if (e.keyCode == 27) {
    //   setactive(prev => !prev)
    // }
    setactive(prev => !prev)
    if (active) {
      playOff()
    }
    else {
      playOn()
    }
  }
  return (
    <div className={s.footerContainer}>
      <button onKeyDown={(e) => { if (active && e.key === 'Escape') { handle() } }} style={{ cursor: !active ? 'pointer' : 'default' }} onClick={() => { if (!active) { handle() } }} className={`${s.addBtn} ${active ? s.active : ''}`}>
        <span onClick={() => { if (active) { handle() } }} className={`${s.buttonText} ${active ? s.rotate : ''}`}>+</span>
      </button>
    </div>
  )
}
export default Footer