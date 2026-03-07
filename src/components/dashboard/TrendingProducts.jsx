import React from "react";

const data = [
  { id: 1, name: "Easy Cheese", price: 599, queries: 845 },
  { id: 2, name: "Magnetic Paper Clip", price: 440, queries: 754 },
  { id: 3, name: "Secret Stadium Sauce", price: 485, queries: 724 },
  { id: 4, name: "Teriyaki Sauce", price: 544, queries: 640 },
];

const TrendingProducts = () => {
  return (
    <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#262626]">

      <h3 className="text-white mb-6 font-medium">
        Trending Products
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          {/* Header */}
          <thead className="bg-[#253029] text-[#BFBFBF]">
            <tr>
              <th className="text-left py-3 px-3">#</th>
              <th className="text-left px-3">Product Name</th>
              <th className="text-left px-3">Price</th>
              <th className="text-center px-3">Customer Queries</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="text-[#BFBFBF]">
            {data.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-[#262626] hover:bg-[#202020] transition"
              >

                <td className="py-4 px-3">
                  {String(index + 1).padStart(2, "0")}
                </td>

                <td className="px-3">
                  {item.name}
                </td>

                <td className="px-3">
                  ${item.price}
                </td>

                <td className="px-3 text-center">
                  {item.queries}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default TrendingProducts;