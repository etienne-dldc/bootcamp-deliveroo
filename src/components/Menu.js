import MenuItems from "./MenuItems";

const Menu = ({ menu, addItem }) => {
  const nonEmptyMenu = menu.filter((menu) => {
    return menu.meals.length > 0;
  });

  return (
    <div className="Menu">
      {nonEmptyMenu.map((menu) => {
        return (
          <MenuItems
            key={menu.name}
            name={menu.name}
            items={menu.meals}
            addItem={addItem}
          />
        );
      })}
    </div>
  );
};

export default Menu;
