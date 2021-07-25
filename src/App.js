import { useEffect, useState } from 'react';
import './App.css';
import Post from './Components/Post';
import {db} from "./firebase";

function App() {

  const [posts, setPosts] = useState([]);

    useEffect(() => {
      db.collection("posts").onSnapshot(snapshot => {
        //eveyr time a post article is modified or added, this code runs ("snapshot")
        setPosts(snapshot.docs.map(doc => ({id: doc.id, post: doc.data()})));
      })
    }, [posts])
    //by putting posts in array on 26, useEffect will run everytim the array changes

  return (
    <div className="app">
      <div className="app__header">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" alt="" className="app__headerImage"/>
      </div>
      {posts.map(({id, post}) => {
        return (
          <Post
            key={id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        )
      })}
    </div>
  );
}

export default App;
