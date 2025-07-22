const Input = () => {
  return (
    <>
      <div>
        <span className="block text-orange-light text-base font-semibold mb-5">
          Full Name
        </span>
        <input
          className="w-full text-gray-light bg-glack-medium  border-none outline-none p-[10px] mb-5 font-bold transition-all duration-200 ease-in-out border-l border-transparent focus:border-l-[5px] focus:border-orange"
          type="text"
          placeholder="your name"
        />
      </div>
    </>
  );
};

export default Input;
