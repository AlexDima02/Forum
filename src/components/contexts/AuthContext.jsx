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
import { doc, collection, setDoc, addDoc, getDoc, getDocs, orderBy, query, deleteDoc, updateDoc, deleteField, arrayRemove, arrayUnion } from "firebase/firestore";
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

    });


    const [ userMessage, setUserMessage ] = useState();
    const [ images, setListImages ] = useState([]);
    const [ userComments, setUserComments ] = useState();
    const [ commentReplies, setCommentReplies ] = useState();
    const imageRef = ref(storage, 'images/');
    const [ like, setLikes ] = useState(false);
    const [ replies, writeReplies ] = useState({

      commID: '',
      uid: '',
      reply: '',
      date: '',
      name: ''


    })

    console.log(replies);
    // console.log(userMessage);
    // console.log(userComments);
    // console.log(comments)
    
    // console.log(like)
    
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
        photo: user.photoURL,
        likes: []
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
    function setReplies(input){

      writeReplies({

        commID: uuidv4(),
        uid: user.uid,
        reply: input,
        date: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
        name: user.displayName,


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

    // Delete top level comments
    function deleteComments(id){

      return deleteDoc(doc(db, "comments", id));


    }

    // Delete second level comments
    function deleteReplies(id){
      console.log(id)
      return deleteDoc(doc(db, "replies", id));


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
        

      }catch(e){

        console.log(e.message);

      }


    }

    function deleteLikeUser(id){
        
        const likeRefference = doc(db, "chat", id);
        return updateDoc(likeRefference, {
          likes: arrayRemove({user: user.uid, state: true})
        });

    }

    function updateStateLikes(id){

      
      const likeRefference = doc(db, "chat", id);
      setLikes(!like);
      return updateDoc(likeRefference, {likes: arrayUnion({user: user.uid, state: true})});


    }

    async function updateThreadFeedback(id, element, obj){
        
      // Take the element = current post and return the array with the users that were likeing my post
      const likes = element.likes?.map((item) => {
       
        return item.user;

      })

      
      // console.log(id);
      // console.log(obj);
      
      // Check the selected like array for my current user uid
      const check = () => {
        return likes.includes(user.uid);

      }
      
      console.log(check());
      // If array from likes have user.uid in it (check true) 
        // Add user.id that is equal to the current one  
      // Else array from like doen't have actual user.uid in it
        // Delete user.id that is equal to the current one  
      try{

        if(!check()){

          updateStateLikes(id);
          console.log('Like added!')
          getMessages();
          
        }else if(check()){
         
          deleteLikeUser(id);
          getMessages();
          console.log('Like removed!')

        }

        }catch(e){

          console.log(e.message);
        
        
        }

      }

      // First level comments
      function replyComments(id){

        const replyRefference = doc(db, "comments", id);
        return updateDoc(replyRefference, {replies: arrayUnion(replies)});
  
      }

      function deleteReplyComments(postID, id){
        console.log(id) // Code for deleting a specific field from the replies array (first level comments)
        console.log(postID); // comments/code for each top level comment
        const replyRefference = doc(db, "comments", postID);
        return updateDoc(replyRefference, {replies: arrayRemove(id)});

      }

      function pushCommReplies(){

        if(replies.reply !== ''){
  
          return setDoc(doc(db, "replies", replies.id), replies);
  
        }
  
      }
  
      async function getCommReplies(){
  
       
        const replies = await getDocs(query(collection(db, 'replies'), orderBy("date", 'asc')));
        const filtred = replies.docs.map((doc) => {
   
           return doc.data();
   
       });  
       setCommentReplies(filtred);
       
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
        getCommReplies();
        
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
    <UserContext.Provider value={{ createUser, user, signout, login, resetPassword, completePasswordReset, settingUsername, changeEmail, changePassword, deleteAccount, setMessage, pushMessages, userMessage, getMessages, uploadImages, images, pushComments, setComments, userComments, getComments, deletePosts, deleteComments, editComments, updateStateLikes, deleteLikeUser, updateThreadFeedback, like, replyComments, setReplies, writeReplies, pushCommReplies, getCommReplies, commentReplies, deleteReplies, deleteReplyComments }}>
      {children}
    </UserContext.Provider>
  )
}


export { AuthProvider };