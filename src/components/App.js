import Header from "./Header";
import Form from "./Form";
import Lists from "./Lists";
import Tabs from "./Tabs";
import Table from "./Table";

import { useEffect, useReducer, useRef } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case "TOGGLE_BUY":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload
            ? { ...product, isBuy: !product.isBuy }
            : product,
        ),
      };
    case "TOGGLE_TABS":
      return {
        ...state,
        isBuyTabs: action.payload,
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload,
        ),
      };
    case "SET_CURRENT_PRODUCT":
      return {
        ...state,
        currentProduct: state.products.filter(
          (product) => product.id === action.payload,
        ),
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product,
        ),
        currentProduct: null,
      };
    default:
      break;
  }
}

const getLocalStorage = () => {
  const products = localStorage.getItem("shopping");
  return products
    ? JSON.parse(products)
    : {
        products: [],
        isBuyTabs: false,
        currentProduct: null,
      };
};
const initialState = getLocalStorage();
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products, isBuyTabs, currentProduct } = state;
  const btnRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("shopping", JSON.stringify(state));
  }, [state]);

  return (
    <>
      <Header />
      <Form
        dispatch={dispatch}
        currentProduct={currentProduct}
        btnRef={btnRef}
      />
      {products.length > 0
        ? currentProduct === null && (
            <Lists>
              <Tabs isBuyTabs={isBuyTabs} dispatch={dispatch} />
              <Table
                products={products}
                dispatch={dispatch}
                isBuyTabs={isBuyTabs}
              />
            </Lists>
          )
        : null}
    </>
  );
}

export default App;
