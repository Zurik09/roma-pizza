import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Skeleton from '../components/PizzaBlock/Skeleton';

import Categories from '../components/Categories';
import SortBlock from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Pagination } from '../components/Pagination';
import { RootState, useAppDispatch } from '../redux/store';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { categoryId, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filter
  );
  const sortType = useSelector(
    (state: RootState) => state.filter.sort.sortProperty
  );

  const { items, status } = useSelector((state: RootState) => state.pizza);

  const onChangeCategory = useCallback(
    (id: number) => {
      dispatch(setCategoryId(id));
    },
    [dispatch]
  );

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = () => {
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((item: any) => (
    <PizzaBlock key={item.id} {...item} />
  ));
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />

        <SortBlock //@ts-ignore
          value={sortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      <div />
    </div>
  );
};

export default Home;
