"use client"
import React, { useState } from "react";

// 15 ta yacheyka, kategoriyasi aralash
const cellData = [
  { info: "1-yacheyka ma’lumotlari", category: "OTM" },
  { info: "2-yacheyka ma’lumotlari", category: "ITM" },
  { info: "3-yacheyka ma’lumotlari", category: "MCHJ" },
  { info: "4-yacheyka ma’lumotlari", category: "OTM" },
  { info: "5-yacheyka ma’lumotlari", category: "ITM" },
  { info: "6-yacheyka ma’lumotlari", category: "MCHJ" },
  { info: "7-yacheyka ma’lumotlari", category: "OTM" },
  { info: "8-yacheyka ma’lumotlari", category: "ITM" },
  { info: "9-yacheyka ma’lumotlari", category: "MCHJ" },
  { info: "10-yacheyka ma’lumotlari", category: "OTM" },
  { info: "11-yacheyka ma’lumotlari", category: "ITM" },
  { info: "12-yacheyka ma’lumotlari", category: "MCHJ" },
  { info: "13-yacheyka ma’lumotlari", category: "OTM" },
  { info: "14-yacheyka ma’lumotlari", category: "ITM" },
  { info: "15-yacheyka ma’lumotlari", category: "MCHJ" },
];

// Kategoriyalar ro‘yxati
const categories = ["OTM", "ITM", "MCHJ"];

const SVGClickableGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Kategoriya tanlash
  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
  };

  // Yacheyka tanlash
  // const handleRectClick = (idx: number) => {
  //   setSelectedIndex(idx);
  // };

  // SVG joylashuvi uchun qator va ustunlarni hisoblash (5x3)
  const cols = 5;
  const rectWidth = 100;
  const rectHeight = 50;
  const gapX = 10;
  const gapY = 15;

  return (
    <div className="flex gap-8">
      {/* Chap tomonda kategoriyalar */}
      <div>
        <h3 className="font-bold mb-2">Kategoriyalar</h3>
        <ul>
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              style={{
                cursor: "pointer",
                background: selectedCategory === cat ? "#ffe082" : "transparent",
                padding: "6px 12px",
                borderRadius: "6px",
                marginBottom: "4px",
                color: "black",
                fontWeight: selectedCategory === cat ? "bold" : "normal",
                fontSize: "14px",
              }}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* O‘ng tomonda SVG */}
      <div className="flex flex-col items-center">
        <svg
          width={cols * (rectWidth + gapX)}
          height={3 * (rectHeight + gapY)}
          viewBox={`0 0 ${cols * (rectWidth + gapX)} ${3 * (rectHeight + gapY)}`}
          xmlns="http://www.w3.org/2000/svg"
          className="border"
        >
          {cellData.map((cell, idx) => {
            const isActive = cell.category === selectedCategory;
            const isSelected = selectedIndex === idx;
            const col = idx % cols;
            const row = Math.floor(idx / cols);
            return (
              <rect
                key={idx}
                x={10 + col * (rectWidth + gapX)}
                y={10 + row * (rectHeight + gapY)}
                width={rectWidth}
                height={rectHeight}
                fill={isActive ? "#4CAF50" : "#0085D4"}
                onClick={() => setSelectedIndex(idx)}
                onDoubleClick={() => {
                  if (isSelected) setSelectedIndex(null);
                }}
                style={{
                  cursor: "pointer",
                  transition: "transform 0.25s cubic-bezier(.4,2,.6,1), filter 0.25s",
                  transform: isSelected ? "scale(1.15)" : "scale(1)",
                  filter: isSelected
                    ? "drop-shadow(0 4px 16px rgba(76,175,80,0.4))"
                    : "none",
                  transformOrigin: "center",
                  transformBox: "fill-box",
                  stroke: isSelected ? "#222" : "none",
                  strokeWidth: isSelected ? 3 : 0,
                }}
              />
            );
          })}
        </svg>

        {/* Kategoriya bo‘yicha ajratilgan yacheykalar haqida ma’lumot */}
        {/* <div className="mt-4 p-4 border rounded-lg shadow bg-white w-96 text-center">
          <h3 className="!text-[14px] font-bold mb-2 text-black">
            {selectedCategory} kategoriyasidagi yacheykalar
          </h3>
          <ul>
            {cellData
              .map((cell, idx) => ({ ...cell, idx }))
              .filter((cell) => cell.category === selectedCategory)
              .map((cell) => (
                <li key={cell.idx} className="!text-[14px] text-black">
                  {cell.info}
                </li>
              ))}
          </ul>
        </div> */}

        {/* Tanlangan yacheyka haqida ma’lumot */}
        {selectedIndex !== null && (
          <div
            className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 flex flex-col transition-transform duration-300"
            style={{ transform: selectedIndex !== null ? "translateX(0)" : "translateX(100%)" }}
          >
            <button
              className="self-end m-4 text-2xl font-bold text-gray-600 hover:text-red-500"
              onClick={() => setSelectedIndex(null)}
              aria-label="Yopish"
            >
              ×
            </button>
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <h3 className="!text-[16px] font-bold mb-2 text-black">
                Tanlangan yacheyka
              </h3>
              <p className="!text-[14px] font-bold mb-2 text-black">
                {cellData[selectedIndex].info} <br />
                <span style={{ color: "#888" }}>
                  Kategoriya: {cellData[selectedIndex].category}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SVGClickableGrid;