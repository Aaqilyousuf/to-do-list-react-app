import ItemList from "./ItemList";
const Content = ({ items, handleChange, handleDelete }) => {
  return (
    <>
      {items.length ? (
        <ItemList
          items={items}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{ marginTop: "10rem" }}>
          Hurray you have completed your all task you are in progress!
        </p>
      )}
    </>
  );
};
export default Content;
