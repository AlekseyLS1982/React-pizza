import Categories from "../components/Categories";
import Sort from "../components/Sort";
import { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import { useEffect,  useRef } from "react";
import Skeleton from "../components/PizzaBlock/Sceleton";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import qs from "qs";
import { Link, useNavigate } from "react-router-dom";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";

const Home: React.FC = () => {
  //@ts-ignore
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const categoryId = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort.sortProperty);
  const searchValue = useSelector((state) => state.filter.searchValue);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const { items, status } = useSelector(selectPizzaData);

  const pizzas = items.map((obj: any) => (
    <Link key={obj.id} to={`/pizza/${obj.id}`}>
      <PizzaBlock {...obj} />
    </Link>
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
      //@ts-ignore
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
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
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
        <Sort />
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
