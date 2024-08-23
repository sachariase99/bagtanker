import { Link } from "react-router-dom";
import useNews from "../hooks/useNews";

// Helper function to format date strings
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return date.toLocaleDateString("da-DK", options); // Format date for Danish locale
};

const NewsHome = () => {
  // Custom hook to fetch news data
  const { news, error, loading } = useNews();

  // Display loading message while data is being fetched
  if (loading)
    return (
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
        Loading...
      </p>
    );
  
  // Display error message if there is an error fetching data
  if (error) return <p>Error: {error}</p>;

  // Limit the number of news items displayed to 3
  const limitedNews = news.slice(0, 3);

  return (
    <div className="flex flex-col h-full ml-24 mr-24 lg:mr-0">
      <h1 className="text-5xl py-4 mt-8">Nyheder</h1>
      <div className="lg:w-1/2 h-full bg-[#323540] bg-opacity-80 rounded-lg mb-8">
        <ul>
          {limitedNews.map((item) => {
            // Determine the image URL for the news item
            const imageUrl = item.imageFilename ? item.imageFilename : null;

            return (
              // Link to the detailed view of the news item
              <Link to={`/news/${item.id}`} key={item.id} className="text-white block">
                <li className="my-8 mx-8 flex flex-col xl:flex-row">
                  {/* Display the image if available */}
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={item.title}
                      className="w-full xl:w-[195px] xl:h-[130px] border-[1px] border-white rounded-md mr-8"
                      onError={() =>
                        console.error(`Image failed to load: ${imageUrl}`) // Log error if image fails to load
                      }
                    />
                  ) : (
                    <p>No image available</p> // Fallback text if no image is available
                  )}
                  <div className="leading-loose pt-2 xl:pt-0">
                    <p className="font-thin text-base leading-none">
                      {formatDate(item.created_at)}: {/* Display the formatted date */}
                    </p>
                    <h2 className="text-lg font-bold leading-normal">
                      {item.title} {/* Display the news title */}
                    </h2>
                    <p className="font-thin text-lg leading-none">
                      {item.teaser} {/* Display the teaser text */}
                    </p>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default NewsHome;
