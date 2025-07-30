const Input = ({ label, id, isValid, ...props }) => {
  return (
    <div className="w-full  rounded-sm ">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        className={`text-sm custom-input w-full px-4 py-2 border rounded-sm shadow-sm transition duration-300 ease-in-out ${
          isValid
            ? "border-gray-300 hover:border-blue-300 focus:outline-none "
            : "border-red-300 hover:border-red-300 focus:outline-none "
        } bg-gray-100`}
      />
    </div>
  );
};

export default Input;
