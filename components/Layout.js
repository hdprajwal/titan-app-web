import React from 'react';
import AddPost from './AddPost';
import PostList from './PostList';

const Layout = () => {
  return (
    <div className="flex">
      <AddPost />
      <div className="w-3/4">
        <PostList />
      </div>
    </div>
  );
};

export default Layout;
