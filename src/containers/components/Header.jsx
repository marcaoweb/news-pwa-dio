import { memo } from "react";


function Header() {
    return (
      <header className="bg-gray-900 border-b border-gray-500 shadow">
        <div className="container mx-auto py-4 text-center">
          <h1 className="text-gray-200 text-shadow-light font-bold text-4xl">
            World News PWA
          </h1>
        </div>
      </header>
    );
};

export default memo(Header);