const BackButton = () => {
  return (
    <button
      onClick={() => {
        window.history.back();
      }}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Back
    </button>
  );
};

export default BackButton;
