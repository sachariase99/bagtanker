import { Link } from "react-router-dom";
import useNews from "../hooks/useNews";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return date.toLocaleDateString("da-DK", options); // Use 'da-DK' for Danish locale
};

const NewsHome = () => {
  const { news, error, loading } = useNews();

  if (loading)
    return (
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
        Loading...
      </p>
    );
  if (error) return <p>Error: {error}</p>;

  // Limit news to a maximum of 3
  const limitedNews = news.slice(0, 3);

  return (
    <div className="flex flex-col h-full ml-24">
      <h1 className="text-5xl py-4 mt-8">Nyheder</h1>
      <div className="w-[721px] h-[527px] bg-[#323540] bg-opacity-80 rounded-lg">
        <ul>
          {limitedNews.map((item) => {
            const imageUrl = item.imageFilename ? item.imageFilename : null;

            return (
              <Link to={`/news/${item.id}`} key={item.id} className="text-white block">
                <li className="my-8 mx-8 flex">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={item.title}
                      className="w-[195px] h-[130px] border-[1px] border-white rounded-md mr-8"
                      onError={() =>
                        console.error(`Image failed to load: ${imageUrl}`)
                      }
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                  <div className="leading-loose">
                    <p className="font-thin text-base leading-none">
                      {formatDate(item.created_at)}:
                    </p>
                    <h2 className="text-lg font-bold leading-normal">
                      {item.title}
                    </h2>
                    <p className="font-thin text-lg leading-none">
                      {item.teaser}
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
