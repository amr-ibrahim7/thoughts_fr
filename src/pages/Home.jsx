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
import { MessageCircle, Trash2, Calendar, Search, BookOpen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const Home = () => {
  const { user } = useAuth();
  const { posts, fetchPosts, loading, addComment, deleteComment,  searchResults, 
  searchQuery,isSearching } = usePost();
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


const displayPosts = searchQuery ? searchResults : posts;
const featuredPost = displayPosts.length > 0 ? displayPosts[0] : null;
const remainingPosts = displayPosts.slice(1);

 if (isSearching) {
    return (
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
                Blog
              </h1>
            </div>

            {/* Search Loading State */}
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                <Search className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary" />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Searching for "{searchQuery}"
                </h3>
                <p className="text-muted-foreground">
                  Please wait while we find the best results for you...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
   if (searchQuery && searchResults.length === 0 && !isSearching) {
    return (
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
                Blog
              </h1>
            </div>

            {/* No Results */}
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-6">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="text-center max-w-md">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  No Results Found
                </h3>
                <p className="text-muted-foreground text-lg mb-6">
                  We couldn't find any posts matching "{searchQuery}". Try adjusting your search terms or explore our latest posts below.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button 
                    onClick={() => window.location.reload()} 
                    variant="outline"
                    className="px-6 py-2"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse All Posts
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              Blog
            </h1>
          </div>
          {featuredPost && (
            <section className="mb-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center py-8">
                {/* Featured Post Image - Hidden on mobile */}
                <div className="order-2 lg:order-1 hidden md:block">
                  <Link to={`/post/${featuredPost._id}`} onClick={ScrollToTop}>
                    <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                      <img
                        src={featuredPost.thumbnail}
                        alt={featuredPost.title}
                        className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                          <p className="text-white text-sm font-medium">
                            Click to read more
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Featured Post Content */}
                <div className="order-1 lg:order-2 space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full">
                        Featured Post
                      </span>
                      <span className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-muted text-muted-foreground rounded-full border">
                        #{featuredPost.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Calendar size={16} />
                      <span>{formatDate(featuredPost.createdAt)}</span>
                    </div>
                  </div>

                  <Link to={`/post/${featuredPost._id}`} onClick={ScrollToTop}>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground hover:text-primary transition-colors duration-300 leading-tight">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {featuredPost.content
                      ? featuredPost.content.length > 250
                        ? featuredPost.content.substring(0, 250) + "..."
                        : featuredPost.content
                      : "No description available."}
                  </p>

                  <div className="flex items-center gap-4 pt-4">
                    <Avatar className="w-14 h-14 ring-2 ring-primary/20">
                      <AvatarImage
                        src={featuredPost.author.profilePicture}
                        className="object-cover w-full h-full"
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                        {getNameInitials(featuredPost.author.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="font-semibold text-foreground text-lg">
                        {featuredPost.author.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(featuredPost.createdAt)}
                      </div>
                    </div>
                  </div>
                    <Link to={`/post/${featuredPost._id}`} onClick={ScrollToTop}>
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25">
                              Read Article
                              <svg
                                className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </Button>
                          </Link>
                </div>
              </div>
            </section>
          )}
          {/* Recent Posts Section */}
          <section>
            {remainingPosts.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                   Posts
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent"></div>
                </div>
              </div>
            )}

            <div className="space-y-12">
              {loading && page === 1
                ? Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index} className="animate-pulse">
                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-muted rounded-full"></div>
                              <div className="space-y-2">
                                <div className="w-32 h-4 bg-muted rounded"></div>
                                <div className="w-24 h-3 bg-muted rounded"></div>
                              </div>
                            </div>
                            <div className="w-20 h-6 bg-muted rounded-full"></div>
                            <div className="space-y-3">
                              <div className="w-full h-8 bg-muted rounded"></div>
                              <div className="w-4/5 h-8 bg-muted rounded"></div>
                            </div>
                            <div className="space-y-2">
                              <div className="w-full h-4 bg-muted rounded"></div>
                              <div className="w-3/4 h-4 bg-muted rounded"></div>
                              <div className="w-1/2 h-4 bg-muted rounded"></div>
                            </div>
                          </div>
                          <div className="w-full h-72 bg-muted rounded-2xl hidden md:block"></div>
                        </div>
                      </div>
                    ))
                : remainingPosts.map((post, index) => (
                    <article key={post._id} className="group relative">
                      <div
                        className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                          index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                        }`}
                      >
                        {/* Content Section */}
                        <div
                          className={`space-y-6 ${
                            index % 2 === 1 ? "lg:col-start-2" : ""
                          }`}
                        >
                          {/* Author & Meta Info */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                                <AvatarImage
                                  src={post.author.profilePicture}
                                  className="object-cover w-full h-full"
                                />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  {getNameInitials(post.author.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-semibold text-foreground text-lg">
                                  {post.author.name}
                                </div>
                                <div className="text-sm text-muted-foreground flex items-center gap-2">
                                  <Calendar size={14} />
                                  {formatDate(post?.createdAt)}
                                </div>
                              </div>
                            </div>

                            <span className="inline-flex items-center px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-primary/5 text-primary rounded-full border border-primary/20 hover:from-primary/20 hover:to-primary/10 transition-all duration-300">
                              #{post.category}
                            </span>
                          </div>

                          {/* Title */}
                          <Link
                            to={`/post/${post._id}`}
                            onClick={ScrollToTop}
                            className="block group-hover:scale-[1.01] transition-transform duration-300"
                          >
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground hover:text-primary transition-colors duration-300 leading-tight">
                              {post.title}
                            </h3>
                          </Link>

                          {/* Description */}
                          <div className="text-muted-foreground text-lg leading-relaxed">
                            <p className="line-clamp-3">
                              {post.content
                                ? post.content.length > 200
                                  ? post.content.substring(0, 200) + "..."
                                  : post.content
                                : "No description available."}
                            </p>
                          </div>

                          {/* Read More Button */}
                          <Link to={`/post/${post._id}`} onClick={ScrollToTop}>
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 mb-4">
                              Read Article
                              <svg
                                className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </Button>
                          </Link>

                          {/* Comments Section */}
                          <div className="pt-6 border-t border-border/50">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <MessageCircle size={18} />
                                <span className="text-sm font-medium">
                                  {post?.comments?.length || 0} Comments
                                </span>
                              </div>
                              <button
                                onClick={() => toggleComments(post._id)}
                                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                              >
                                {expandedComments[post._id] ? "Hide" : "View"}{" "}
                                Comments
                              </button>
                            </div>

                            {user ? (
                              <div className="mb-4 p-4 bg-muted/30 rounded-xl border border-border/50">
                                <form
                                  onSubmit={(e) =>
                                    handleAddComment(e, post._id)
                                  }
                                  className="space-y-3"
                                >
                                  <div className="flex items-start gap-3">
                                    <Avatar className="size-9">
                                      <AvatarImage
                                        src={user?.profilePicture}
                                        className="object-cover w-full h-full"
                                      />
                                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
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
                                        placeholder="Share your thoughts..."
                                        className="w-full p-3 border border-input bg-background/50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                                        rows="3"
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
                                      className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-all duration-300"
                                      size="sm"
                                    >
                                      {isSubmitting[post._id] ? (
                                        <div className="flex items-center gap-2">
                                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                          Publishing...
                                        </div>
                                      ) : (
                                        "Comment"
                                      )}
                                    </Button>
                                  </div>
                                </form>
                              </div>
                            ) : (
                              <div className="mb-4 p-4 bg-muted/30 rounded-xl text-center border border-border/50">
                                <p className="text-muted-foreground">
                                  <Link
                                    to="/login"
                                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                                  >
                                    Sign in
                                  </Link>{" "}
                                  to join the conversation
                                </p>
                              </div>
                            )}

                            {/* Show Comments */}
                            {expandedComments[post._id] && (
                              <div className="space-y-4 mt-4">
                                {post?.comments && post.comments.length > 0 ? (
                                  post.comments.map((comment) => (
                                    <div
                                      key={comment._id}
                                      className="p-4 bg-background/50 border border-border/50 rounded-xl hover:bg-background/80 transition-colors duration-200"
                                    >
                                      <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-start gap-3 flex-1">
                                          <Avatar className="size-8">
                                            <AvatarImage
                                              src={comment.user?.profilePicture}
                                              className="object-cover w-full h-full"
                                            />
                                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                              {getNameInitials(
                                                comment.user?.name ||
                                                  "Anonymous"
                                              )}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                              <span className="font-medium text-foreground">
                                                {comment.user?.name ||
                                                  "Anonymous"}
                                              </span>
                                              <span className="text-xs text-muted-foreground">
                                                {formatDate(comment.createdAt)}
                                              </span>
                                            </div>
                                            <p className="text-foreground whitespace-pre-wrap break-words leading-relaxed">
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
                                                  className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg"
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
                                                    Are you sure you want to
                                                    delete this comment? This
                                                    action cannot be undone.
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
                                                    className="bg-destructive hover:bg-destructive/90"
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
                                  <div className="text-center py-8 text-muted-foreground">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                                      <MessageCircle
                                        size={24}
                                        className="opacity-50"
                                      />
                                    </div>
                                    <p className="text-lg font-medium mb-1">
                                      No comments yet
                                    </p>
                                    <p className="text-sm">
                                      Be the first to share your thoughts!
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Image Section - Hidden on mobile */}
                        <div
                          className={`hidden md:block ${
                            index % 2 === 1 ? "lg:col-start-1" : ""
                          }`}
                        >
                          <Link to={`/post/${post._id}`} onClick={ScrollToTop}>
                            <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                              <img
                                src={post.thumbnail}
                                alt={post.title}
                                className="w-full h-72 md:h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                              {/* Hover Overlay */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <div className="bg-white/10 backdrop-blur-md rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                                  <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>

                      {/* Article Separator */}
                      {index < remainingPosts.length - 1 && (
                        <div className="mt-12 pt-12 border-b border-gradient-to-r from-transparent via-border to-transparent">
                          <div className="w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent"></div>
                        </div>
                      )}
                    </article>
                  ))}
            </div>

            {page < totalPages && (
              <div className="mt-16 pt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-foreground bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20 rounded-2xl hover:from-primary/20 hover:to-primary/10 hover:border-primary/30 transition-all duration-300 min-w-[200px] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-3">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                        Loading more stories...
                      </>
                    ) : (
                      <>
                        Discover More Stories
                        <svg
                          className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </>
                    )}
                  </div>
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;