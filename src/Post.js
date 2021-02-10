import React,{useState,useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import './Post.css';
import { db } from './firebase';
import firebase from 'firebase'


function Post({username,caption,imageurl,postId,user}) {
    const [comments,setComments] = useState(['']);
    const [comment,setComment] = useState('');

    const postComment = (e) => {
        e.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text:comment,
            username:user.displayName,
            timestamp :firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
        
    }
        
    useEffect(() =>{
        let unsubscribe;
        if(postId){
            unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp','desc')
            .onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map((doc)=>doc.data()));
            });
    }
        return () =>{
            unsubscribe();
        };
    },[postId]);

    return (
        <div className ="post">
            <div className="post__header">
            <Avatar
                className ="post__avatar"
                alt = {username.toUpperCase()}
                src="ig"
            />
            <h4>{username}</h4>
            </div>
            <img className="post__img" src = {imageurl} alt = "post"/>
            <p class="post__text"><strong>{username}:</strong>{caption}</p>     

           
            <div>
                {comments.map((comment)=>(
                    <p><strong>{comment.username}</strong> {comment.text}</p>
                ))}
                </div>
                
            <div class ="post__box">
            <form>
            <input class="post__comment" type="text" placeholder="comment.." value={comment} onChange = {(e)=>setComment(e.target.value)}/>
            <button disabled ={!comment} class ="post__button" type="submit" onClick={postComment}>
                Post
            </button>
            </form>
            </div>
        </div>
    )
}

export default Post
