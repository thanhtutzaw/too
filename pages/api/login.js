import { setAuthCookies } from 'next-firebase-auth'
import initAuth from "../../utils/initAuth";


initAuth() 
// login  // add cookie //only can call in SSR
const handler =  async(req,res) => {
  // const key =  process.env.FIREBASE_PRIVATE_KEY
  // console.log(typeof(key) , key)
  try {
    // if()
    await setAuthCookies(req, res)
    console.info("added cokkies from login api")
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    return res.status(500).json({ error: 'Unexpected error when Login' })
  }
  return res.status(200).json({ status: true })
}

export default handler
