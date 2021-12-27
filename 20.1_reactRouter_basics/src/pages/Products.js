import { Link } from "react-router-dom";

const Products = () => {
  return (
    <section>
      <h1>The Products Page</h1>
      <ul>
        <li>
          <Link to="/products/p1">Big lamp</Link>
        </li>
        <li>
          <Link to="/products/p2">Lamburgini Diablo</Link>
        </li>
        <li>
          <Link to="/products/p3">Round Round gum</Link>
        </li>
      </ul>
    </section>
  );
};

export default Products;
