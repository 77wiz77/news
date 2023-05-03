export const getPageCount = (totalCount, limit) => {
  //общее количество элементов и лимит элементов на одной странице
  return Math.ceil(totalCount / limit);
  //округляем в большую сторону, чтобы количество страниц покрывало количество постов
};

//сделать хук usePagination
export const getPagesArray = (totalPages) => {
  //заполнение массива одной страницы
  let result = [];
  for (let i = 0; i < totalPages; i++) {
    result.push(i + 1);
  }
  return result;
};
