import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out cursor-pointer xs:w-full">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium uppercase  ">{title}</h6>
          <span className="text-xs text-slate-500">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>

        <FontAwesomeIcon
          onClick={onPinNote}
          icon="fa-solid fa-thumbtack"
          className={`cursor-pointer hover:text-sky-500 text-sm ${
            isPinned ? `text-sky-500` : `text-slate-300`
          }`}
        />
      </div>

      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="text-s text-slate-500">
          {tags?.map((tag) => `#${tag}  `)}
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            onClick={onEdit}
            icon="fa-solid fa-pen"
            className="text-sm hover:text-sky-500 cursor-pointer"
          />
          <FontAwesomeIcon
            onClick={onDelete}
            icon="fa-solid fa-trash"
            className="text-sm hover:text-sky-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
