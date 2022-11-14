import React from 'react'
import styles from '../styles/Notes.module.css'
// import { notes } from '../utils/data'
import Link from 'next/link'
// import firebase from 'firebase/compat/app';
import { useAuthUser } from 'next-firebase-auth';
// import {  } from 'firebase'

export default function Notes(props) {
    const { notes } = props;
    function Card({ id, title, text }) {
        return (
            <Link scroll={false} href={`/${id}`}>
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
        <div className={styles.cardContainer} >
            {notes.map(note =>
            (
                <Card key={note.id} {...note} />
            )
            )}
        </div>
    )
}
