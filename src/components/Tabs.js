import React from "react";

function Tabs({ isBuyTabs, dispatch }) {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a
          className={`nav-link cursor-pointer ${isBuyTabs ? "" : "active"}`}
          onClick={() => dispatch({ type: "TOGGLE_TABS", payload: false })}
        >
          Restants
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link cursor-pointer ${isBuyTabs ? "active" : ""}`}
          onClick={() => dispatch({ type: "TOGGLE_TABS", payload: true })}
        >
          Achetés
        </a>
      </li>
    </ul>
  );
}

export default Tabs;
