import { useParams, Link } from "react-router-dom";
import useNews from "../hooks/useNews";
import News from "./news";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('da-DK', options); // Format the date in Danish locale
};

const NewsDetail = () => {
  const { id } = useParams();
  const { news, error, loading } = useNews();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Convert `id` to string for comparison
  const selectedNews = news.find((item) => item.id === id);

  if (!selectedNews) {
    return <p>News not found</p>;
  }

  // Function to split content into chunks
  const splitContentIntoChunks = (content, linesPerChunk) => {
    const lines = content.split('\n'); // Split by newlines
    const chunks = [];
    
    for (let i = 0; i < lines.length; i += linesPerChunk) {
      chunks.push(lines.slice(i, i + linesPerChunk).join('\n')); // Create chunks
    }
    
    return chunks;
  };

  // Split the content into chunks of 3 lines
  const contentChunks = splitContentIntoChunks(selectedNews.content, 3);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <p>
          Du er her: <Link to="/">Home</Link> / <Link to="/news">Nyheder</Link>
        </p>
        <h2 className="text-4xl font-bold mb-4 mt-8">{selectedNews.title}</h2>
        <p className="font-thin text-base leading-none">
          {formatDate(selectedNews.created_at)}
        </p>
        {selectedNews.imageFilename && (
          <img
            src={selectedNews.imageFilename}
            alt={selectedNews.title}
            className="w-full h-auto my-4"
          />
        )}
        <div>
          {contentChunks.map((chunk, index) => (
            <div key={index} className="mb-4">
              <p className="text-lg">{chunk}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-1">
        <News />
      </div>
    </div>
  );
};

export default NewsDetail;
