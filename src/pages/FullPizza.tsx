import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  useEffect(() => {
    async function fetchPizzas() {
      try {
        const { data } = await axios.get(
          `https://641c23afb556e431a866720e.mockapi.io/items/` + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы");
      }
    }

    fetchPizzas();
  }, [id]);

  if (!pizza) {
    return <>"Загрузка"</>;
  }
  return (
    <div className="contaner">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse sunt et
        fuga voluptate repellat, officia inventore, facere eius, dolore eaque id
        aliquid in autem molestias nam ipsam veritatis veniam. Fugiat?
      </p>
      <h4>{pizza.price}</h4>
    </div>
  );
};
