import { useEffect, useRef } from 'react';

export const useObserver = (ref, canLoad, isLoading, callback) => {
  //ref - элемент за которым необходимо наблюдать,
  //canLoad - булево значение, которое ограничивает вызов функции
  //isLoading - индикатор загрузки постов (загружаются они в данный момент или нет)
  //callback - функция которая будет выполняться, когда элемент в зоне видимости

  const observer = useRef();
  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    let cb = function (entries, observer) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };

    observer.current = new IntersectionObserver(cb);
    observer.current.observe(ref.current);
  }, [isLoading]);
};
