// import MEALS_LIST from "./meals-list";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvaliableMeals = () => {
  // Getting meals from the database
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // To fetch data whent component is created fetchMealsHandler is an anonimus inside the useEffect
  useEffect(() => {
    const fetchMealsHandler = async () => {
      setIsLoading(true);
      setError(null);

      const res = await fetch(
        "https://movie-base-3cbc2-default-rtdb.europe-west1.firebasedatabase.app/food_order/meals_list.json"
      );

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Can't get the data - 404 status code");
        } else {
          throw new Error("Something went wrong");
        }
      }

      const data = await res.json();

      // if we were fettching an array we would use map but we are fetching an object so we use for in loop
      let mealsDataModified = [];

      for (let key in data) {
        mealsDataModified.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price * 1,
        });
      }

      console.log(mealsDataModified);

      setMeals(mealsDataModified);

      setIsLoading(false);
    };

    fetchMealsHandler().catch((err) => {
      setIsLoading(false);
      setError(err.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={styles["meals-loading"]}>
        <p>Is loading...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className={styles["meals-error"]}>
        <p>{error}</p>
      </section>
    );
  }

  // const mealsList = MEALS_LIST.map((meal) => {
  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvaliableMeals;
