import React from 'react';
// import '../styles/App.css';
import { useState, useRef, useMemo, useEffect } from 'react';
import Counter from '../components/Counter';
import ClassCounter from '../components/ClassCounter';
import PostItem from '../components/PostItem';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
import PostForm from '../components/PostForm';
import MySelect from '../components/UI/select/MySelect';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/modal/MyModal';
import { usePosts } from '../hooks/usePosts';
import axios from 'axios';
import PostService from '../API/PostService';
import MyLoader from '../components/UI/loader/MyLoader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount, getPagesArray } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' }); //вид сортировки и поисковый запрос
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0); //общее количество страниц
  const [limit, setLimit] = useState(10); //постов на странице
  const [page, setPage] = useState(1); //номер текущей страницы
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  //первый способ пагинации через useEffect
  // const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
  //   const response = await PostService.getAll(limit, page); //получаем ответ
  //   setPosts(response.data);
  //   const totalCount = response.headers['x-total-count'];
  //   setTotalPages(getPageCount(totalCount, limit));
  // });

  // useEffect(() => {
  //   fetchPosts();
  // }, [page]);

  // const changePage = (page) => {
  //   //функция для изменения страницы
  //   setPage(page);
  // };

  //второй способ пагинации
  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page); //получаем ответ
      // setPosts(response.data);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers['x-total-count'];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const changePage = (page) => {
    //функция для изменения страницы
    setPage(page);
  };

  // const [selectedSort, setSelectedSort] = useState(''); //выбор алгоритма сортировки
  // const [searchQuery, setSearchQuery] = useState('');
  // const bodyInputRef = useRef(); //для прямого доступа к DOM элементу

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }; //функция обратного вызова для передачи состояния из PostForm в App

  const removePost = (post) => {
    //получаем пост из дочернего компонента
    setPosts(posts.filter((p) => p.id !== post.id));
  };
  return (
    <div className='App'>
      {/* <button onClick={fetchPosts}>Get posts</button> */}
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue='Количество элементов на странице'
        options={[
          {
            value: 5,
            name: '5',
          },
          {
            value: 10,
            name: '10',
          },
          {
            value: 25,
            name: '25',
          },
          {
            value: -1, //показать все посты
            name: 'Показать все',
          },
        ]}
      />
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title='Посты про JS'
      />
      <div ref={lastElement} style={{ height: 20, background: 'red' }}></div>
      {isPostsLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}>
          <MyLoader />
        </div>
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
};

export default Posts;
