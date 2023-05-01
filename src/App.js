import './styles/App.css';
import { useState, useRef, useMemo, useEffect } from 'react';
import Counter from './components/Counter';
import ClassCounter from './components/ClassCounter';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/modal/MyModal';
import { usePosts } from './hooks/usePosts';
import axios from 'axios';
import PostService from './API/PostService';
import MyLoader from './components/UI/loader/MyLoader';

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' }); //вид сортировки и поисковый запрос
  const [modal, setModal] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  // const [selectedSort, setSelectedSort] = useState(''); //выбор алгоритма сортировки
  // const [searchQuery, setSearchQuery] = useState('');
  // const bodyInputRef = useRef(); //для прямого доступа к DOM элементу

  async function fetchPosts() {
    setIsPostsLoading(true);
    setTimeout(async () => {
      const posts = await PostService.getAll();
      console.log(posts);
      setPosts(posts);
      setIsPostsLoading(false);
    }, 1000);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

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
      <button onClick={fetchPosts}>Get posts</button>
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {isPostsLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}>
          <MyLoader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title='Посты про JS'
        />
      )}
    </div>
  );
}

export default App;
