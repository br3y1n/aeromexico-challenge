import { ErrorPage } from "@components/ErrorPage";
import { Loader } from "@components/Loader";

import { RenderByStatus } from "./render-by-status.wrapper.type";

const renderByStatus: RenderByStatus = (
  renderComponent,
  { loader = { is: false }, error = { is: false } },
) => {
  const { is: isLoading, render: renderLoader = () => <Loader /> } = loader;
  const { is: isError, render: renderError = () => <ErrorPage /> } = error;

  return isLoading
    ? renderLoader()
    : isError
      ? renderError()
      : renderComponent();
};

export { renderByStatus };
