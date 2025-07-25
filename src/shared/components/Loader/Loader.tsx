const text = "Loading...";

const Loader = () => (
  <div className="h-full w-full flex justify-center items-center flex-col">
    <span className="w-16 h-16 block border-6 border-gray-300 border-t-green-600 rounded-full animate-spin" />

    <p className="max-w-md text-center px-4 text-lg mt-2">{text}</p>
  </div>
);

export { Loader };
