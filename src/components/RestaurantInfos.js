const RestaurantInfos = ({ name, description, cover }) => {
  return (
    <div className="RestaurantInfos">
      <div className="RestaurantInfos--center">
        <div className="RestaurantInfos--texts">
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
        <img
          className="RestaurantInfos--cover"
          src={cover}
          alt="restaurant cover"
        />
      </div>
    </div>
  );
};

export default RestaurantInfos;
