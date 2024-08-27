import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({ ...searchProps }) => {
  return (
    <div className="flex justify-center items-center px-4 bg-slate-100 rounded-full">
      <input
        className="w-full text-xs outline-none bg-transparent py-[11px]"
        {...searchProps}
      />
      <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
    </div>
  );
};

export default SearchBar;
