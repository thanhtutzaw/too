import React, { createRef, useEffect, useState } from 'react'
import styles from '../styles/Notes.module.css'
// import { notes } from '../utils/data'
import Link from 'next/link'
// import firebase from 'firebase/compat/app';
import { useAuthUser } from 'next-firebase-auth';
// import Isotope from 'isotope-layout';
import { useRef } from 'react';
// import isotope from 'isotope-layout';
// import {  } from 'firebase'

export default function Notes(props) {
    const { notes, isSearching } = props;
    function Card({ id, title, text, index }) {

        // function getStyle(elem) {
        //     if (typeof window !== 'undefined') {
        //         var style = getComputedStyle(elem);
        //         if (!style) {
        //             logError('Style returned ' + style +
        //                 '. Are you running this code in a hidden iframe on Firefox? ' +
        //                 'See https://bit.ly/getsizebug1');
        //         }
        //         return style;
        //     }
        // }
        // let elements
        // if (typeof window !== 'undefined') {
        //     elements = document.querySelectorAll('#card')

        //     var elem = document.querySelectorAll('.cardContainer')
        //     // console.log(elem)
        //     // var iso = new Isotope(elem, {
        //     //     // options
        //     //     itemSelector: '.card',
        //     //     layoutMode: 'masonry'
        //     // });
        // }
        // elements?.forEach((ele) => {
        //     // console.log("hey")
            
        //     const style = getStyle(ele);
        //     // ele.style.color = 'red !important'
        //     // console.log(style.width)
        //     // ele.style.color = 'red'
        // })
        // let width = 150

            
            

        return (
            <Link href={`/${id}`}>
                <div id="card"  key={id} className={styles.card}>
                {/* <a id="card" style={{ width: width + 'px', transform: `translate(${width + 16 * index / index}px,${width + 16 * index}px)` }} key={id} className={styles.card}> */}
                    <div layoutid={`title-${id}`} className={styles.cardTitle}>
                        {title}
                    </div>

                    <div layoutid={`text-${id}`} className={styles.cardText}>
                        <p>{text}</p>
                    </div>
                </div>
            </Link>
        )
    }
    const [totalHeight, settotalHeight] = useState(0);
    useEffect(() => {
        let elements = document.querySelectorAll('#card')
        
        let height;
        let totalHeight = 0;
        elements?.forEach(ele => {
            height = getComputedStyle(ele).height;
            // settotalHeight(totalHeight += parseInt(height))

            for (let i = 0; i < elements?.length; i++) {
                let arr = []
                //  height += height


            }
        })
        // totalHeight += parseInt(height) 
        // let arr =[]         
        // let newarr = arr.push(height)
        // arr.concat(newarr)
        // console.log(arr)

        console.log(totalHeight)
    }, [totalHeight]);
    

        // return elements 
        const container = useRef(null)  
    if (typeof window !== 'undefined') {
        var elem = document.querySelectorAll('.cardContainer')[0]

        // var elem = document.querySelectorAll('.cardContainer')
        console.log(elem)
        var elem = container.current
        // var iso = new isotope(elem, {
        //     itemSelector: '#card',
        //     layoutMode: 'masonry'
        // });
    }
    
    return (
        <div ref={container} style={{ pointerEvents: isSearching ? 'none' : 'auto' }} className={styles.cardContainer} >
            {/* <div> */}
                            {/* <div  style={{height:`${totalHeight + 190}px`}} > */}
                {notes.map((note, index) =>
                (
                    <Card index={index} key={note.id} {...note} />
                )
                )}
            {/* </div> */}
        </div>
    )
}
