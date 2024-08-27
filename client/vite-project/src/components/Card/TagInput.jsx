import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagRemove) => {
    setTags(tags.filter((tag) => tag !== tagRemove));
  };

  console.log(inputValue);
  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap ">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="flex items-center justify-between gap-2 text-sm text-slate-900 bg-slate-100 py-1 px-1 rounded mx-2">
              <span># </span> <span> {tag}</span>
              <FontAwesomeIcon
                icon="fa-solid fa-xmark"
                onClick={() => {
                  handleRemoveTag(tag);
                }}
                className="px-3 cursor-pointer hover:text-sky-500"
              />
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add tags"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className="size-8 flex items-center justify-center rounded border border-sky-500 hover:bg-sky-500 "
          onClick={() => {
            addNewTag();
          }}>
          <FontAwesomeIcon
            icon="fa-solid fa-plus"
            className="text-sky-500 hover:text-white font-xl px-3"
          />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
