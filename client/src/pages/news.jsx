import { Link, useLocation } from "react-router-dom";
import useNews from "../hooks/useNews";

// Helper function to format date strings into a more readable format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return date.toLocaleDateString("da-DK", options);
};

const News = () => {
  // Custom hook to fetch news data
  const { news, error, loading } = useNews();
  const location = useLocation(); // Hook to get the current URL location
  const currentPath = location.pathname; // Current path from the location object

  // Display loading state while news data is being fetched
  if (loading)
    return (
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
        Loading...
      </p>
    );
  
  // Display error message if there is an error fetching news data
  if (error) return <p>Error: {error}</p>;

  // Sort news items by creation date in descending order
  const sortedNews = news.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div className="flex flex-col items-end">
      {/* Sidebar for news items */}
      <div className="w-[329px] min-h-screen bg-[#F5F5F0] rounded-b-lg">
        {/* Sidebar header */}
        <div className="text-[22px] bg-[#5f657b] text-white px-4 py-4 rounded-t-lg">
          Se også...
        </div>
        {/* List of news items */}
        <ul>
          {sortedNews.map((item) => {
            // Determine if the current news item is the active one based on URL path
            const isActive = currentPath === `/news/${item.id}`;

            return (
              <li
                key={item.id}
                className={`text-black py-4 flex border-b border-black w-full ${isActive ? 'bg-[#B7A968] text-white' : ''}`}
              >
                {/* Link to the individual news item's detail page */}
                <Link to={`/news/${item.id}`} className="w-full">
                  <div className="leading-loose px-4">
                    <p className="font-thin text-sm leading-none">
                      {formatDate(item.created_at)}:
                    </p>
                    <h3 className="text-base font-normal leading-normal">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default News;
