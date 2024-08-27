const EmtyCard = ({ imgScr, message }) => {
  return (
    <div className="flex items-center justify-center flex-col mt-20">
      <img src={imgScr} alt="no notes" className="w-60" />
      <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5 ">
        {message}
      </p>
    </div>
  );
};

export default EmtyCard;
