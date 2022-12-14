import React from "react";

function useLocalStorage(itemName, initialValue) {
  const [sincronizedItem, setSincronizedItem] = React.useState(true);

  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [item, setItem] = React.useState(initialValue);

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        setItem(parsedItem);
        setLoading(false);
        setSincronizedItem(true);
      } catch (error) {
        setError(error);
      }
    }, 3000);
  }, [sincronizedItem]);

  const saveItem = (newItem) => {
    try {
      const stringifyTodos = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifyTodos);
      setItem(newItem);
    } catch (error) {
      setError(error);
    }
  };

  const sincronizeItem = () => {
    setLoading(true);
    setSincronizedItem(false);
  };

  return { item, saveItem, loading, error, sincronizeItem };
}

export { useLocalStorage };

// function useLocalStorage(itemName, initialValue) {
//   const localStorageItem = localStorage.getItem(itemName);
//   let parsedItem;

//   if (!localStorageItem) {
//     localStorage.setItem(itemName, JSON.stringify(initialValue));
//     parsedItem = initialValue;
//   } else {
//     parsedItem = JSON.parse(localStorageItem);
//   }

//   const [item, setItem] = React.useState(parsedItem);

//   const saveItem = (newItem) => {
//     const stringifyTodos = JSON.stringify(newItem);
//     localStorage.setItem(itemName, stringifyTodos);
//     setItem(newItem);
//   };

//   return [item, saveItem];
// }
