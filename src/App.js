import { useEffect, useState } from 'react';
import './App.css';
import Post from './Components/Post';
import {db} from "./firebase";
import { Button, Modal, Input} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import { auth } from './firebase';
import { autoInject } from 'async';
import ImageUploader from './Components/ImageUpload';
import firebase from 'firebase';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        console.log(authUser);
        setUser(authUser);
      } else {
        //user has logged out
        setUser(null);
      }
    })

    return () => {
      //peform some cleanup actions
      unsubscribe();
    }
  }, [user, username])

  useEffect(() => {
    const snapshot =  firebase.firestore().collection("posts").get()
    .then(results => console.log(results))
  }, [posts])
  //by putting posts in array on 26, useEffect will run everytim the array changes
  
  const signUp = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      // console.log
      const user = firebase.auth().currentUser;
      return user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))
  }

  const signIn = (event) => {
    event.preventDefault();
    alert("ih")
    auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(user)
    })
    .catch(err => alert(err.message))
    setOpenSignIn(false);
  }
  
  return (
    <div className="app">
    <div className="app__header">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" alt="" className="app__headerImage"/>
    </div>
    {user ? <ImageUploader username={user.displayName}/>: <h3>You need to sign in in-order to upload a post.</h3>}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signUp">
            <center>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" alt="" className="app__headerImage"/>
            </center>
              <Input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
              <Input placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <Input placeholder="Password" type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
              <Button onClick={signUp} type="submit">Sign up</Button>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signUp">
            <center>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" alt="" className="app__headerImage"/>
            </center>
              <Input placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <Input placeholder="Password" type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
              <Button onClick={signIn} type="submit">Sign in</Button>
          </form>
        </div>
      </Modal>

      {user ? <Button onClick={() => auth.signOut()}>Log out</Button>: 
      <div className="app__loginContainer">
        <Button onClick={() => setOpen(true)}>Sign up</Button>
        <Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
      </div>}

      {posts.map(({id, post}) => {
        return (
          <div>
      loc    <h1>{id}</h1>
          </div>
        )})}
    </div>
  );
}

export default App;
