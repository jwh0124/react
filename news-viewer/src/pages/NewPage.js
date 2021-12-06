import React from 'react';
import { useParams } from 'react-router';
import Categories from '../components/Categories';
import NewsList from '../components/NewsList';

const NewPage = () => {
  const { category } = useParams();

  console.log('newpage: ' + category);

  return (
    <>
      <Categories />
      <NewsList category={category} />
    </>
  );
};

export default NewPage;
