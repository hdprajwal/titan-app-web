import gql from 'graphql-tag';

export const GetAllUsers = gql`
  query GetAllUsers {
    users {
      bio
      blocked
      active
      work_exp
      id
      first_name
    }
  }
`;

export const GetAllTags = gql`
  query getAllTag {
    tags(where: { name: { _neq: "General" } }) {
      id
      name
    }
  }
`;

export const GetAllSpaces = gql`
  query getSpaceList {
    spaces(where: { name: { _neq: "General" } }) {
      id
      name
    }
  }
`;

export const ADD_NEW_POST = gql`
  mutation insertOnePost(
    $body: String!
    $has_link: Boolean!
    $has_media: Boolean!
    $is_media_only: Boolean!
    $SID: uuid!
    $UID: String!
    $TAGS: post_tags_arr_rel_insert_input
  ) {
    insert_posts_one(
      object: {
        body: $body
        has_link: $has_link
        has_media: $has_media
        is_media_only: $is_media_only
        space_id: $SID
        user_id: $UID
        post_tags: $TAGS
      }
    ) {
      id
      body
      created_at
      has_link
      has_media
      is_media_only
      liked
      bookmarked
      num_bookmarks
      num_comments
      num_likes
      reported
      space_id
      user_id
      user {
        id
        first_name
        profile_img
      }
      space {
        id
        name
      }
      post_tags {
        tag {
          id
          name
        }
      }
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts(order_by: { created_at: desc }) {
      id
      body
      created_at
      has_link
      has_media
      is_media_only
      liked
      bookmarked
      num_bookmarks
      num_comments
      num_likes
      reported
      space_id
      user_id
      user {
        first_name
        profile_img
      }
      space {
        id
        name
      }
      post_tags {
        tag {
          id
          name
        }
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($PID: uuid!) {
    delete_posts(where: { id: { _eq: $PID } }) {
      affected_rows
    }
  }
`;
