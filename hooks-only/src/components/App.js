import React, {useEffect, useCallback} from 'react';
import { Store } from './../Store';

import UserHeader from './UserHeader';

import axios from 'axios';

function App() {
  console.log("app");
  const { state, dispatch } = React.useContext(Store);
  

  useEffect(()=>{
    const fetchPosts = async () =>{
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      dispatch({
        type: 'FETCH_DATA',
        payload: response.data
      })
    }
    fetchPosts();
  },[dispatch]);

  const renderPostsList = () =>{
    return state.posts.map(post =>{
      return (
        <div className="item" key={post.id}>
          <i className="large middle aligned icon user"></i>
          <div className="content">
            <div className="description">
                <h2>{post.title}</h2> 
                <p>{post.body}</p> 
            </div>  
            <UserHeader userId={post.userId}/>
          </div>
        </div>
      )
    });
  }

  return (
    <div className="ui container App">
      <header className="App-header">
        <div className="ui relaxed divided list">
        {renderPostsList()}
        </div>
      </header>
    </div>
  );
}

export default React.memo(App);
