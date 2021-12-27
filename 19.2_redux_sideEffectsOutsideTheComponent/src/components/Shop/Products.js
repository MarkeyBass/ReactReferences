import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {id: 'product-1', price: 6, name: 'Kyoto Pencil',description: "Best pencil in the world" },
  {id: 'product-2', price: 5, name: 'Tokyo Erasor',description: "Best erasor in the Tokyo" },
   
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(product => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
            />
          )
        })}
      </ul>
    </section>
  );
};

export default Products;
