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
import { useAuth } from "@/context/AuthContext";
import { usePost } from "@/context/postContext";
import { FileEditIcon, Trash2, FileText, Hash, Eye } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router";

const MyPosts = () => {
  const { user } = useAuth();
  const { userPosts, fetchByUser, deletePost, loading } = usePost();

  useEffect(() => {
    if (user?.id) {
      const fetchData = async () => {
        await fetchByUser(user.id);
      };
      fetchData();
    }
  }, [user?.id]);

  const handleDetetePost = async (postId) => {
    await deletePost(postId);
  };

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              My Posts
            </h1>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent mb-6"></div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Manage and organize your published content
            </p>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            {loading ? (
              // Skeleton Loading
              <div className="space-y-6">
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="bg-background/50 border-2 border-border/50 rounded-2xl p-8 animate-pulse"
                    >
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Skeleton Image */}
                        <div className="w-full lg:w-80 h-48 lg:h-56 bg-muted/50 rounded-xl"></div>
                        
                        {/* Skeleton Content */}
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-muted/50 rounded-lg"></div>
                            <div className="w-32 h-6 bg-muted/50 rounded"></div>
                          </div>
                          
                          <div className="w-3/4 h-8 bg-muted/50 rounded mb-4"></div>
                          <div className="space-y-2">
                            <div className="w-full h-4 bg-muted/50 rounded"></div>
                            <div className="w-5/6 h-4 bg-muted/50 rounded"></div>
                            <div className="w-4/6 h-4 bg-muted/50 rounded"></div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-4">
                            <div className="w-24 h-8 bg-muted/50 rounded-full"></div>
                            <div className="flex gap-4">
                              <div className="w-8 h-8 bg-muted/50 rounded"></div>
                              <div className="w-8 h-8 bg-muted/50 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : userPosts.length > 0 ? (
              // Posts List
              <div className="space-y-6">
                {userPosts.map((post) => (
                  <article
                    key={post._id}
                    className="group bg-background/50 border-2 border-border/50 hover:border-primary/30 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Post Thumbnail */}
                      <div className="w-full lg:w-80 h-48 lg:h-56 overflow-hidden rounded-xl bg-muted/20">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* Post Content */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-4">
                          {/* Category Badge */}
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20">
                              <Hash className="w-4 h-4 text-primary" />
                            </div>
                            <span className="inline-flex items-center px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-primary rounded-full">
                              {post.category}
                            </span>
                          </div>

                          {/* Post Title */}
                          <Link 
                            to={`/post/${post._id}`} 
                            onClick={ScrollToTop}
                            className="group/title"
                          >
                            <h2 className="text-2xl lg:text-3xl font-bold text-foreground line-clamp-2 leading-tight group-hover/title:text-primary transition-colors duration-300">
                              {post.title}
                            </h2>
                          </Link>

                          {/* Post Description */}
                          <p className="text-muted-foreground leading-relaxed line-clamp-3">
                            {post.content
                              ? post.content.length > 200
                                ? post.content.substring(0, 200) + "..."
                                : post.content
                              : "No description available."}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-6 border-t border-border/30 mt-6">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FileText className="w-4 h-4" />
                            <span>{post.content?.length || 0} characters</span>
                          </div>

                          <div className="flex items-center gap-4">
                            {/* View Post */}
                            <Link 
                              to={`/post/${post._id}`} 
                              onClick={ScrollToTop}
                              className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all duration-300 hover:scale-105"
                              title="View Post"
                            >
                              <Eye className="w-5 h-5" />
                            </Link>

                            {/* Edit Post */}
                            <Link 
                              to={`/editpost/${post._id}`}
                              className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 hover:bg-blue-500/20 transition-all duration-300 hover:scale-105"
                              title="Edit Post"
                            >
                              <FileEditIcon className="w-5 h-5" />
                            </Link>

                            {/* Delete Post */}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 hover:bg-red-500/20 transition-all duration-300 hover:scale-105"
                                  title="Delete Post"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-background border border-border/50 rounded-2xl">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-2xl font-bold text-foreground">
                                    Delete Post
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="text-muted-foreground leading-relaxed">
                                    This action cannot be undone. This will permanently delete "{post.title}" and remove it from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="gap-3">
                                  <AlertDialogCancel className="px-6 py-3 border-2 border-border/50 hover:border-border hover:bg-muted/50 rounded-xl transition-all duration-300">
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDetetePost(post._id)}
                                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                                  >
                                    Delete Post
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <FileText className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    No Posts Yet
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    You haven't published any blog posts yet. Start sharing your thoughts and insights with the world!
                  </p>
                  <Link 
                    to="/addpost"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25"
                  >
                    <FileText className="w-5 h-5" />
                    Create Your First Post
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPosts;