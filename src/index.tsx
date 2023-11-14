import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { FullPizza } from "./pages/FullPizza";

const router = createBrowserRouter([
  {
    path: "*",
    element: <App/>,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        index: "/cart",
        element: <Cart />,
      },
      {
        index: "/pizza/:id",
        element: <FullPizza />,
      },
      {
        index: "*",
        element: <NotFound />,
      },
    ],
  },
]);
const rootElem = document.getElementById('root');

if(rootElem) {
  const root = ReactDOM.createRoot(rootElem);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();
}

