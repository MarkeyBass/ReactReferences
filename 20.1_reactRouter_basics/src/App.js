import { Fragment } from "react";

// Rout will show the path if you add to the path it will show all preveous path particials
// Switch component will make youre Rout components lead to a specific path particial
import { Route, Switch, Redirect } from "react-router-dom";
import Products from "./pages/Products";
import Welcome from "./pages/Welcome";
import MainHeader from "./components/MainHeader";
import ProductDetail from "./pages/ProductDetail";

// Route (reat router component) allowes us to define a certain path
// and define a react component that should be loaded when this path becomes active in the URL.

function App() {
  return (
    <Fragment>
      <MainHeader />
      <main>
        <Switch>
          {/* Redirect to '/welcome' */}
          <Route path="/" exact>
            <Redirect to="/welcome" />
          </Route>
          <Route path="/welcome">
            {/* The components we use with the router are called pages or screens and are stored with a folder with that names */}
            <Welcome />
          </Route>
          {/* exact prop will make sure the rout goes to the exect rout and not to the partly first match */}
          <Route path="/products" exact>
            <Products />
          </Route>
          {/* Dinamic Path Segment */}
          <Route path="/products/:productId">
            <ProductDetail />
          </Route>
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;

// domain-name.com/ => Component A
// domain-name.com/products => Component B
// domain-name.com/products/:<anything> => Component C
