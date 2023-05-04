import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import MyLoader from '../components/UI/loader/MyLoader';

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  useEffect(() => {
    fetchPostById(params.id);
  }, []);

  return (
    <div>
      <h1>Вы попали на страницу поста с ID = {params.id}</h1>
      {isLoading ? (
        <MyLoader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
