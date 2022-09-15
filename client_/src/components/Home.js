import { useContext} from 'react'
import {AuthorizationContext} from '../App'
import PublicHomePage from './Home/PublicHomePage'
import UserHomePage from './Home/UserHomePage'

function Home(){
  const authorizationContext = useContext(AuthorizationContext)
  
  return (
    <>
      <section>
        {
          authorizationContext.isAuthorized ?
            <UserHomePage />:
            <PublicHomePage />
        }
      </section>
    </>
  )
}

export default Home