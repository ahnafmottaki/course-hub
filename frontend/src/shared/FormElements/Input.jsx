const Input = ({ label, id, errorMsg, ...props }) => {
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
          className={`w-full relative  bg-glack-medium  outline-none p-[10px]  font-bold ${
            errorMsg
              ? " border-l-deep-orange border-l-[5px] text-deep-orange "
              : " focus:border-orange focus:border-l-[5px] text-gray-light"
          } transition-all duration-200 ease-in-out  border-l-[1px] border-transparent  `}
        />
        {errorMsg && (
          <p className="text-deep-orange text-xs md:text-sm mt-2">{errorMsg}</p>
        )}
      </div>
    </>
  );
};

export default Input;
