import React from 'react';
import { getPagesArray } from '../../../utils/pages';

const Pagination = ({ totalPages, page, changePage }) => {
  //сколько всего страниц, номер текущей страницы, функция изменения страницы
  let pagesArray = getPagesArray(totalPages); //кнопки для переключения страниц
  return (
    <div className='page__wrapper'>
      {pagesArray.map((p) => (
        <span
          onClick={() => changePage(p)}
          key={p}
          className={page === p ? 'page page__current' : 'page'}>
          {p}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
