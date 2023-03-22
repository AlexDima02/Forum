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
import { doc, collection, setDoc, addDoc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { db, storage } from '../Database';

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
    const [ chat, setChat ] = useState({

        id: '',
        date: '',
        message: '',
        name: '',
        uid: '',
        photo: ''

    });
    const [ userMessage, setUserMessage ] = useState();
    const [ images, setListImages ] = useState([]);
    const imageRef = ref(storage, 'images/');

    console.log(userMessage);
    console.log(chat)
    console.log(images)
  
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

    function settingUsername(user, name, photo){
      
      console.log(name)
      return updateProfile(user, {
        displayName: name,
        photoURL: photo
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

    function setMessage(e, user){
      
      setChat({
        id: Math.random(),
        date: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
        message: e,
        name: user.displayName,
        uid: user.uid,
        photo: user.photoURL
      });

    }

    function pushMessages(){

      const collectionRef = collection(db, 'chat');
      if(chat.message !== ''){

        console.log('Partie')
        return addDoc(collectionRef, chat);

      }

    }

    async function getMessages(){

     
      const messages = await getDocs(query(collection(db, 'chat'), orderBy("date", 'asc')));
      const filtred = messages.docs.map((doc) => {
 
         return doc.data();
 
     });  
     setUserMessage(filtred);
     
    }

    function uploadImages(file){

      console.log(file.name)
      const storage = getStorage();
      const storageRef = ref(storage, `images/${file.name}`);
      return uploadBytes(storageRef, file);

    }

    async function getImages(){

      try{

       const image = await listAll(imageRef);
       image.items?.map((img) => {

          getDownloadURL(img).then((res) => {

              setListImages((prev) => [...prev, res]);

          });

       });

      }catch(e){
        console.log(e);

      }

    }


      // When we unmount this component the state is not focusing on the current user anymore
      // This way we can begin from empty state and create another user
      
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          console.log(currentUser);
          setUser(currentUser);
        });
        getMessages();
        getImages();
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
    <UserContext.Provider value={{ createUser, user, signout, login, resetPassword, completePasswordReset, settingUsername, changeEmail, changePassword, deleteAccount, setMessage, pushMessages, userMessage, getMessages, uploadImages, images }}>
      {children}
    </UserContext.Provider>
  )
}


export { AuthProvider };