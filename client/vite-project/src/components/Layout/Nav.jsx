import { useNavigate } from "react-router-dom";
import ProfileInfo from "../Profile/ProfileInfo";
import SearchBar from "./SearchBar";
import { useState } from "react";

const Nav = ({ userInfo, setUserInfo, onSearchNote }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const handleLogOut = () => {
    navigate("/login");
    localStorage.clear();
    setUserInfo(null);
  };
  console.log(search);

  return (
    <div className="bg-sky-500/100 py-2">
      <div className=" max-w-full px-2 sm:px-6 lg:px-8 flex justify-between items-center">
        <h2
          className="text-xl font-medium text-white py-2 uppercase cursor-pointer"
          onClick={() => navigate("/")}>
          notes
        </h2>
        {userInfo && (
          <>
            <SearchBar
              value={search}
              onChange={(e) => {
                e.preventDefault();
                const term = e.target.value;
                setSearch(term);
                onSearchNote(term);
              }}
              type="text"
              placeholder="Search notes..."
            />
            <ProfileInfo
              handleLogOut={handleLogOut}
              name={name}
              userInfo={userInfo}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
