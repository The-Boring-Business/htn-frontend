const BudgetElement = ({ name, type, date, amount }) => {
  return (
    <div className="flex flex-row justify-between pr-4 my-6 mt-3 border-b-2">
      <div className="flex flex-col">
        <h2 className="font-semi-bold ">{name}</h2>
        <p className="text-gray text-xs">{type}</p>
      </div>
      <h2 className="font-medium">{date}</h2>
      <h2 className="font-bold">${amount}</h2>
    </div>
  );
};

export default BudgetElement;
