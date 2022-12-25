import React, { useState } from 'react'
import s from '../styles/Home.module.css'
import { motion } from 'framer-motion'
import useSound from 'use-sound'
import checkSound from '/public/enable-sound.mp3'
import uncheckSound from '/public/disable-sound.mp3'
import { BiArrowBack } from 'react-icons/bi'
import { useEffect } from 'react'
function Footer({ setOpenNew }) {
  const [active, setactive] = useState(false)
  const [playOn] = useSound(checkSound,
    { volume: 0.1 })
  const [playOff] = useSound(uncheckSound,
    { volume: 0.1 })
  useEffect(() => {
    if (active == true) {
      window.location.hash = "#Note"
    } else {
      window.location.hash = "home"
    }
    window.onhashchange = (e) => {
      // console.log(window.location.hash === '#home')
    }
    window.onpopstate = (e) => {
      // console.log(window.location.hash === '#home')
      if (window.location.hash === '#home') {
        setactive(false)
      } else {
        setactive(true)
        // playOn()
      }
    }
    if (active === true) {
      playOn()
    } else {
      playOff() 
    }
    // window.onhashchange = (e) => {
    //   if(window.location.hash === "hello"){
    //   }else{
    //     // setactive(false)

    //   }
    // }
    // if(window.location.hash != "hello"){
    //   setactive(false)
    // }else{
    //   setactive(true)
    // }

    window.addEventListener('popstate', () => {
      // console.log("jey")
      // st
    })
  }, [active]);

  function handle() {
    // if (e.keyCode == 27) {
    //   setactive(prev => !prev)
    // }
    setactive(prev => !prev)
    if (active) {
      // playOff()
    }
    else {
      // playOn()
    }
  }
  return (
    <div className={s.footerContainer}>
      {/* {active &&
      <> */}
      <div className={`${s.addContainer} ${active ? s.active : ''}`}>
        {/* <div className={s.viewHeader}>
            <div className={s.backBtn}><BiArrowBack onClick={() => window.history.back()} /></div>
          </div> */}
        <div className={s.viewHeader}>
          <div className="backBtn"><BiArrowBack onClick={() => handle()} /></div>
        </div>
        <div className={s.viewContent}>
          <h3 className={s.titleView} contentEditable ></h3>
          <p className={s.textView} contentEditable> d</p>
        </div>
        {/* <motion.div className={styles.titleView} layoutId={`title-${id}`} contentEditable="true" aria-multiline="true" role="textbox" tabIndex="0" aria-label="Title" spellCheck="true" >
            {note.title}
          </motion.div>
          <motion.div className={styles.textView} layoutId={`title-${id}`} contentEditable="true" aria-multiline="true" role="textbox" tabIndex="0" aria-label="Title" spellCheck="true" >
            {note.text}
          </motion.div> */}
      </div>
      {/* </>} */}
      <button onKeyDown={(e) => { if (active && e.key === 'Escape') { handle() } }} style={{ cursor: !active ? 'pointer' : 'default' }} onClick={() => { if (!active) { handle() } }} className={`${s.addBtn} ${active ? s.active : ''}`}>
        <span onClick={() => { if (active) { handle() } }} className={`${s.buttonText} ${active ? s.rotate : ''}`}>+</span>
      </button>
    </div>
  )
}
export default Footer