import React from "react";
import { FaPlus } from "react-icons/fa";
function AddItem({ newItem, setNewItem, handleAddItem }) {
  return (
    <form className="addForm" onSubmit={handleAddItem}>
      <label htmlFor="addItem">Add Item</label>
      <input
        autoFocus
        id="addItem"
        type="text"
        placeholder="Add To-do-list"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        required
      />
      <button type="submit" aria-label="Add item" onClick={handleAddItem}>
        <FaPlus />
      </button>
    </form>
  );
}

export default AddItem;
