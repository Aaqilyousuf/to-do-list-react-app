import React from "react";
import { IoTrashOutline } from "react-icons/io5";
function LineItems({ item, handleChange, handleDelete }) {
  return (
    <li className="item">
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => handleChange(item.id)}
      />
      <label
        onDoubleClick={() => handleChange(item.id)}
        style={item.checked ? { textDecoration: "line-through" } : null}
      >
        {item.item}
      </label>
      <IoTrashOutline
        role="button"
        tabIndex={0}
        onClick={() => handleDelete(item.id)}
        aria-label={"Delete" + item.item}
      />
    </li>
  );
}

export default LineItems;
