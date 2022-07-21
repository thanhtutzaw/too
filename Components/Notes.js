import React from 'react'
import styles from '../styles/Notes.module.css'
import {notes} from '../utils/data'
function Notes() {
    function Card ({id,title,text}){
        return (
            <li className={styles.card}>
                <div className={styles.cardTitle}>
                    <h5>{title}</h5>
                </div>
                <div className={styles.cardText}>
                    <p>{text}</p>
                </div>
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