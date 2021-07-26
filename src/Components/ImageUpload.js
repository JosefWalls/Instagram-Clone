import React, { useState } from 'react';
import "./ImageUpload.css";
import {Button} from "@material-ui/core";
import {storage, db} from "./../firebase";
import firebase from 'firebase';

function ImageUploader({username}){

    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState("");

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        alert(username)
        let uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on("state_changed", (snapshot) => {
            // let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            // setProgress = progress;
        }, (error) => {
            console.log(error);
            alert(error.message);
        }, () => {
            //complete functionality
            storage.ref("images").child(image.name).getDownloadURL()
            .then((url) => {
                //post image into db
                db.collection("post").add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption: caption,
                    imageUrl: url,
                    username: username
                })
            })

            setProgress(0);
            setCaption("");
            setImage(null);
        })
    }

    return (
        <div>
            <progress value={progress} max="100"/>
            <input type="text" value={caption} placeholder="Enter a caption" onChange={event => setCaption(event.target.value)}/>
            <input type="file" onChange={handleChange} />
            <Button className="imageupload__button" onClick={handleUpload}>Upload</Button>
        </div>
    )
}


export default ImageUploader;