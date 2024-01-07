import { useState } from "react";
import Form from "./Form";
import { nanoid } from "nanoid";
import Items from "./Items";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const setLocalStorage = (newItems) => {
  localStorage.setItem("list", JSON.stringify(newItems));
};
const getLocalStorage = () => {
  let items = JSON.parse(localStorage.getItem("list")) || [];
  return items;
};
const App = () => {
  let [items, setItems] = useState(getLocalStorage());
  const addItem = (itemName) => {
    const newItem = {
      completed: false,
      name: itemName,
      id: nanoid(),
    };
    let newItems = [...items, newItem];
    setItems(newItems);
    setLocalStorage(newItems);
    toast.success("item added to list");
  };
  const removeItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    setLocalStorage(newItems);
    toast.success("item removed from list");
  };

  const editItem = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        const newItem = { ...item, completed: !item.completed };
        return newItem;
      }
      return item;
    });
    setItems(newItems);
    setLocalStorage(newItems);
  };
  return (
    <section className='section-center'>
      <ToastContainer position='top-center' />
      <Form addItem={addItem} />
      <Items items={items} removeItem={removeItem} editItem={editItem} />
    </section>
  );
};

export default App;
