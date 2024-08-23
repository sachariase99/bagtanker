import { useParams, Link } from "react-router-dom";
import useNews from "../hooks/useNews";
import News from "./news";

// Helper function to format date strings into a more readable format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('da-DK', options);
};

const NewsDetail = () => {
  const { id } = useParams(); // Extracts the 'id' parameter from the URL
  const { news, error, loading } = useNews(); // Custom hook to fetch news data

  // Display loading message while news data is being fetched
  if (loading) return <p>Loading...</p>;
  
  // Display error message if there's an issue fetching the news data
  if (error) return <p>Error: {error}</p>;

  // Find the selected news item by its ID
  const selectedNews = news.find((item) => item.id === id);

  // If the selected news item is not found, display a "not found" message
  if (!selectedNews) {
    return <p>News not found</p>;
  }

  // Helper function to split content into chunks with a specified number of lines per chunk
  const splitContentIntoChunks = (content, linesPerChunk) => {
    const lines = content.split('\n');
    const chunks = [];
    
    for (let i = 0; i < lines.length; i += linesPerChunk) {
      chunks.push(lines.slice(i, i + linesPerChunk).join('\n'));
    }
    
    return chunks;
  };

  // Split the news content into chunks of 3 lines each
  const contentChunks = splitContentIntoChunks(selectedNews.content, 3);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        {/* Breadcrumb navigation */}
        <p>
          Du er her: <Link to="/">Home</Link> / <Link to="/news">Nyheder</Link>
        </p>
        {/* Display the title of the selected news item */}
        <h2 className="text-4xl font-bold mb-4 mt-8">{selectedNews.title}</h2>
        {/* Display the formatted date of the news item */}
        <p className="font-thin text-base leading-none">
          {formatDate(selectedNews.created_at)}
        </p>
        {/* Display an image if it exists */}
        {selectedNews.imageFilename && (
          <img
            src={selectedNews.imageFilename}
            alt={selectedNews.title}
            className="w-full h-auto my-4"
          />
        )}
        {/* Display content split into chunks */}
        <div>
          {contentChunks.map((chunk, index) => (
            <div key={index} className="mb-4">
              <p className="text-lg">{chunk}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-1">
        {/* Sidebar with other news items */}
        <News />
      </div>
    </div>
  );
};

export default NewsDetail;
