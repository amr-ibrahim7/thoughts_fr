import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { usePost } from "@/context/postContext";
import { formatDate } from "@/utils/dataUtil";
import { getNameInitials } from "@/utils/stringUtil";
import { MessageCircle, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const Home = () => {
  const { user } = useAuth();
  const { posts, fetchPosts, loading, addComment, deleteComment } = usePost();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [newComments, setNewComments] = useState({});
  const [isSubmitting, setIsSubmitting] = useState({});
  const [expandedComments, setExpandedComments] = useState({});

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

  const handleAddComment = async (e, postId) => {
    e.preventDefault();
    const commentText = newComments[postId];
    if (!commentText?.trim() || !user) return;

    setIsSubmitting((prev) => ({ ...prev, [postId]: true }));
    try {
      await addComment(postId, commentText.trim());
      setNewComments((prev) => ({ ...prev, [postId]: "" }));
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await deleteComment(postId, commentId);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const toggleComments = (postId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
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

          <div className="space-y-8">
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
                    className="pb-8 border-b border-gray-200 last:border-b-0"
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

                      {/* comments! */}
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 mb-4">
                          <MessageCircle size={18} className="text-gray-600" />
                          <button
                            onClick={() => toggleComments(post._id)}
                            className="text-sm font-medium text-gray-600 hover:text-[#14293b] transition-colors"
                          >
                            Comments ({post?.comments?.length || 0})
                          </button>
                        </div>

                        {user ? (
                          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                            <form
                              onSubmit={(e) => handleAddComment(e, post._id)}
                              className="space-y-3"
                            >
                              <div className="flex items-start gap-3">
                                <Avatar className="size-8">
                                  <AvatarImage
                                    src={user?.profilePicture}
                                    className="object-cover w-full h-full"
                                  />
                                  <AvatarFallback className="bg-[#14293b] text-white text-xs">
                                    {getNameInitials(user?.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <textarea
                                    value={newComments[post._id] || ""}
                                    onChange={(e) =>
                                      setNewComments((prev) => ({
                                        ...prev,
                                        [post._id]: e.target.value,
                                      }))
                                    }
                                    placeholder="Write a comment..."
                                    className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#14293b] focus:border-transparent"
                                    rows="2"
                                    disabled={isSubmitting[post._id]}
                                  />
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <Button
                                  type="submit"
                                  disabled={
                                    !newComments[post._id]?.trim() ||
                                    isSubmitting[post._id]
                                  }
                                  className="bg-[#14293b] hover:bg-[#1e3a52] text-white"
                                  size="sm"
                                >
                                  {isSubmitting[post._id]
                                    ? "Publishing..."
                                    : "Comment"}
                                </Button>
                              </div>
                            </form>
                          </div>
                        ) : (
                          <div className="mb-4 p-3 bg-gray-50 rounded-lg text-center">
                            <p className="text-gray-600 text-sm">
                              <Link
                                to="/login"
                                className="text-[#14293b] hover:underline font-medium"
                              >
                                Login
                              </Link>{" "}
                              to add a comment
                            </p>
                          </div>
                        )}

                        {/* show thr comments */}
                        {expandedComments[post._id] && (
                          <div className="space-y-3">
                            {post?.comments && post.comments.length > 0 ? (
                              post.comments.map((comment) => (
                                <div
                                  key={comment._id}
                                  className="p-3 bg-white border border-gray-200 rounded-lg"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-3 flex-1">
                                      <Avatar className="size-7">
                                        <AvatarImage
                                          src={comment.user?.profilePicture}
                                          className="object-cover w-full h-full"
                                        />
                                        <AvatarFallback className="bg-[#14293b] text-white text-xs">
                                          {getNameInitials(
                                            comment.user?.name || "Anonymous"
                                          )}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="font-medium text-sm text-gray-900">
                                            {comment.user?.name || "Anonymous"}
                                          </span>
                                          <span className="text-xs text-gray-500">
                                            {formatDate(comment.createdAt)}
                                          </span>
                                        </div>
                                        <p className="text-gray-700 text-sm whitespace-pre-wrap break-words">
                                          {comment.comment}
                                        </p>
                                      </div>
                                    </div>

                                    {user &&
                                      (user.id === comment.user?._id ||
                                        user.id === post.author._id) && (
                                        <AlertDialog>
                                          <AlertDialogTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            >
                                              <Trash2 size={14} />
                                            </Button>
                                          </AlertDialogTrigger>
                                          <AlertDialogContent>
                                            <AlertDialogHeader>
                                              <AlertDialogTitle>
                                                Delete Comment
                                              </AlertDialogTitle>
                                              <AlertDialogDescription>
                                                Are you sure you want to delete
                                                this comment? This action cannot
                                                be undone.
                                              </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                              <AlertDialogCancel>
                                                Cancel
                                              </AlertDialogCancel>
                                              <AlertDialogAction
                                                onClick={() =>
                                                  handleDeleteComment(
                                                    post._id,
                                                    comment._id
                                                  )
                                                }
                                                className="bg-red-600 hover:bg-red-700"
                                              >
                                                Delete
                                              </AlertDialogAction>
                                            </AlertDialogFooter>
                                          </AlertDialogContent>
                                        </AlertDialog>
                                      )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-6 text-gray-500">
                                <MessageCircle
                                  size={32}
                                  className="mx-auto mb-2 opacity-50"
                                />
                                <p className="text-sm">
                                  No comments yet. Be the first to comment!
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
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
