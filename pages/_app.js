// import UserAuthState from '../context/UserAuthState'
import UserAuthState from '../context/UserAuthState'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
      <UserAuthState>
      <Component {...pageProps} />
      </UserAuthState>

  )
}

export default MyApp
