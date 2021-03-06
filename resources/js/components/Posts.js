import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';


class Posts extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  componentWillReceiveProps(nextProps) {  console.log('loading', this.props.loading);
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
    
  }

  render() {
    const postItems = this.props.posts.map((post,i) => (
      <div key={i}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
    return (
      <div>
        <h1>Posts</h1>
        {postItems}
      </div>
    );
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object,
  loading: PropTypes.bool
};


const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item,
  loading: state.posts.loading
});

export default connect(mapStateToProps, { fetchPosts })(Posts);
