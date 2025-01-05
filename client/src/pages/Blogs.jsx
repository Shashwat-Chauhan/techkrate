import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getDataFromFirestore from "../Getdatafromfirestrore";

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const blogs = await getDataFromFirestore("blogs");
      setBlogPosts(blogs);
      console.log(blogs);
    } catch (error) {
      console.error("Error fetching Blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen py-24 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
      <div className="relative max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">Our Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate(`/blogs/${post.id}`)} // Navigate to blog detail
              className="bg-white bg-opacity-5 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:bg-opacity-10 flex flex-col h-full"
            >
              <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-white mb-2">{post.title}</h2>
                <h3 className="text-md text-gray-300 mb-4">{post["secondTitle"]}</h3>
                <div className="mt-auto flex justify-between items-end">
                  <p className="text-sm text-gray-400">
                    <span className="font-medium">Author:</span> {post.author || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-400">{post.date?.seconds ? new Date(post.date.seconds * 1000).toLocaleDateString() : "Unknown"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
