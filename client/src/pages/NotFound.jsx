const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-600 bg-gray-200">
      <h1 className="text-6xl font-semibold">404</h1>
      <h2 className="text-3xl mb-4">Page Not Found</h2>
      <p className="text-lg px-6 text-center">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
    </div>
  );
};

export default NotFound;
