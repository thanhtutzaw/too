// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  // const key = process.env.FIREBASE_PRIVATE_KEY
  const key = process.env.TEST_DATA
  const keyJson = JSON.parse(key)
  
  // console.log(typeof (key), JSON.parse(key).replace(/\n/gm, "\n"))
  console.log(typeof (keyJson), keyJson)
  res.status(200).json({ name: 'John Doe' , key : key })
    // console.log("first")
}
