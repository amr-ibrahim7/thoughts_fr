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
import { getFormattedTime } from "@/utils/timeUtil";
import { Clock9, MessageCircle, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const PostDescription = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const {
    posts,
    post,
    fetchPost,
    fetchPosts,
    loading,
    addComment,
    deleteComment,
  } = usePost();
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setIsSubmitting(true);
    try {
      await addComment(id, newComment.trim());
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(id, commentId);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

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
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <div className="whitespace-pre-wrap break-words">
            {post?.content || "No description available."}
          </div>
        </div>
      </div>

      <div className="mt-9">
        <div className="flex items-center gap-2 mb-6">
          <MessageCircle size={20} />
          <h3 className="text-xl font-semibold">
            Comments ({post?.comments?.length || 0})
          </h3>
        </div>

        {user ? (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <form onSubmit={handleAddComment} className="space-y-4">
              <div className="flex items-start gap-3">
                <Avatar className="size-8">
                  <AvatarImage
                    src={user?.profilePicture}
                    className="object-cover w-full h-full"
                  />
                  <AvatarFallback>{getNameInitials(user?.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!newComment.trim() || isSubmitting}
                  className="bg-blue-800 hover:bg-blue-700"
                >
                  {isSubmitting ? "Publishing..." : "Comment"}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-600">
              <Link to="/login" className="text-blue-800 hover:underline">
                Login
              </Link>{" "}
              to add a comment
            </p>
          </div>
        )}

        <div className="space-y-4">
          {post?.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div key={comment._id} className="p-4 bg-white border rounded-lg">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <Avatar className="size-8">
                      <AvatarImage
                        src={comment.user?.profilePicture}
                        className="object-cover w-full h-full"
                      />
                      <AvatarFallback>
                        {getNameInitials(comment.user?.name || "Anonymous")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">
                          {comment.user?.name || "Anonymous"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap break-words">
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
                            <Trash2 size={16} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Comment</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this comment? This
                              action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteComment(comment._id)}
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
            <div className="text-center py-8 text-gray-500">
              <MessageCircle size={48} className="mx-auto mb-2 opacity-50" />
              <p>No comments yet. Be the first to comment!</p>
            </div>
          )}
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

export default PostDescription;
