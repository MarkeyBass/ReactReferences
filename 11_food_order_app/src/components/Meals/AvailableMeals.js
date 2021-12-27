import MEALS_LIST from "./meals-list";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvaliableMeals = () => {
  const mealsList = MEALS_LIST.map((meal) => {
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
