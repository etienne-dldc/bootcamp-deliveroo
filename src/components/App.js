import React from "react";
import axios from "axios";
import Header from "./Header";
import Content from "./Content";

const App = () => {
  const [cart, setCart] = React.useState([
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
  const [data, setData] = React.useState(null);

  const addItem = itemId => {
    const exist = cart.find(cartItem => cartItem.id === itemId);
    if (exist) {
      const index = cart.indexOf(exist);
      const nextCart = [...cart];
      nextCart[index] = {
        ...nextCart[index],
        amount: nextCart[index].amount + 1
      };
      setCart(nextCart);
      return;
    } else {
      // add
      // find item in data
      let item = null;
      Object.keys(data.menu).forEach(menuKey => {
        data.menu[menuKey].forEach(menuItem => {
          if (menuItem.id === itemId) {
            item = menuItem;
          }
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
        amount: 1
      });
      setCart(nextCart);
      return;
    }
  };

  const removeItem = itemId => {
    const exist = cart.find(cartItem => cartItem.id === itemId);
    if (!exist) {
      console.error(`Cannot remove iten not in cart !`);
      return;
    }
    const index = cart.indexOf(exist);
    const nextCart = [...cart];
    nextCart[index] = {
      ...nextCart[index],
      amount: nextCart[index].amount - 1
    };
    const cartNotZero = nextCart.filter(cartItem => cartItem.amount > 0);
    setCart(cartNotZero);
    return;
  };

  React.useEffect(() => {
    axios.get("https://deliveroo-api.now.sh/menu").then(response => {
      Object.keys(response.data.menu).forEach(menuKey => {
        response.data.menu[menuKey].forEach(menuItem => {
          menuItem.price = parseFloat(menuItem.price);
        });
      });

      setData(response.data);
    });
  }, []);

  return (
    <div>
      <Header restaurant={data ? data.restaurant : null} />
      <Content
        menu={data ? data.menu : null}
        cart={cart}
        addItem={addItem}
        removeItem={removeItem}
      />
    </div>
  );
};

export default App;
