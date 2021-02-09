import './App.css';
import React,{useState,useEffect} from 'react'; 
import Post from './Post';
import db  from './firebase';
import firebase from 'firebase'

function App() {
  const [posts,setposts] = useState([]);

  useEffect(() =>{
    db.collection('posts').onSnapshot(snapshot=>{
      setposts(snapshot.docs.map(doc =>({
        id:doc.id,
        post: doc.data()} )));
    })
  },[]);




  return (
    <div className = "App">
     <div className ="app__header">
       <img className ="app__img" src = "https://seeklogo.net/wp-content/uploads/2013/04/michael-jackson-mj-vector-logo-400x400.png" alt=" logo" />
       <h4>MSoCiAL</h4>
       
   </div>

    {
        posts.map(({id,post}) =>(
          <Post key = {id} username ={post.username} caption = {post.caption} imageurl = {post.imageurl} />
        ) )
    }

  
    </div>

  );
}

export default App;
