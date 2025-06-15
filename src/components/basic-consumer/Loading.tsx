const Loading = () => {
  return (
    <div className="w-full fixed inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity  min-h-screen  flex items-center  justify-center z-50">
      <div className="w-full h-full rounded-xl flex flex-col justify-center items-center gap-10  shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)]">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full border-t-2 border-primary w-20 h-20 border-solid"></div>
        </div>
        <p className="text-center text-primary">please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
