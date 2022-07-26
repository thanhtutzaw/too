import React, { useState } from 'react'
import styles from '../styles/Notes.module.css'
import { notes } from '../utils/data'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
function Notes({selectedId}) {
    // const [selectedId, setselectedId] = useState(null);
//     const router = useRouter()
//   const { currentId } = router.query
//   console.log(currentId)
    function Card({ id, title, text }) {
        return (
            <Link href={`/${id}`}>
                <motion.li layoutId={id}  className={styles.card}>
                    <div  className={styles.cardTitle}>
                        <h5>{title}</h5>
                    </div>

                    <div  className={styles.cardText}>
                        <p>{text}</p>
                    </div>
                </motion.li>
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


        <ul className={styles.cardContainer}>
            {notes.map(note =>
            (
                <Card key={note.id} {...note}  />

                // <Card key={note.id} {...note} isSelected={note.id === selectedId} />
            )
            )}
        </ul>

    )
}

export default Notes