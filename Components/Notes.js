import React, { useState } from 'react'
import styles from '../styles/Notes.module.css'
import { notes } from '../utils/data'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Notes() {
    function Card({ id, title, text }) {
        return (
                <Link prefetch scroll={false} href={`/${id}`}>
                    <a key={id} className={styles.card}>
                        <div layoutid={`title-${id}`} className={styles.cardTitle}>
                            <h5>{title}</h5>
                        </div>

                        <div layoutid={`text-${id}`} className={styles.cardText}>
                            <p>{text}</p>
                        </div>
                    </a>
                </Link>
        )
    }
    return (
        // <div className={styles.cardContainer}>
            <div className={styles.cardContainer} >
                {notes.map(note =>
                (
                    <Card key={note.id} {...note} />
                )
                )}
            </div>
        // </div>

    )
}

export default Notes