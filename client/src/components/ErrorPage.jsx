// components/ErrorPage.jsx
'use client'

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-gray-200">
      <h1 className="text-6xl font-bold mb-4 animate-pulse">404</h1>
      <h2 className="text-2xl mb-8">Page Not Found</h2>
      <p className="mb-4 text-lg">Sorry,Rip for your page.</p>

      <div className="mt-10">
        {/* A bouncing animation effect */}
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full bounce-anim"></div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
