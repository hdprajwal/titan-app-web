import React from 'react';
import { withApollo } from '../libs/apollo';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GetAllUsers,
  GetAllTags,
  GetAllSpaces,
  ADD_NEW_POST,
  GET_ALL_POSTS,
} from '../gql/queries';
import { Form, Input, Button, Select } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const AddPost = () => {
  const [form] = Form.useForm();

  const {
    loading: userLoading,
    error: userError,
    data: { users } = {},
  } = useQuery(GetAllUsers);
  const {
    loading: tagsLoading,
    error: tagsError,
    data: { tags } = {},
  } = useQuery(GetAllTags);
  const {
    loading: spacesLoading,
    error: spacesError,
    data: { spaces } = {},
  } = useQuery(GetAllSpaces);

  const [addpost] = useMutation(ADD_NEW_POST);

  if (userLoading || tagsLoading || spacesLoading) {
    return <div>loading!!</div>;
  }
  if (userError || tagsError || tagsError) {
    return <div>error!!</div>;
  }

  const onFinish = async (values) => {
    let tagsList;
    values.tags !== [] && values.tags !== undefined
      ? (tagsList = values.tags.map((each) => {
          return { tag_id: each };
        }))
      : (tagsList = []);
    values.tags = tagsList;
    let PostVariables =
      values.tags !== [] && values.tags !== undefined
        ? {
            TAGS: { data: values.tags },
            SID: values.space,
            UID: values.user,
            body: values.body.trim(),
            has_link: false,
            has_media: false,
            is_media_only: false,
          }
        : {
            SID: values.space,
            UID: values.user,
            body: values.body.trim(),
            has_link: false,
            has_media: false,
            is_media_only: false,
          };
    const { data, error } = await addpost({
      variables: PostVariables,
      refetchQueries: [{ query: GET_ALL_POSTS }],
    });
    if (data.insert_posts_one.user.id === values.user) {
      onReset();
    }
    console.log(data);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="w-1/4 shadow flex justify-center">
      <Form layout="vertical" form={form} name="new-post" onFinish={onFinish}>
        <label
          htmlFor="user"
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        >
          User
        </label>
        <Form.Item
          name="user"
          rules={[
            {
              required: true,
              message: 'Please select a User from the List',
            },
          ]}
        >
          <Select
            style={{ width: 400 }}
            placeholder="Select a User"
            optionFilterProp="children"
          >
            {users.map((each) => {
              return (
                <Option value={each.id} key={each.id}>
                  {each.first_name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <label
          htmlFor="Spaces"
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        >
          Spaces
        </label>
        <Form.Item
          name="space"
          rules={[
            {
              required: true,
              message: 'Please select a Space from the List',
            },
          ]}
        >
          <Select
            style={{ width: 400 }}
            placeholder="Select a Space"
            optionFilterProp="children"
          >
            {spaces.map((each) => {
              return (
                <Option value={each.id} key={each.id}>
                  {each.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <label
          htmlFor="spaces"
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        >
          Tags
        </label>
        <Form.Item name="tags">
          <Select
            mode="multiple"
            style={{ width: 400 }}
            placeholder="Select Tags"
            optionFilterProp="children"
          >
            {tags.map((each) => {
              return (
                <Option value={each.id} key={each.id}>
                  {each.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <label
          htmlFor="bosy"
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        >
          Post Body
        </label>
        <Form.Item
          name="body"
          rules={[
            {
              required: true,
              message: 'The post body can not be empty',
            },
          ]}
        >
          <TextArea style={{ width: 400 }} rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withApollo({ ssr: true })(AddPost);
