import { useState, useEffect } from "react";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

function App() {
  const [items, setItems] = useState([]);

  /*id = new Date().getTime() */
  const [newItem, setNewItem] = useState("");

  const [search, setSearch] = useState("");

  const [fetchError, setFetchError] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const API_URL = "http://localhost:3500/items";

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Data not received");
        const listItems = await response.json();
        console.log(listItems);
        setItems(listItems);
      } catch (e) {
        setFetchError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item };
    const listItems = [...items, addNewItem];
    setItems(listItems);
    //new thing it acctually in the handleadditem function for checking purpose now here using
    setNewItem("");
    const postOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addNewItem),
    };
    const result = await apiRequest(API_URL, postOption);
    if (result) setFetchError(result);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
    //console.log("NewItem: " + newItem);
  };

  const handleChange = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    const myItem = listItems.filter((item) => item.id === id);
    const updateOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOption);
    if (result) throw result;
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    const deleteOption = { method: "DELETE" };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOption);
    if (result) throw result;
  };

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <Header title="To Do List" />
      <AddItem
        newitem={newItem}
        setNewItem={setNewItem}
        handleAddItem={handleAddItem}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
        //handleSearch={handleSearch}
      />
      <main>
        {isLoading && <p>Loading...</p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        {!isLoading && !fetchError && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
