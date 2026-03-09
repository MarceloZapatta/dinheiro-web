import React from 'react';

const Menu = () => {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full bg-white shadow-lg md:relative md:top-0 md:shadow-none md:bg-transparent">
      <ul className="flex justify-around py-2 md:justify-start md:space-x-4">
        <li>
          <button className="px-4 py-2 text-gray-700 hover:text-blue-600">
            Movimentações
          </button>
        </li>
        <li>
          <button className="px-4 py-2 text-gray-700 hover:text-blue-600">
            Relatório
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
