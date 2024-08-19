import { Link, useLocation } from "react-router-dom";
import useNews from "../hooks/useNews";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return date.toLocaleDateString("da-DK", options); // Use 'da-DK' for Danish locale
};

const News = () => {
  const { news, error, loading } = useNews();
  const location = useLocation();
  const currentPath = location.pathname;

  if (loading)
    return (
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
        Loading...
      </p>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-end">
      <div className="w-[329px] min-h-screen bg-[#F5F5F0] rounded-b-lg">
        <div className="text-[22px] bg-[#5f657b] text-white px-4 py-4 rounded-t-lg">Se også...</div>
        <ul>
          {news.map((item) => {
            // Determine if the item is the current one
            const isActive = currentPath === `/news/${item.id}`;

            return (
              <li
                key={item.id}
                className={`text-black py-4 flex border-b border-black w-full ${isActive ? 'bg-[#B7A968] text-white' : ''}`}
              >
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
