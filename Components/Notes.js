import React, { useState } from 'react'
import styles from '../styles/Notes.module.css'
import { notes } from '../utils/data'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Notes() {
    function Card({ id, title, text }) {
        return (
            <li className={styles.card} >
                <Link scroll={false} href={`/${id}`}>
                    <div>
                        <div layoutId={`title-${id}`} className={styles.cardTitle}>
                            <h5>{title}</h5>
                        </div>

                        <div layoutId={`text-${id}`} className={styles.cardText}>
                            <p>{text}</p>
                        </div>
                    </div>
                </Link>
            </li>
        )
    }
    return (


        <ul className={styles.cardContainer}>
            {notes.map(note =>
            (
                <Card key={note.id} {...note} />
            )
            )}
        </ul>

    )
}

export default Notes