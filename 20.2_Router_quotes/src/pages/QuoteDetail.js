import React, { useEffect } from "react";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { Route, useParams, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
// Handles http status
import useHttp from "../hooks/use-http";
// The fuction that sends the actual request
import { getSingleQuote } from "../lib/api";

function QuoteDetail() {
  // UseRoutMatch - helps us to not repeate rout folder names in nested routes (constract the nested routes dinamically)
  const match = useRouteMatch();
  const params = useParams();

  const { quoteId } = params;
  // console.log(match);

  // console.log({ quoteId: params.quoteId });

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) {
    return (
      <div className="centered">
        <p>No quote found!</p>
      </div>
    );
  }

  return (
    <div>
      <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text} />
      {/* This nested route is rendering conditionally the button based on the url without managing state */}
      {/* <Route path={`/quotes/${params.quoteId}`} exact> */}
      <Route path={match.path} exact>
        <div className="centered">
          {/* <Link className="btn--flat" to={`/quotes/${params.quoteId}/comments`}> */}
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Show Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <div className="centered">
          <Link className="btn--flat" to={match.url}>
            Hide Comments
          </Link>
        </div>
        <Comments />
      </Route>
    </div>
  );
}

export default QuoteDetail;
