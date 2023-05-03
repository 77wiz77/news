import React, { useState } from 'react';

//первый способ пагинации
// export const useFetching = (callback) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetching = async () => {
//     try {
//       setIsLoading(true);
//       await callback();
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return [fetching, isLoading, error];
// };

//второй способ пагинации
export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = async (...args) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
