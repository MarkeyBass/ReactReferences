// import { useEffect } from "react/cjs/react.production.min";
// import NoQuotesFound from "../components/quotes/NoQuotesFound";
// import QuoteList from "../components/quotes/QuoteList";
// import LoadingSpinner from "../components/UI/LoadingSpinner";
// import useHttp from "../hooks/use-http";
// import { getAllQuotes } from "../lib/api";

// // const loadedQuotes = [
// //   { id: 1, author: "Bob Marley", text: "Take it easy" },
// //   { id: 2, author: "Dave Buback", text: "Take 5" },
// // ];

// const AllQuotes = () => {
//   const {
//     sendRequest,
//     status,
//     data: loadedQuotes,
//     error,
//   } = useHttp(getAllQuotes, true);

//   useEffect(() => {
//     sendRequest();
//   }, [sendRequest]);

//   if (status === "pending") {
//     return (
//       <div className="centered">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   if (error) return <p className="centered focused">{error}</p>;

//   if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
//     return <NoQuotesFound />;
//   }

//   return (
//     <div>
//       <h1>All Quotes</h1>
//       <QuoteList quotes={loadedQuotes} />;
//     </div>
//   );
// };

// export default AllQuotes;

import { useEffect } from "react";

import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
