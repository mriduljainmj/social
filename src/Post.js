import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import './Post.css';


function Post({username,caption,imageurl}) {
    return (
        <div className ="post">
            <div className="post__header">
            <Avatar
                className ="post__avatar"
                alt = {username.toUpperCase()}
                src="statsic"
            />
            <h4>{username}</h4>
            </div>
            <img className="post__img" src = {imageurl} alt = "post"/>
            <p class="post__text"><strong>{username}:</strong>{caption}</p>
        </div>
    )
}

export default Post
