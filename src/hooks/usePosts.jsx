import { useMemo } from 'react';

//хук для сортировки
export const useSortedPosts = (posts, sort) => {
  //новый отсортированный массив постов
  const sortedPosts = useMemo(() => {
    console.log('sortedPosts');
    if (sort) {
      return [...posts].sort(
        (a, b) => a[sort].localeCompare(b[sort])
        //сортировка в алфавитном порядке по полю, которое выбрал пользователь
      );
    }
    return posts;
  }, [sort, posts]);

  return sortedPosts;
};

//хук для возвращения отфильтрованного и отсортированного массива
export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort); //получаем массив отсортированных постов
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
  }, [query, sortedPosts]);

  return sortedAndSearchedPosts;
};
