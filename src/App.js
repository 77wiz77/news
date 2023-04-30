import './styles/App.css';
import { useState, useRef, useMemo } from 'react';
import Counter from './components/Counter';
import ClassCounter from './components/ClassCounter';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import PostFilter from './components/PostFilter';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'js 1', body: 'description' },
    { id: 2, title: 'js 2', body: 'description' },
    { id: 3, title: 'js 3', body: 'description' },
  ]);

  const [filter, setFilter] = useState({ sort: '', query: '' }); //вид сортировки и поисковый запрос
  // const [selectedSort, setSelectedSort] = useState(''); //выбор алгоритма сортировки
  // const [searchQuery, setSearchQuery] = useState('');

  //новый отсортированный массив постов
  const sortedPosts = useMemo(() => {
    console.log('sortedPosts');
    if (filter.sort) {
      return [...posts].sort(
        (a, b) => a[filter.sort].localeCompare(b[filter.sort])
        //сортировка в алфавитном порядке по полю, которое выбрал пользователь
      );
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(filter.query)
    );
  }, [filter.query, sortedPosts]);

  // const bodyInputRef = useRef(); //для прямого доступа к DOM элементу

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  }; //функция обратного вызова для передачи состояния из PostForm в App

  const removePost = (post) => {
    //получаем пост из дочернего компонента
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className='App'>
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title='Посты про JS'
      />
    </div>
  );
}

export default App;
