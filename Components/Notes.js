import React, { useState } from 'react'
import styles from '../styles/Notes.module.css'
import { notes } from '../utils/data'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
function Notes() {
    // const [selectedId, setselectedId] = useState(null);
    function Card({ id, title, text }) {
        return (

            <Link href='/abc'>
            <li className={styles.card}>

<div className={styles.cardTitle}>
    <h5>{title}</h5>
</div>

<div className={styles.cardText}>
    <p>{text}</p>
</div>
</li>
            </Link>
        )
        {/* <AnimatePresence>
                {selectedId && (
                    <motion.li layoutId={selectedId} className={styles.card}>
                    <motion.div className={styles.cardTitle}>
                        <motion.h5>{title}</motion.h5>
                    </motion.div>
                    <motion.div className={styles.cardText}>
                        <motion.p>{text}</motion.p>
                    </motion.div>
                        <motion.button onClick={() => setselectedId(null)} />
                </motion.li>
                )}
            </AnimatePresence> */}

    }
    return (
        // <Link href={`/${id}`}>
        <ul className={styles.cardContainer}>
            {notes.map(note =>
            (
                <Card key={note.id} {...note} />
                // <Card key={note.id} {...note} isSelected={note.id === selectedId} />
            )
            )}
        </ul>
        // </Link>
    )
}

export default Notes