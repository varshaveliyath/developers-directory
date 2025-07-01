import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCircle } from 'react-icons/fa';

type Props = {
  id: number;
  name: string;
  avatar: string;
  tech: string[];
  status: string;
  bio: string;
};

export default function DeveloperCard({ id, name, avatar, tech, status, bio }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="min-h-[320px] bg-white dark:bg-gray-800 border border-black dark:border-white rounded-xl shadow-md transition-transform duration-300 p-6"
    >
      <Link to={`/profile/${id}`}>
        <div className="flex flex-col items-center text-center h-full">
          <img
            src={avatar}
            alt={name}
            className="w-20 h-20 rounded-full shadow mb-3 ring-2 ring-indigo-500"
          />
          <h2 className="text-lg font-semibold text-indigo-700 dark:text-white">{name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{bio}</p>

          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {tech.map((t, idx) => (
              <span
                key={idx}
                className="bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-white px-2 py-0.5 rounded text-xs font-medium"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-4 text-sm text-gray-700 dark:text-white">
            <FaCircle
              className={status === 'Available' ? 'text-green-400 text-xs' : 'text-red-400 text-xs'}
            />
            <span>{status}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
