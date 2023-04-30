import React, { useState } from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: '', body: '' });

  const addNewPost = (e) => {
    e.preventDefault(); //Убрать поведение по умолчанию (перезагрузка страницы)
    // console.log(bodyInputRef.current.value); //если просто current - будет сам DOM элемент

    //setPosts([...posts, { ...post, id: Date.now() }]); //установить старые посты плюс новый
    const newPost = {
      ...post,
      id: Date.now(),
    };
    create(newPost);
    setPost({ title: '', body: '' }); //для обнуления формы после отправки
  };

  return (
    <div>
      <form>
        {/* Ниже управляемый компонент */}
        <MyInput
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })} //перезатираем нужное нам поле, остальной объект не изменяется
          type='text'
          placeholder='Название поста'
        />

        <MyInput
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
          type='text'
          placeholder='Описание поста'
        />

        {/* <input ref={bodyInputRef} type='text' /> */}
        {/* Ниже неуправляемый / Неконтролируемый компонент */}
        {/* <MyInput ref={bodyInputRef} type='text' placeholder='Описание поста' /> */}

        {/* <MyButton onClick={addNewPost} disabled> */}
        <MyButton type='submit' onClick={addNewPost}>
          Создать пост
        </MyButton>
      </form>
    </div>
  );
};

export default PostForm;
