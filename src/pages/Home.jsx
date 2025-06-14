import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePost } from "@/context/postContext";
import { formatDate } from "@/utils/dataUtil";
import { getNameInitials } from "@/utils/stringUtil";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const Home = () => {
  const { posts, fetchPosts, loading } = usePost();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadPosts = async () => {
      const response = await fetchPosts(page);
      setTotalPages(response.totalPages);
    };
    loadPosts();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-8 bg-[#FFFFFF]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Recent Blogs
            </h1>
            <div className="w-20 h-1 bg-[#14293b] rounded-full"></div>
          </div>

          <div className="space-y-6">
            {loading && page === 1
              ? Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="pb-6 border-b border-gray-200 animate-pulse"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            <div>
                              <div className="w-32 h-4 bg-gray-200 rounded mb-1"></div>
                              <div className="w-20 h-3 bg-gray-200 rounded"></div>
                            </div>
                          </div>
                          <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
                          <div className="w-full h-4 bg-gray-200 rounded"></div>
                          <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
                        </div>
                        <div className="w-full h-48 bg-gray-200 rounded-lg"></div>
                        <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  ))
              : posts.map((post) => (
                  <article
                    key={post._id}
                    className="pb-6 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage
                              src={post.author.profilePicture}
                              className="object-cover w-full h-full"
                            />
                            <AvatarFallback className="bg-[#14293b] text-white text-sm">
                              {getNameInitials(post.author.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {post.author.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatDate(post?.createdAt)}
                            </div>
                          </div>
                        </div>

                        <span className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-[#14293b] to-[#1e3a52] text-white rounded-full hover:from-[#1e3a52] hover:to-[#14293b] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                          #{post.category}
                        </span>
                      </div>

                      <Link
                        to={`/blog/${post._id}`}
                        onClick={ScrollToTop}
                        className="block"
                      >
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 hover:text-[#14293b] transition-colors duration-200 leading-tight">
                          {post.title}
                        </h2>
                      </Link>

                      <div className="text-gray-600 leading-relaxed">
                        <p className="line-clamp-3 break-words overflow-hidden text-ellipsis">
                          {post.content
                            ? post.content.length > 200
                              ? post.content.substring(0, 200) + "..."
                              : post.content
                            : "No description available."}
                        </p>
                      </div>
                      <Link to={`/blog/${post._id}`} onClick={ScrollToTop}>
                        <div className="relative group">
                          <img
                            src={post.thumbnail}
                            alt={post.title}
                            className="w-full h-48 md:h-80 object-cover rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-lg transition-colors duration-300"></div>
                        </div>
                      </Link>
                    </div>
                  </article>
                ))}
          </div>
          {page < totalPages && (
            <div className="mt-8 pt-6 border-t border-gray-200  text-center">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-gray-600 hover:text-[#14293b] transition-colors duration-200 min-w-[120px]"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Show more posts"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
