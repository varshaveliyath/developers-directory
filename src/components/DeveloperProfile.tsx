import { useParams, Link } from "react-router-dom";
import devs from "../data/devs.json";

export default function DeveloperProfile() {
  const { id } = useParams();
  const dev = devs.find((d) => d.id === Number(id));

  if (!dev) return <p className="text-center text-red-500 dark:text-red-400">Developer not found</p>;

  return (
    <div className="bg-white text-black dark:bg-gray-800 dark:text-white rounded-lg shadow-lg p-8 text-center transition-colors duration-300">
      <img src={dev.avatar} alt={dev.name} className="w-28 h-28 rounded-full mx-auto mb-4 ring-4 ring-indigo-500" />
      <h2 className="text-2xl font-bold mb-1">{dev.name}</h2>
      <p className="text-gray-600 dark:text-gray-300">{dev.bio}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {dev.tech.map((t, i) => (
          <span key={i} className="bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-white px-2 py-1 rounded text-sm">
            {t}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm">
        Status: <span className={dev.status === "Available" ? "text-green-500" : "text-red-500"}>{dev.status}</span>
      </p>
      <Link to="/" className="mt-6 inline-block text-indigo-600 dark:text-indigo-400 hover:underline">
        ← Back to directory
      </Link>
    </div>
  );
}