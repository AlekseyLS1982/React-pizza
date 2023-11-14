type CategoriesProps = {
  categoriesId: number;
  setCategoriesId: (i: number) => void;
}

const Categories: React.FC<CategoriesProps> = ({ categoriesId, setCategoriesId }) =>{
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div className="categories">
      <ul>
        {categories.map((value, idx) => {
          return (
            <li
              key={idx}
              onClick={() => setCategoriesId(idx)}
              className={categoriesId === idx ? "active" : ""}
            >
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
