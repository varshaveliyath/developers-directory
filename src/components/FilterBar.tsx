import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

type Props = {
  stacks: string[];
  selected: string[];
  onChange: (stack: string[]) => void;
};

const ITEMS_PER_PAGE = 20;

export default function FilterBar({ stacks, selected, onChange }: Props) {
  const [page, setPage] = useState(0);

  const toggleTech = (tech: string) => {
    if (selected.includes(tech)) {
      onChange(selected.filter((t) => t !== tech));
    } else {
      onChange([...selected, tech]);
    }
  };

  const clearAll = () => onChange([]);

  const totalPages = Math.ceil(stacks.length / ITEMS_PER_PAGE);
  const paginatedStacks = stacks.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <div className="mb-10">
      {/* Selected Tech Preview */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-4">
          {selected.map((tech) => (
            <div
              key={tech}
              className="flex items-center px-3 py-1.5 rounded-full text-sm font-medium 
                         bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
            >
              {tech}
              <button
                onClick={() => toggleTech(tech)}
                className="ml-2 text-gray-500 dark:text-gray-300 cursor-pointer"
              >
                <FaTimes className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Filter Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        <button
          onClick={clearAll}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300
            ${
              selected.length === 0
                ? "bg-black text-white border-transparent"
                : "bg-gray-100 text-black dark:bg-gray-800 dark:text-white border-indigo-500 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-indigo-400 hover:to-purple-400 dark:hover:from-indigo-600 dark:hover:to-purple-600"
            }`}
        >
          All
        </button>

        {paginatedStacks.map((tech) => (
          <button
            key={tech}
            onClick={() => toggleTech(tech)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300
              ${
                selected.includes(tech)
                  ? "bg-black text-white border-transparent"
                  : "bg-gray-100 text-black dark:bg-gray-800 dark:text-white border-indigo-500 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-indigo-400 hover:to-purple-400 dark:hover:from-indigo-600 dark:hover:to-purple-600"
              }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Navigation Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 ">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className={`p-1.5 rounded-full transition 
              ${
                page === 0
                  ? "text-gray-300 dark:text-gray-600 cursor-default"
                  : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white cursor-pointer"
              }`}
          >
            <FaChevronLeft size={12} />
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition
                  ${
                    i === page
                      ? "bg-black dark:bg-white"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
              />
            ))}
          </div>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={page === totalPages - 1}
            className={`p-1.5 rounded-full transition 
              ${
                page === totalPages - 1
                  ? "text-gray-300 dark:text-gray-600 cursor-default"
                  : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white cursor-pointer"
              }`}
          >
            <FaChevronRight size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
