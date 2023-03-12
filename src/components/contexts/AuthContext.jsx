import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../Database';

// Initialise the context
const AuthContext = React.createContext()

// Enables us to have acces to the context by having useAuth hook
export function useAuth(){

    return useContext(AuthContext);


}

function AuthProvider({children}) {
  
    const [ currentUser, setCurrentUser ] = useState();
    console.log(currentUser);
    const [ loading, setLoading ] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
      }
    
      function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
      }
    
      function logout() {
        return auth.signOut()
      }
    
      function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
      }
    
      function updateEmail(email) {
        return currentUser.updateEmail(email)
      }
    
      function updatePassword(password) {
        return currentUser.updatePassword(password)

      }

      // When we unmount this component the state is not focusing on the current user anymore
      // This way we can begin from empty state and create another user
      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user)
          setLoading(false)
        })
    
        return unsubscribe
      }, [])

    const value = {

        currentUser,
        signup

    }
  
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}


export { AuthProvider };