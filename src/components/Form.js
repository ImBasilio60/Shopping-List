import React, { useEffect, useState } from "react";
function Form({ dispatch, currentProduct, btnRef }) {
  const [lib, setLib] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [categories, setCategories] = useState("");

  useEffect(() => {
    if (currentProduct !== null) {
      const [product] = currentProduct;
      setLib(product.lib);
      setQuantity(product.quantity);
      setCategories(product.categories);

      btnRef.current.classList.remove("add-btn");
      btnRef.current.classList.add("btn-warning");
      btnRef.current.textContent = "Modifier";
    }
  }, [currentProduct]);

  const generateId = () =>
    Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

  const capitalizeWord = (word) =>
    word[0].toUpperCase() + word.slice(1).toLowerCase();

  function handleSubmit(event) {
    event.preventDefault();

    if (!lib.trim() || quantity <= 0 || !categories) {
      alert("Veuillez remplir tous les champs correctement");
      return;
    }

    if (currentProduct === null) {
      const newProduct = {
        id: generateId(),
        lib: capitalizeWord(lib.trim()),
        quantity,
        categories,
        isBuy: false,
      };
      dispatch({ type: "ADD_PRODUCT", payload: newProduct });
    } else {
      const [product] = currentProduct;
      const updatedProduct = {
        ...product,
        lib,
        quantity,
        categories,
      };
      dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });
      btnRef.current.classList.add("add-btn");
      btnRef.current.classList.remove("btn-warning");
      btnRef.current.textContent = "Ajouter";
    }

    setLib("");
    setQuantity(0);
    setCategories("");
  }
  return (
    <form className="my-3 container px-5 mb-5" onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-sm-12 col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Nom du produit"
            value={lib}
            onChange={(e) => setLib(e.target.value)}
            required
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <select
            className="form-select custom-select"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          >
            <option value="0">Quantités</option>
            {Array.from(Array(20)).map((_, i) => (
              <option key={`opt-${i}`} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-12 col-md-6">
          <select
            className="form-select custom-select"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            required
          >
            <option value="">Categories</option>
            <option value="Boissons">Boissons</option>
            <option value="Viandes">Viandes</option>
            <option value="Fruits">Fruits</option>
          </select>
        </div>
        <div className="col-sm-12 col-md-6">
          <button type={"submit"} className="w-100 btn add-btn" ref={btnRef}>
            Ajouter
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
