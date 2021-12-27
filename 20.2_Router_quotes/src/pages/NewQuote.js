import { Fragment, useEffect } from "react";
import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from "react-router"; // with that hook we can change the brouser history
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      // PROGRAMATIC NAVIGATION:
      // Navigating from the form page after a successfull submition.
      // history.push - brings us to a new page and we can brows back to the previouse.
      // history.replace replaces the page. We can't brows back.
      history.push("/quotes");
    }
  }, [status, history]);

  const addQuoteHandler = (quoteData) => {
    // console.log(quoteData);

    sendRequest(quoteData);
    // .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <QuoteForm
        isLoading={status === "pending"}
        onAddQuote={addQuoteHandler}
      />
    </Fragment>
  );
};

export default NewQuote;
