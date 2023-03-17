import React, { useContext, createContext, useState, useEffect } from 'react'
import { auth } from '../Database';
import { 
  createUserWithEmailAndPassword,
  updatePassword, 
  sendPasswordResetEmail,
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  verifyPasswordResetCode, confirmPasswordReset,
  updateProfile, updateEmail, reauthenticateWithCredential, deleteUser 
} from 'firebase/auth'

// Initialise the context
const UserContext = createContext();

// Enables us to have acces to the context throught the application
export const UserAuth = () => {

  return useContext(UserContext);

};

// Children comes from destructuring to not deal with a lot of props
// This is why we wrap element inside of this functional component to have acces to the context values
// Represents the data that is updated and displayed
const AuthProvider = ({children}) => {
  
    // const [ loading, setLoading ] = useState(true);
    const [ user, setUser ] = useState({});
  
    const createUser = (email,password) => {

      return createUserWithEmailAndPassword(auth, email, password);
  
    }

    const signout = () => {

      return signOut(auth);


    }

    function login(email, password) {

        return signInWithEmailAndPassword(auth, email, password);
    
    }
 
    function resetPassword(email) {
        
      return sendPasswordResetEmail(auth, email);

    }


    function completePasswordReset(oobCode, password){

      return confirmPasswordReset(auth, oobCode, password);

    }  

    function settingUsername(user, name){

      console.log(name)
      return updateProfile(user, {
        displayName: name,
      });
      

    }

    function changeEmail(user, email){

      console.log(user)
      return updateEmail(user, email);

    }
    
    function changePassword(user, password){

      console.log(user)
      return updatePassword(user, password);

    }

    function deleteAccount(user){

      return deleteUser(user);

    }

      // When we unmount this component the state is not focusing on the current user anymore
      // This way we can begin from empty state and create another user
      
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          console.log(currentUser);
          setUser(currentUser);
        });
        return () => {
          unsubscribe();
        };
      }, []);

      // useEffect(() => {
      //   const unsubscribe = auth.onAuthStateChanged(user => {
      //     setCurrentUser(user)
      //     setLoading(false)
      //   })
    
      //   return unsubscribe
      // }, [])

  return (
    <UserContext.Provider value={{ createUser, user, signout, login, resetPassword, completePasswordReset, settingUsername, changeEmail, changePassword, deleteAccount }}>
      {children}
    </UserContext.Provider>
  )
}


export { AuthProvider };