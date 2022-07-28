import { useRouter } from 'next/router'
import React from 'react'
import Header from '../../Components/Header'
import Layout from '../../Components/Layout'
import Notes from '../../Components/Notes'

export default function Note() {
  const router = useRouter()
  let { id } = router.query
  id = parseInt(id)
  return (
    <div>{id}</div>
  )
}
Note.getLayout = function getLayout(page){
  return(
    <Layout>
      {/* <Home /> */}
    {page}
    <Notes />
    </Layout>
    
  )
}
