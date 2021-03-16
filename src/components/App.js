import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Content from "./Content";

const App = () => {
  const [cart, setCart] = useState([
    // {
    //   id: '1519055545-88',
    //   price: 25,
    //   title: 'Brunch authentique 1 personne',
    //   amount: 2,
    // },
    // {
    //   id: '1519055545-89',
    //   price: 25,
    //   title: 'Brunch authentique 1 personne',
    //   amount: 2,
    // },
  ]);
  const [data, setData] = useState(null);

  const addItem = (itemId) => {
    const exist = cart.find((cartItem) => cartItem.id === itemId);
    if (exist) {
      const index = cart.indexOf(exist);
      const nextCart = [...cart];
      nextCart[index] = {
        ...nextCart[index],
        amount: nextCart[index].amount + 1,
      };
      setCart(nextCart);
      return;
    } else {
      // add
      // find item in data
      let item = null;
      data.categories.forEach((category) => {
        category.meals.forEach((meal) => {
          if (meal.id === itemId) {
            item = meal;
          }
          meal.price = parseFloat(meal.price);
        });
      });
      if (item === null) {
        console.error(`Cannot find item ${itemId}`);
        return;
      }
      const nextCart = [...cart];
      nextCart.push({
        id: itemId,
        title: item.title,
        price: item.price,
        amount: 1,
      });
      setCart(nextCart);
      return;
    }
  };

  const removeItem = (itemId) => {
    const exist = cart.find((cartItem) => cartItem.id === itemId);
    if (!exist) {
      console.error(`Cannot remove iten not in cart !`);
      return;
    }
    const index = cart.indexOf(exist);
    const nextCart = [...cart];
    nextCart[index] = {
      ...nextCart[index],
      amount: nextCart[index].amount - 1,
    };
    const cartNotZero = nextCart.filter((cartItem) => cartItem.amount > 0);
    setCart(cartNotZero);
    return;
  };

  useEffect(() => {
    axios
      .get("https://lereacteur-deliveroo-api.herokuapp.com/")
      .then((response) => {
        response.data.categories.forEach((category) => {
          category.meals.forEach((meal) => {
            meal.price = parseFloat(meal.price);
          });
        });

        setData(response.data);
      });
  }, []);

  return (
    <div>
      <Header restaurant={data ? data.restaurant : null} />
      <Content
        menu={data ? data.categories : null}
        cart={cart}
        addItem={addItem}
        removeItem={removeItem}
      />
    </div>
  );
};

export default App;
