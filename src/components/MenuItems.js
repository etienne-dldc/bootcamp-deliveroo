import MenuItem from "./MenuItem";

const MenuItems = ({ name, items, addItem }) => {
  return (
    <div className="MenuItems">
      <h2>{name}</h2>
      <div className="MenuItems--items">
        {items.map((item) => {
          return (
            <MenuItem
              key={item.id}
              item={item}
              onClick={() => {
                addItem(item.id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MenuItems;
