import Categories from "../components/Categories";
import Sort from "../components/Sort";
import SortPopup, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import { useEffect,  useRef } from "react";
import Skeleton from "../components/PizzaBlock/Sceleton";
import Pagination from "../components/Pagination";
import {useSelector } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import qs from "qs";
import { Link, useNavigate } from "react-router-dom";
import { SearchPizzaParams, fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const categoryId = useSelector((state: any) => state.filter.categoryId);
  const dispatch = useAppDispatch();
  const sort = useSelector((state: any) => state.filter.sort.sortProperty);
  const searchValue = useSelector((state: any) => state.filter.searchValue);
  const currentPage = useSelector((state: any) => state.filter.currentPage);
  const { items, status } = useSelector(selectPizzaData);

  const pizzas = items.map((obj: any) => (
    <PizzaBlock {...obj} />
  ));
  const skeletons = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />);

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const order = sort.includes("-") ? "abc" : "desc";
    const sortBy = sort.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        order: order,
        sortBy: sortBy,
        category: category,
        search: search,
        currentPage: currentPage,
      })
    );
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, searchValue, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = list.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || list[0],
        })
      );
      isSearch.current = true;
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);

    getPizzas();
  }, [categoryId, sort, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories
          categoriesId={categoryId}
          setCategoriesId={onClickCategory}
        />
        <SortPopup />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div>Вероятней всего, вы не заказывали ещё пиццу</div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onPageChange={onChangePage} />
    </>
  );
};

export default Home;
