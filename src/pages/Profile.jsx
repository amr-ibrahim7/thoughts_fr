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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { usePost } from "@/context/postContext";
import { useUser } from "@/context/userContext";
import { formatDate } from "@/utils/dataUtil";
import { getNameInitials } from "@/utils/stringUtil";
import { 
  Camera, 
  Eye, 
  EyeOff, 
  Trash2, 
  User, 
  Calendar, 
  FileText, 
  Mail,
  Edit3,
  Settings,
  Hash
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const Profile = () => {
  const { user, loading } = useAuth();
  const { userPosts, fetchByUser, loading: postLoading } = usePost();
  const { updateUserProfile, uploadUserAvatar, deleteUserProfile } = useUser();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user?.name);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(user?.profilePicture);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    if (user?.id) {
      const fetchData = async () => {
        await fetchByUser(user.id);
      };
      fetchData();
    }
    if (user?.name) {
      setName(user.name);
    }
    if (user?.profilePicture) {
      setPreview(user.profilePicture);
    }
  }, [user?.id, user?.name, user?.profilePicture]);

  const hasChanges = () => {
    return name !== user?.name || oldPassword || newPassword || selectedFile;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      name,
    };

    if (oldPassword && newPassword) {
      updateData.oldPassword = oldPassword;
      updateData.newPassword = newPassword;
    }

    if (selectedFile) {
      const formData = new FormData();
      formData.append("profilePicture", selectedFile);
      await uploadUserAvatar(formData);
    }

    await updateUserProfile(updateData);
    setOpen(false);

    setOldPassword("");
    setNewPassword("");
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDeleteUser = async () => {
    await deleteUserProfile();
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              Profile
            </h1>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent mb-6"></div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Manage your account and view your published content
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Profile Information Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-background/50 border-2 border-border/50 rounded-2xl p-8 sticky top-8">
                {loading ? (
                  <div className="space-y-6">
                    <div className="flex flex-col items-center">
                      <Skeleton className="w-32 h-32 rounded-full" />
                      <div className="mt-4 space-y-2 w-full">
                        <Skeleton className="h-6 w-3/4 mx-auto" />
                        <Skeleton className="h-4 w-1/2 mx-auto" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Profile Picture & Basic Info */}
                    <div className="text-center">
                      <div className="relative inline-block mb-6">
                        <img
                          src={user?.profilePicture}
                          alt="profile"
                          className="w-32 h-32 rounded-full object-cover border-4 border-border/50 shadow-lg"
                        />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-4 border-background">
                          <User className="w-4 h-4 text-primary-foreground" />
                        </div>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        {user?.name || "Anonymous User"}
                      </h2>
                      
                      <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{user?.email || "No email available"}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-primary/5 border border-primary/20 rounded-xl">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg mx-auto mb-2">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-2xl font-bold text-foreground">{userPosts.length}</div>
                        <div className="text-sm text-muted-foreground">Posts</div>
                      </div>
                      
                      <div className="text-center p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-500/10 rounded-lg mx-auto mb-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="text-sm text-foreground font-medium">Joined</div>
                        <div className="text-xs text-muted-foreground">
                          {user?.createdAt ? formatDate(user.createdAt) : "Loading..."}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                      {/* Edit Profile */}
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-xl h-12 font-medium shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300">
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit Profile
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] bg-background border-2 border-border/50 rounded-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                              <Settings className="w-6 h-6 text-primary" />
                              Edit Profile
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground">
                              Make changes to your profile information here.
                            </DialogDescription>
                          </DialogHeader>
                          <form className="space-y-6">
                            {/* Profile Picture & Name */}
                            <div className="flex items-center space-x-6">
                              <div className="relative">
                                <Avatar className="w-20 h-20 border-2 border-border/50">
                                  <AvatarImage
                                    src={preview}
                                    alt="Profile picture"
                                    className="w-full h-full object-cover"
                                  />
                                  <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                                    {getNameInitials(user?.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <label
                                  htmlFor="picture"
                                  className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                  <Camera className="w-4 h-4" />
                                  <Input
                                    id="picture"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                  />
                                </label>
                              </div>
                              <div className="flex-1">
                                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                                  Full Name
                                </Label>
                                <Input
                                  id="name"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  className="mt-2 h-12 bg-background/50 border-2 border-border/50 focus:border-primary/50 rounded-xl"
                                />
                              </div>
                            </div>

                            {/* Email (Disabled) */}
                            <div>
                              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                                Email Address
                              </Label>
                              <Input
                                id="email"
                                value={user?.email}
                                disabled
                                className="mt-2 h-12 bg-muted/30 border-2 border-border/30 rounded-xl"
                              />
                            </div>

                            {/* Password Fields */}
                            <div className="space-y-4">
                              <div>
                                <Label className="text-sm font-medium text-foreground">
                                  Current Password (Optional)
                                </Label>
                                <div className="relative mt-2">
                                  <Input
                                    type={showOldPassword ? "text" : "password"}
                                    className="h-12 bg-background/50 border-2 border-border/50 focus:border-primary/50 rounded-xl pr-12"
                                    placeholder="Enter current password"
                                    onChange={(e) => setOldPassword(e.target.value)}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                                  >
                                    {showOldPassword ? (
                                      <Eye className="h-5 w-5" />
                                    ) : (
                                      <EyeOff className="h-5 w-5" />
                                    )}
                                  </button>
                                </div>
                              </div>

                              <div>
                                <Label className="text-sm font-medium text-foreground">
                                  New Password (Optional)
                                </Label>
                                <div className="relative mt-2">
                                  <Input
                                    type={showNewPassword ? "text" : "password"}
                                    className="h-12 bg-background/50 border-2 border-border/50 focus:border-primary/50 rounded-xl pr-12"
                                    placeholder="Enter new password"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                                  >
                                    {showNewPassword ? (
                                      <Eye className="h-5 w-5" />
                                    ) : (
                                      <EyeOff className="h-5 w-5" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>

                            <DialogFooter className="gap-3">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                className="px-6 py-3 border-2 border-border/50 hover:border-border hover:bg-muted/50 rounded-xl transition-all duration-300"
                              >
                                Cancel
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                                    disabled={loading || !hasChanges()}
                                  >
                                    Save Changes
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-background border-2 border-border/50 rounded-2xl">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-2xl font-bold text-foreground">
                                      Confirm Changes
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="text-muted-foreground">
                                      Are you sure you want to update your profile? This action will save all the changes you have made.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter className="gap-3">
                                    <AlertDialogCancel className="px-6 py-3 border-2 border-border/50 hover:border-border hover:bg-muted/50 rounded-xl transition-all duration-300">
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={handleSubmit}
                                      className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                      Update Profile
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>

                      {/* Delete Account */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full border-2 border-red-500/30 text-red-600 hover:bg-red-500/10 hover:border-red-500/50 rounded-xl h-12 font-medium transition-all duration-300"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Account
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-background border-2 border-border/50 rounded-2xl">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl font-bold text-foreground">
                              Delete Account
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-muted-foreground">
                              This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="gap-3">
                            <AlertDialogCancel className="px-6 py-3 border-2 border-border/50 hover:border-border hover:bg-muted/50 rounded-xl transition-all duration-300">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteUser}
                              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                              Delete Account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Blog Posts Section */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Published Posts</h2>
                    <p className="text-sm text-muted-foreground">Your latest blog posts and articles</p>
                  </div>
                </div>

                {/* Posts List */}
                {postLoading ? (
                  <div className="space-y-6">
                    {Array(3)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="bg-background/50 border-2 border-border/50 rounded-2xl p-6 animate-pulse"
                        >
                          <div className="flex gap-6">
                            <div className="flex-1 space-y-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-muted/50 rounded-full"></div>
                                <div className="w-40 h-4 bg-muted/50 rounded"></div>
                              </div>
                              <div className="w-3/4 h-6 bg-muted/50 rounded"></div>
                              <div className="space-y-2">
                                <div className="w-full h-4 bg-muted/50 rounded"></div>
                                <div className="w-2/3 h-4 bg-muted/50 rounded"></div>
                              </div>
                              <div className="w-20 h-6 bg-muted/50 rounded-full"></div>
                            </div>
                            <div className="w-32 h-32 bg-muted/50 rounded-xl"></div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : userPosts.length > 0 ? (
                  <div className="space-y-6">
                    {userPosts.map((post) => (
                      <article
                        key={post._id}
                        className="group bg-background/50 border-2 border-border/50 hover:border-primary/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                      >
                        <div className="flex gap-6">
                          <div className="flex-1 space-y-4">
                            {/* Author Info */}
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage
                                  src={user?.profilePicture}
                                  className="object-cover w-full h-full"
                                />
                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                  {getNameInitials(user?.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{user?.name}</span>
                                <span>•</span>
                                <span>{formatDate(post?.createdAt)}</span>
                              </div>
                            </div>

                            {/* Post Title */}
                            <Link
                              to={`/post/${post._id}`}
                              onClick={ScrollToTop}
                              className="group/title"
                            >
                              <h3 className="text-xl font-bold text-foreground line-clamp-2 leading-tight group-hover/title:text-primary transition-colors duration-300">
                                {post.title}
                              </h3>
                            </Link>

                            {/* Post Excerpt */}
                            <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                              {post.content
                                ? post.content.length > 150
                                  ? post.content.substring(0, 150) + "..."
                                  : post.content
                                : "No description available."}
                            </p>

                            {/* Category */}
                            <Link
                              to={`/category/${post?.category}`}
                              onClick={ScrollToTop}
                            >
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-primary/10 border border-primary/20 text-primary rounded-full hover:bg-primary/20 transition-all duration-300">
                                <Hash className="w-3 h-3" />
                                {post.category}
                              </div>
                            </Link>
                          </div>

                          {/* Post Thumbnail */}
                          <div className="w-32 h-32 overflow-hidden rounded-xl bg-muted/20 flex-shrink-0">
                            <img
                              src={post.thumbnail}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  
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
      </div>
    </div>
  );
};

export default Profile;