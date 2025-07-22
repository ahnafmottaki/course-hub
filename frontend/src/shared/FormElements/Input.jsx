const Input = ({ label, id, ...props }) => {
  return (
    <>
      <div>
        <label
          htmlFor={id}
          className="block text-orange-light text-lg font-semibold mb-2"
        >
          {label}
        </label>
        <input
          {...props}
          id={id}
          min={"5"}
          className="w-full  text-gray-light bg-glack-medium  outline-none p-[10px]  font-bold transition-all duration-200 ease-in-out border-l border-transparent focus:border-l-[5px] focus:border-orange"
        />
      </div>
    </>
  );
};

export default Input;
