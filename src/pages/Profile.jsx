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
import { Camera, Eye, EyeOff, Trash2 } from "lucide-react";
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
    <div className="bg-white">
      <div className="container mx-auto px-5 md:px-10 py-4">
        <div className="flex flex-col-reverse md:flex-row gap-14 my-7">
          {/* Blog Section */}
          <div className="basis-[60%]">
            <h1 className="text-xl text-gray-900 mb-7 md:mb-5 border-b pb-4">
              Blogs Published
            </h1>
            {postLoading ? (
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="border-b flex items-start space-x-4 pb-4 mb-4 animate-pulse"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="size-6 bg-gray-200 rounded-full flex-shrink-0"></div>
                        <div className="w-32 h-4 bg-gray-200 rounded"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="w-full max-w-40 h-4 bg-gray-200 rounded"></div>
                        <div className="w-full max-w-56 h-4 bg-gray-200 rounded"></div>
                        <div className="w-12 h-4 bg-gray-200 rounded mt-4"></div>
                      </div>
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 bg-gray-200 rounded-lg flex-shrink-0"></div>
                  </div>
                ))
            ) : userPosts.length > 0 ? (
              userPosts.map((post) => (
                <div
                  key={post._id}
                  className="border-b flex items-start space-x-3 sm:space-x-4 pb-4 mb-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="size-6 flex-shrink-0">
                        <AvatarImage
                          src={user?.profilePicture}
                          className="object-cover w-full h-full"
                        />
                        <AvatarFallback>
                          {getNameInitials(user?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm text-gray-500 truncate">
                        {user?.name} • {formatDate(post?.createdAt)}
                      </p>
                    </div>

                    <Link
                      to={`/post/${post._id}`}
                      onClick={ScrollToTop}
                      className="block mb-2"
                    >
                      <h2 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 line-clamp-2 hover:underline hover:underline-offset-2 leading-tight">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-sm md:text-base text-gray-600 line-clamp-2 sm:line-clamp-3 mb-3 leading-relaxed">
                      {post.content
                        ? post.content.length > 50
                          ? post.content.substring(0, 50) + "..."
                          : post.content
                        : "No description available."}
                    </p>

                    <Link
                      to={`/category/${post?.category}`}
                      onClick={ScrollToTop}
                    >
                      <span className="inline-block bg-gray-100  px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-500 rounded-2xl">
                        {post.category}
                      </span>
                    </Link>
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-25 md:h-25 flex-shrink-0">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-center rounded-3xl bg-gray-100 p-6 max-w-md mx-auto">
                  No blogs published yet
                </p>
              </div>
            )}
          </div>

          <div className="basis-[20%] md:sticky top-28 h-full">
            {loading ? (
              <div className="flex flex-col items-center justify-center md:items-start md:border-l md:px-10">
                <Skeleton className="size-32 rounded-full" />
                <div className="flex flex-col items-center md:items-start space-y-2 mt-4">
                  <Skeleton className="w-32 h-5" />
                  <Skeleton className="w-40 h-5" />
                  <Skeleton className="w-36 h-5" />
                </div>
                <div className="flex flex-col gap-2 items-center md:items-start mt-4">
                  <Skeleton className="w-28 h-5" />
                  <Skeleton className="w-20 h-5" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center md:items-start md:border-l md:px-10">
                <div className="flex items-center space-x-4">
                  <img
                    src={user?.profilePicture}
                    alt="profile"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-center md:items-start space-y-2 mt-4">
                  <h2 className="text-xl md:text-lg font-semibold text-gray-900">
                    {user?.name || "Anonymous User"}
                  </h2>
                  <p className="text-gray-500">
                    {user?.email || "No email available"}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p>{userPosts.length} Blogs</p>
                </div>

                {/* Edit Profile Section */}
                <div className="mt-4">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full sm:w-auto bg-blue-800 hover:bg-blue-700">
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                          Edit Profile
                        </DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here.
                        </DialogDescription>
                      </DialogHeader>
                      <form className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <Avatar className="w-20 h-20">
                              <AvatarImage
                                src={preview}
                                alt="Profile picture"
                                className="w-full h-full object-cover"
                              />
                              <AvatarFallback>
                                {getNameInitials(user?.name)}
                              </AvatarFallback>
                            </Avatar>
                            <label
                              htmlFor="picture"
                              className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
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
                            <Label
                              htmlFor="name"
                              className="text-sm font-medium"
                            >
                              Name
                            </Label>
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email
                          </Label>
                          <Input
                            id="email"
                            value={user?.email}
                            disabled
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            Old password (Optional)
                          </Label>
                          <div className="relative">
                            <Input
                              type={showOldPassword ? "text" : "password"}
                              className="mt-1"
                              onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowOldPassword(!showOldPassword)
                              }
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
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
                          <Label className="text-sm font-medium">
                            New password (Optional)
                          </Label>
                          <div className="relative">
                            <Input
                              type={showNewPassword ? "text" : "password"}
                              className="mt-1"
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                              {showNewPassword ? (
                                <Eye className="h-5 w-5" />
                              ) : (
                                <EyeOff className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </div>
                        <DialogFooter>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                className="w-full sm:w-auto bg-blue-800 hover:bg-blue-700"
                                disabled={loading || !hasChanges()}
                              >
                                Save Changes
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to update your profile?
                                  This action will save the changes you have
                                  made.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleSubmit}
                                  className="bg-blue-800 hover:bg-blue-700"
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Edit Profile Section Ends  */}

                <div className="mt-4">
                  <p className="font-semibold">
                    Joined on{" "}
                    {user?.createdAt
                      ? formatDate(user.createdAt)
                      : "Loading..."}
                  </p>
                </div>
                <div className="mt-7">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div className="flex gap-1 items-center text-red-500 cursor-pointer">
                        <Trash2 size={18} />
                        Delete Account
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteUser}
                          className="bg-blue-800 hover:bg-blue-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
