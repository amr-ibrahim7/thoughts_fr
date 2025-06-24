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
import { Clock9, MessageCircle, Trash2, ArrowLeft, User, Calendar } from "lucide-react";
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
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <div className="flex justify-center items-center h-[80vh]">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );

  if ((!loading && !post) || !post.author)
    return (
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <div className="flex flex-col items-center gap-7 justify-center h-dvh p-5">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">404</h1>
          <h3 className="text-3xl font-bold text-foreground">Page Not Found</h3>
          <p className="text-lg text-center md:w-1/2 text-muted-foreground leading-relaxed">
            We are very sorry for the inconvenience. It looks like you're trying
            to access a page that has been deleted or never even existed.
          </p>
          <Link to="/">
            <Button className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-8">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Hero Image Section */}
          <section className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"></div>
            <img
              src={post?.thumbnail}
              alt={post?.title}
              className="object-cover object-center w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </section>

          {/* Header Section */}
          <section className="space-y-8">
            <div className="space-y-6">
              {post?.category && (
                <div className="inline-flex items-center px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-primary/20 text-primary rounded-full border border-primary/20 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  #{post.category}
                </div>
              )}
              
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
                  {post?.title}
                </h1>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent mb-6"></div>
              </div>
            </div>

            {/* Author and Date Info */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                    <AvatarImage
                      src={post?.author.profilePicture}
                      className="object-cover w-full h-full"
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {getNameInitials(post?.author.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-muted-foreground">Published by</p>
                    <p className="text-lg font-semibold text-foreground">{post?.author.name}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div>
                    <p className="text-sm">Published on</p>
                    <p className="text-base font-medium flex items-center gap-2">
                      {formatDate(post?.createdAt)}
                      <Clock9 size={16} />
                      {getFormattedTime(post?.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Content</h2>
                <p className="text-sm text-muted-foreground">Read the full article</p>
              </div>
            </div>

            <div className="bg-background/50 border-2 border-border/50 rounded-2xl p-8 md:p-12">
              <div className="prose prose-lg max-w-none text-foreground leading-relaxed">
                <div className="whitespace-pre-wrap break-words text-lg leading-relaxed">
                  {post?.content || "No description available."}
                </div>
              </div>
            </div>
          </section>

          {/* Comments Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Comments</h2>
                <p className="text-sm text-muted-foreground">
                  {post?.comments?.length || 0} {post?.comments?.length === 1 ? 'comment' : 'comments'}
                </p>
              </div>
            </div>

            {/* Add Comment Form */}
            {user ? (
              <div className="bg-background/50 border-2 border-border/50 rounded-2xl p-6">
                <form onSubmit={handleAddComment} className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10 ring-2 ring-primary/20">
                      <AvatarImage
                        src={user?.profilePicture}
                        className="object-cover w-full h-full"
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getNameInitials(user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts on this post..."
                        className="w-full p-4 bg-background/50 border-2 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none rounded-xl text-base leading-relaxed min-h-[120px]"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={!newComment.trim() || isSubmitting}
                      className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Publishing...
                        </div>
                      ) : (
                        "Post Comment"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-background/50 border-2 border-border/50 rounded-2xl p-6 text-center">
                <p className="text-muted-foreground text-lg">
                  <Link to="/login" className="text-primary hover:text-primary/80 font-semibold transition-colors duration-300">
                    Login
                  </Link>{" "}
                  to join the conversation
                </p>
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-4">
              {post?.comments && post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <div key={comment._id} className="bg-background/50 border-2 border-border/50 rounded-2xl p-6 transition-all duration-300 hover:border-border/70">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="w-10 h-10 ring-2 ring-primary/20">
                          <AvatarImage
                            src={comment.user?.profilePicture}
                            className="object-cover w-full h-full"
                          />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {getNameInitials(comment.user?.name || "Anonymous")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-foreground">
                              {comment.user?.name || "Anonymous"}
                            </span>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock9 size={12} />
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
                                className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 transition-all duration-300 rounded-lg"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-background border border-border/50 rounded-2xl">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-foreground">Delete Comment</AlertDialogTitle>
                                <AlertDialogDescription className="text-muted-foreground">
                                  Are you sure you want to delete this comment? This
                                  action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteComment(comment._id)}
                                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl"
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
                <div className="text-center py-12 bg-background/30 rounded-2xl border-2 border-dashed border-border/50">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <MessageCircle size={32} className="text-primary/50" />
                  </div>
                  <p className="text-xl font-medium text-muted-foreground">No comments yet</p>
                  <p className="text-muted-foreground mt-1">Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </section>

          {/* Back to Home Button */}
          <section className="pt-8 border-t border-border/50">
            <div className="flex justify-center">
              <Link to="/" onClick={ScrollToTop}>
                <Button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PostDescription;