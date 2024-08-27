import { getInitial } from "../../utils/config";

function ProfileInfo({ handleLogOut, userInfo }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-sky-500 font-medium bg-white">
        {getInitial(userInfo.fullName)}
      </div>

      <div>
        <p className="text-md text-white font-medium">{userInfo.fullName}</p>
        <button
          className="text-sm text-white font-medium underline uppercase"
          onClick={handleLogOut}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
