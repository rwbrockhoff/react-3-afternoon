import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`https://practiceapi.devmountain.com/api/posts`).then( (res) => {
      this.setState({
        posts: res.data
      })
    })
  }
  componentDidUpdate() {
    axios.get(`https://practiceapi.devmountain.com/api/posts`).then( (res) => {
      this.setState({
        posts: res.data
      })
    })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text}).then( (res) => {
      console.log('res', res)
      this.setState({
        posts: res.data
      })
    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then( (res) => {
      this.setState=({
        posts: res.data
      })
    })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts?text=${text}`, {text}).then( (res) => {
      this.setState=({
        posts: res.data
      }, () => {
        axios.get(`https://practiceapi.devmountain.com/api/posts`).then( (res) => {
          this.setState({
            posts: res.data
          },this.componentWillUpdate())
        })
      })
    })
  }

  render() {
  

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose  createPostFn={this.createPost}/>
          {this.state.posts.map( (e, i) => {
            return <Post id={e.id} key={e.id} text={e.text} date={e.date} 
            updatePostFn={this.updatePost}
            deletePostFn={this.deletePost}
           />
          })}
          
        </section>
      </div>
    );
  }
}

export default App;
