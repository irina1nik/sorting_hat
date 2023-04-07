interface IProps {
  house: "Ravenclaw" | "Gryffindor" | "Hufflepuff" | "Slytherin" | string;
}

const HouseCard: React.FC<IProps> = ({ house }) => {
  return (
    <div className="mt-4">
      {house === "Ravenclaw" && (
        <img src="/img/ravenclaw.png" className="w-56" />
      )}
      {house === "Gryffindor" && (
        <img src="/img/gryffindor.png" className="w-56" />
      )}
      {house === "Hufflepuff" && (
        <img src="/img/hufflepuff.png" className="w-56" />
      )}
      {house === "Slytherin" && (
        <img src="/img/slytherin.png" className="w-56" />
      )}
    </div>
  );
};

export default HouseCard;
