import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import MyLoader from '../components/UI/loader/MyLoader';

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });

  const [fetchСomments, isCommentsLoading, commentsError] = useFetching(
    async (id) => {
      const response = await PostService.getCommentsById(id);
      setComments(response.data);
    }
  );

  useEffect(() => {
    fetchPostById(params.id);
    fetchСomments(params.id);
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
      <h1>Комментарии</h1>
      {isCommentsLoading ? (
        <MyLoader />
      ) : (
        <div>
          {comments.map((com) => (
            <div key={com.id} style={{ marginTop: 15 }}>
              <h5>{com.email}</h5>
              <p>{com.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
