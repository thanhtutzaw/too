import React from 'react'
import s from '../styles/Home.module.css'
import { motion } from 'framer-motion'
function Footer({ setOpenNew }) {
  return (
    <div className={s.footerContainer}>
    <button onClick={setOpenNew(true)} className={s.addBtn}>+</button>
    </div>
  )
}
export default Footer