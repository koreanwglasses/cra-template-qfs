import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./app";
import { ExampleProvider } from "../components/example";

/**
 * We can have multiple "pages" in a single-page app by using
 * React Router. Read more here:
 * https://reactrouter.com/docs/en/v6/getting-started/overview
 */
const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<ExampleProvider />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
