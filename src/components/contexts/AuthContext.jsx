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
import { doc, collection, setDoc, addDoc, getDoc, getDocs, orderBy, query, deleteDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { db, storage } from '../Database';
import { v4 as uuidv4 } from 'uuid';

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
    const [ comments, writeComments ] = useState({

      name: '',
      date: '',
      photo:'',
      id: '',
      uid: '',
      postID: '',
      comm: ''

    })

    
    const [ userMessage, setUserMessage ] = useState();
    const [ commentIds, setCommentIds ] = useState();
    console.log(commentIds);
    const [ images, setListImages ] = useState([]);
    const [ userComments, setUserComments ] = useState();
    const imageRef = ref(storage, 'images/');

    console.log(userMessage);
    console.log(userComments);
    console.log(comments)
    
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

    function setMessage(e, user, numberOfComments){
      
      setChat({
        id: uuidv4(),
        date: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
        message: e,
        name: user.displayName,
        uid: user.uid,
        photo: user.photoURL
      });

    }

    function setComments(id, comm, user){

      writeComments({

        name: user.displayName,
        date: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
        photo: user.photoURL,
        id: uuidv4(),
        uid: user.uid,
        postID: id,
        comm: comm


      });


    }


    function pushComments(){
      
      // const collectionRef = collection(db, 'comments');

      if(comments.comm !== ''){

       
        return setDoc(doc(db, "comments", comments.id), comments);;

      }
      

    }

    function editComments(id, input){

      const commentRefference = doc(db, "comments", id);
      return updateDoc(commentRefference, {comm: input, date: new Date().toLocaleString('en-GB', { timeZone: 'UTC' })});

    }

    function pushMessages(){

      
      if(chat.message !== ''){

        return setDoc(doc(db, "chat", chat.id), chat);

      }

    }

    async function getMessages(){

     
      const messages = await getDocs(query(collection(db, 'chat'), orderBy("date", 'asc')));
      const filtred = messages.docs.map((doc) => {
 
         return doc.data();
 
     });  
     setUserMessage(filtred);
     
    }


    function deletePosts(id){


      return deleteDoc(doc(db, "chat", id));


    }

    function deleteComments(id){

      return deleteDoc(doc(db, "comments", id));


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

    async function getComments(){

      try{

        const comments = await getDocs(query(collection(db, 'comments'), orderBy("date", 'asc')));
        const filtred = comments.docs.map((doc) => {
          console.log(doc)
          return doc.data();
 
        });
        const getOnlyIdComments = comments.docs.map((doc) => {
          
          return doc.id;
 
        });  
        
        setUserComments(filtred);
        setCommentIds(getOnlyIdComments);

      }catch(e){

        console.log(e.message);

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
        getComments();
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
    <UserContext.Provider value={{ createUser, user, signout, login, resetPassword, completePasswordReset, settingUsername, changeEmail, changePassword, deleteAccount, setMessage, pushMessages, userMessage, getMessages, uploadImages, images, pushComments, setComments, userComments, getComments, deletePosts, deleteComments, commentIds, editComments }}>
      {children}
    </UserContext.Provider>
  )
}


export { AuthProvider };