import React from "react";

function Table({ products, dispatch, isBuyTabs }) {
  const filteredProducts = products.filter((product) =>
    isBuyTabs ? product.isBuy : !product.isBuy,
  );
  return (
    <table className="table">
      <tbody>
        {filteredProducts.length !== 0 ? (
          filteredProducts.map((product) => (
            <Row
              key={product.id}
              name={product.lib}
              quantity={product.quantity}
              categories={product.categories}
              isBuy={product.isBuy}
              dispatch={dispatch}
              id={product.id}
            />
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">
              {isBuyTabs
                ? "Aucun produit n’a été acheté.❌"
                : "Tous les produits ont été achetés. ✅"}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function Row({ name, quantity, categories, isBuy, dispatch, id }) {
  const toggleBuy = () => dispatch({ type: "TOGGLE_BUY", payload: id });
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch({ type: "DELETE_PRODUCT", payload: id });
    }
  };
  return (
    <tr>
      <th scope="row">
        <label>
          <input
            className="form-check-input me-1 cursor-pointer"
            type="checkbox"
            checked={isBuy}
            onChange={toggleBuy}
          />
        </label>
      </th>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{categories}</td>
      <td className="text-end">
        <i
          className="fa fa-pencil-alt cursor-pointer me-2"
          onClick={() => dispatch({ type: "SET_CURRENT_PRODUCT", payload: id })}
        ></i>
        <i
          className="fa fa-trash-alt cursor-pointer text-danger"
          onClick={handleDelete}
        ></i>
      </td>
    </tr>
  );
}
export default Table;
