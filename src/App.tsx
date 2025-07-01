import { useTheme } from './hooks/useTheme';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import { FaSearch } from 'react-icons/fa';
import ThemeToggle from './components/ThemeToggle';
import DeveloperCard from './components/DeveloperCard';
import FilterBar from './components/FilterBar';
import DeveloperProfile from './components/DeveloperProfile';
import devs from './data/devs.json';

export default function App() {
  useTheme();

  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const allStacks = Array.from(new Set(devs.flatMap((dev) => dev.tech)));

  const filteredDevs = devs.filter((dev) => {
    const matchTechs = selectedTechs.every((tech) =>
      dev.tech.map((t) => t.toLowerCase()).includes(tech.toLowerCase())
    );
    const matchSearch = dev.name.toLowerCase().includes(search.toLowerCase());
    return (selectedTechs.length === 0 || matchTechs) && matchSearch;
  });

  return (
    <Router>
      <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10 md:py-12">
          {/* Header */}
          <div className="relative flex flex-col items-center justify-center text-center pt-4 pb-10 sm:pt-10 sm:pb-14">
            {/* Orbiting Particle with contrasting color */}
           <div className="absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-[160%] w-8 h-8 animate-spin">
              {/* Particle 1 */}
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-black dark:bg-indigo-500 rounded-full shadow-lg" />
              {/* Particle 2 - 180deg opposite */}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-black dark:bg-indigo-500 rounded-full shadow-lg" />
            </div>


            {/* Title */}
            <h1 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight 
              text-indigo-600 dark:text-white">
              Developer Directory
            </h1>
          </div>


          {/* Theme Toggle */}
          <div className="flex justify-end mb-6">
            <div className="sm:scale-90 scale-90">
              <ThemeToggle />
            </div>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search developers..."
              className="w-full pl-10 pr-4 py-2 border rounded shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter Pills */}
          <FilterBar
            stacks={allStacks}
            selected={selectedTechs}
            onChange={setSelectedTechs}
          />

          {/* Developer Cards */}
         <Routes>
          <Route
            path="/"
            element={
              filteredDevs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredDevs.map((dev) => (
                    <div
                      key={dev.id}
                      className="bg-indigo-300 dark:bg-gray-700 p-2 rounded-xl transition duration-300"
                    >
                      <DeveloperCard {...dev} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center mt-12 text-gray-500 dark:text-gray-400">
                  <HiOutlineEmojiSad className="text-6xl mx-auto mb-4" />
                  <p className="text-xl font-medium">
                    No developers found with the selected stack.
                  </p>
                </div>
              )
            }
          />
          <Route path="/profile/:id" element={<DeveloperProfile />} />
        </Routes>



        </div>
      </div>
    </Router>
  );
}
