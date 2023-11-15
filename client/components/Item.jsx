/* eslint-disable react/prop-types */
const Item = ({score, name}) => {
  return (
    <div className="mb-4 border-2 border-red-400 h-16 flex flex-row justify-between items-center px-7 rounded-xl">
      <img src="vite.svg" />
      <p className="font-semibold text-xl">{name}</p>
      <p className="font-semibold text-xl">{score}</p>
    </div>
  );
};

export default Item;
