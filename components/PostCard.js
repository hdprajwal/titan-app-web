import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_POST, GET_ALL_POSTS } from '../gql/queries';
import { AiFillDelete } from 'react-icons/ai';

const PostCard = ({ data }) => {
  const [deletePostMutation] = useMutation(DELETE_POST);

  const deletePost = async (item) => {
    const { data, error } = await deletePostMutation({
      variables: {
        PID: item,
      },
      refetchQueries: [{ query: GET_ALL_POSTS }],
    });
  };
  return (
    <div className="w-3/4 px-4 my-2 py-3 bg-white rounded-md shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <img
            className="w-8 h-8 object-cover rounded-full hidden sm:block"
            src={data.user.profile_img}
            alt="avatar"
          />
          <div className="mx-2">
            <span class="font-semibold text-gray-700">
              {data.user.first_name}
            </span>
            <span class="text-xs text-gray-600 block">
              {`in ${data.space.name}`}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-md text-gray-700  hover:text-gray-600">
          {data.body}
        </p>
      </div>
      {data.post_tags.length >= 1 ? (
        <div className="pb-2">
          {data.post_tags.map(({ tag }) => {
            return (
              <span className="mr-2 px-1 py-1 text-gray-900 text-xs font-semibold rounded bg-gray-200">
                # {tag.name}
              </span>
            );
          })}
        </div>
      ) : null}
      <div className="flex justify-between items-center mb-1 mt-2">
        <div className="flex">
          <button
            onClick={() => {
              deletePost(data.id);
            }}
            className="flex items-center px-2 py-1 rounded font-light bg-red-600 text-white hover:bg-red-700 hover:text-gray-100"
          >
            <AiFillDelete size="1.25em" />
            <span className="ml-1">Delete</span>
          </button>{' '}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
