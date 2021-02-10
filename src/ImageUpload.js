import { Button } from '@material-ui/core';
import React,{useState} from 'react'
import './ImageUpload.css';

function ImageUpload() {
    
    const [image,setImage] = useState(null);
    const [progress,setProgress] = useState(0);
    const [caption,setCaption] = useState("");

    const handleChange = (e) =>{
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload =  () => {


    }

    return (

        <div class ="imageupload__header">
            <div class = "cap">
        {/* input for caption */}
        <input class ="img__caption" type ="text" placeholder="Caption" onChange={(e)=>setCaption(e.target.value)} value = {caption}/>
        {/* choose file */}
        <input class="img__file" type ="file" onChange = {handleChange} /><br/>
        {/* upload button */}
        </div>
        <button onClick="handleUpload">
            Upload
        </button>

            
        </div>
    )
}

export default ImageUpload


