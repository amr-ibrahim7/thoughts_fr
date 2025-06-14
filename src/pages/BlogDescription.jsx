import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { usePost } from "@/context/postContext";
import { formatDate } from "@/utils/dataUtil";
import { getNameInitials } from "@/utils/stringUtil";
import { getFormattedTime } from "@/utils/timeUtil";
import { Clock9 } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router";

const BlogDescription = () => {
  const { id } = useParams();
  const { posts, post, fetchPost, fetchPosts, loading } = usePost();

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }
  }, [posts]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="size-16 rounded-full border-[10px] border-gray-300 border-r-blue-800 animate-spin"></div>
      </div>
    );

  if ((!loading && !post) || !post.author)
    return (
      <div className="flex flex-col items-center gap-7 justify-center h-dvh p-5">
        <h1 className="text-9xl font-bold">404</h1>
        <h3 className="text-3xl font-bold">Page Not Found</h3>
        <p className="text-lg text-center md:w-1/2">
          We are very sorry for the inconvinience. Its look like you're trying
          to acces a page that has been deleted or never even existed.
        </p>
        <Link to="/">
          <Button className="bg-blue-800 hover:bg-blue-700">
            Back to Home
          </Button>
        </Link>
      </div>
    );

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto px-5 lg:px-32 py-10">
      <div className="space-y-12">
        <div className="w-full h-[200px] md:h-[400px] lg:h-[500px] bg-cover bg-center overflow-hidden">
          <img
            src={post?.thumbnail}
            alt={post?.title}
            className="object-cover object-top w-full h-full"
          />
        </div>
        <div className="space-y-4 border-b pb-4">
       
          <div className="space-y-3">
            {post?.category && (
              <span className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-[#14293b] to-[#1e3a52] text-white rounded-full hover:from-[#1e3a52] hover:to-[#14293b] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                #{post.category}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-bold md:leading-normal">
              {post?.title}
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-7 justify-between mt-4">
            <div className="flex items-center gap-4">
              <Avatar className="size-7 md:size-12">
                <AvatarImage
                  src={post?.author.profilePicture}
                  className="object-cover w-full h-full"
                />
                <AvatarFallback>
                  {getNameInitials(post?.author.name)}
                </AvatarFallback>
              </Avatar>

              <span className="text-sm">
                <p>Published by</p>
                <p className="text-base font-medium">{post?.author.name}</p>
              </span>
            </div>
            <p className="flex items-center gap-1 text-sm text-neutral-500 ">
              Published on {formatDate(post?.createdAt)}
              <Clock9 size={14} strokeWidth={3} />
              {getFormattedTime(post?.createdAt)}
            </p>
          </div>
        </div>
      </div>


      <div className="mt-9 border-b pb-4">
        <div className="prose prose-lg max-w-none text-gray-700  leading-relaxed">
          <div className="whitespace-pre-wrap break-words">
            {post?.content || "No description available."}
          </div>
        </div>
      </div>

      <div className="mt-9 flex justify-center">
        <Link to="/" onClick={ScrollToTop}>
          <Button className="bg-blue-800 hover:bg-blue-700 text-white">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BlogDescription;
