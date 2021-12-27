// USING QUERY PARAMETERS

import { Fragment } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  // UseRoutMatch - helps us to not repeate rout folder names in nested routes
  // Helps us to constract the nested routes dinamically.
  const match = useRouteMatch();
  console.log({ match: match });

  const history = useHistory();
  // useLocation gives info about the current used url (reading query parameter values)
  const location = useLocation();
  // console.log({ location: location });

  // URLSearchParams ia a browser built in constructor function receives location.search and
  // returns a nice params object where we can extract query parameters by key { sort: asc }
  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get("sort") === "asc";

  // sorting the list items:
  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  const changeSortingHandler = () => {
    // history.push("/quotes?sort=" + "asc");
    // // history.push("/quotes?sort=" + (isSortingAscending ? "desc" : "asc"));
    // history.push(
    //   `${location.pathname}?sort=${isSortingAscending ? "desc" : "asc"}`
    // );
    // Programatic Navidation with history.push() - More readble approach with complex urls:
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        {/* changes the query parameter {acsending || descending} */}
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
