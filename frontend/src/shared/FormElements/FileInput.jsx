import { useRef, useState } from "react";

const FileInput = ({ label, id, onSet, ...props }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const fileInput = useRef(null);

  const pickImageHandler = () => {
    fileInput.current.click();
    setIsEdited(true);
  };

  const onImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    onSet(file);
  };
  return (
    <div className="w-full  rounded-sm ">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="flex items-end gap-5">
        <div
          className={`${
            !isEdited || previewUrl ? "bg-gray-200" : "bg-red-200"
          } overflow-hidden font-medium w-40 h-40 grid place-content-center  border-black border`}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              className="w-full h-full object-cover"
              alt="preview"
            />
          ) : (
            "Pick"
          )}
          <input
            ref={fileInput}
            type="file"
            className="hidden"
            id={id}
            {...props}
            onChange={onImageChange}
          />
        </div>
        <button
          type="button"
          className="secondary-button"
          onClick={pickImageHandler}
        >
          {previewUrl ? "Change Image" : "Pick Image"}
        </button>
      </div>
    </div>
  );
};

export default FileInput;
