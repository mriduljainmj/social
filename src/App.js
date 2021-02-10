import './App.css';
import React,{useState,useEffect} from 'react'; 
import Post from './Post';
import {db,auth,storage} from './firebase';
import firebase from 'firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';

function getModalStyle() {
  const top = 50  
  const left = 50 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '3px dashed lightgray',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5, 4, 4),
  },
}));


function App() {
  const classes = useStyles();
  const [ModalStyle] = useState(getModalStyle);
  const [posts,setposts] = useState([]);
  const [open,setOpen] = useState(false)
  const [username,setUsername] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [user,setUser] = useState(null);
  const [signin,Setsignin] = useState(false);

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=> {
      if(authUser){
        console.log(authUser);
        setUser(authUser);
        
        if(authUser.displayName){

        }
        else{
          return authUser.updateProfile({
            displayName :username
          })
        }
      }
      else{
          setUser(null)
      }
    })
    return () =>{
      unsubscribe();
    }

  },[user,username]);

  useEffect(() =>{
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      setposts(snapshot.docs.map(doc =>({
        id:doc.id,
        post: doc.data()} )));
    })
  },[]);

  const eremain = (event) =>{
      setEmail(event.target.value);
  }
  const uremain = (event) =>{
    setUsername(event.target.value);
}
const premain = (event) =>{
  setPassword(event.target.value);
}

const register = (e) =>{
  e.preventDefault();

  auth.createUserWithEmailAndPassword(email,password)
  .catch((error)=> alert(error.message))  
  
}

const login = (e)=>{
  e.preventDefault();
  auth.signInWithEmailAndPassword(email,password)
  .catch((e)=> alert(e.message))
}


  return (
    <div className = "App">
      <Modal
        open={open}
        onClose={()=> setOpen(false)}
    
      >
        <div style ={ModalStyle} className={classes.paper}>
          <form className = "app__register">
          <center>
        <img className ="app__img" src = "https://seeklogo.net/wp-content/uploads/2013/04/michael-jackson-mj-vector-logo-400x400.png" alt=" logo" />
       </center>
       <Input placeholder="Username"
              type="text"
              value ={username}
              onChange={uremain}/> 

        <Input placeholder="Email"
              type="email"
              value ={email}
              onChange={eremain}/>      

        <Input placeholder="Password"
              type="password"
              value ={password}
              onChange={premain}/> 
              <br/>
              
          <Button type="submit" onClick ={register}>Register</Button>
         
          </form>
        </div>
      </Modal>

      <Modal
        open={signin}
        onClose={()=> Setsignin(false)}
    
      >
        <div style ={ModalStyle} className={classes.paper}>
          <form className = "app__register">
          <center>
        <img className ="app__img" src = "https://seeklogo.net/wp-content/uploads/2013/04/michael-jackson-mj-vector-logo-400x400.png" alt=" logo" />
       </center>

    
       <Input placeholder="Email"
              type="email"
              value ={email}
              onChange={eremain}/>     
    

        <Input placeholder="Password"
              type="password"
              value ={password}
              onChange={premain}/> 
              <br/>
              
          <Button type="submit" onClick ={login}>Login</Button>
         
          </form>
        </div>
      </Modal>

     <div className ="app__header">
        <span className="app__logo">
       <img className ="app__img" src = "https://seeklogo.net/wp-content/uploads/2013/04/michael-jackson-mj-vector-logo-400x400.png" alt=" logo" />
       <h4>MSoCiAL</h4>
       </span>
      <div className ="app__sign">
        
      {user ?
        (
        <Button onClick={()=>auth.signOut()}>Logout</Button>
        )
        :
        (
        <div>
          <Button onClick={()=>setOpen(true)}>Register </Button>
          <Button onClick={()=>Setsignin(true)}>Log{" "}In </Button>
          </div>
        )
        
      }
      </div>
   </div>

      {user?.displayName ? (
    
      <ImageUpload username ={user.displayName}/>
      ):(
          <h3 class ="app__before">Login to Upload.</h3>
      )
}

    {
        posts.map(({id,post}) =>(
          <Post key = {id} username ={post.username} caption = {post.caption} imageurl = {post.imageurl} />
        ) )
    }

  
    </div>

  );
}

export default App;
