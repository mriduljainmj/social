import { Button } from '@material-ui/core';
import React,{useState} from 'react'
import { storage,db } from './firebase';
import './ImageUpload.css';
import firebase from 'firebase'

function ImageUpload({username}) {
    
    const [image,setImage] = useState(null);
    const [progress,setProgress] = useState(0);
    const [caption,setCaption] = useState("");

    const handleChange = (e) =>{
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload =  () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
        uploadTask.on(              //progress bar
            "state_changed",
            (snapshot) =>{
                const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);

            },
            (error) =>{
                console.log(error);
                alert(error.message);
            },

            () =>{
                    storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption:caption,
                            imageurl:url,
                            username:username

                        });
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    });
            }
        )
    }

    return (

        <div class="hide">
        <div class ="imageupload__header">
            <div class = "cap">
        {/* input for caption */}
        <input class ="img__caption" type ="text" placeholder="Caption" onChange={(e)=>setCaption(e.target.value)} value = {caption}/>
        {/* choose file */}
        <input class ="img__file" type ="file" onChange = {handleChange} /><br/>
        {/* upload button */}
        <progress value={progress} max="100"/>
        </div>
        <Button onClick={handleUpload} >
            Upload
        </Button>
        </div>
        </div>
    )
}

export default ImageUpload


