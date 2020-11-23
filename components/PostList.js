import React from 'react';
import { withApollo } from '../libs/apollo';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_POSTS } from '../gql/queries';
import PostCard from './PostCard';

const PostList = () => {
  const { loading, error, data: { posts } = {} } = useQuery(GET_ALL_POSTS);

  if (loading) {
    return <div>loading!!</div>;
  }
  if (error) {
    console.log(error);
    return <div>error!!</div>;
  }
  console.log(posts);
  return (
    <div className="w-full flex flex-wrap justify-center">
      {posts.map((each) => {
        return <PostCard data={each} />;
      })}
    </div>
  );
};

export default withApollo({ ssr: true })(PostList);
