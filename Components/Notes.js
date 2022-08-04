import React, { useState } from 'react'
import styles from '../styles/Notes.module.css'
import { notes } from '../utils/data'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Notes() {
    // const [selectedId, setselectedId] = useState(null);
    //     const router = useRouter()
    //   const { currentId } = router.query
    //   console.log(currentId)
    function Card({ id, title, text }) {
        // <Link href={`/${id}`}>
        return (
            <>
                <Link  scroll={false} href={`/${id}`}>
                    <a>
                        <li className={styles.card}>
                            <div layoutId={`title-${id}`} className={styles.cardTitle}>
                                <h5>{title}</h5>
                            </div>

                            <div layoutId={`text-${id}`} className={styles.cardText}>
                                <p>{text}</p>
                            </div>
                        </li>
                    </a>
                </Link>

            </>
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
                <Card key={note.id} {...note} />

                // <Card key={note.id} {...note} isSelected={note.id === selectedId} />
            )
            )}
        </ul>

    )
}

export default Notes