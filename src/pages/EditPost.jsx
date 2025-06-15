import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { usePost } from "@/context/postContext";
import { ImagePlus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const EditPost = () => {
  const { post, fetchPost, updatePost, loading } = usePost();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setTitle("");
      setContent("");
      setCategory("");
      setImage(null);
      setThumbnail(null);

      fetchPost(id);
    }
  }, [id]);

  useEffect(() => {
    if (post && post._id === id) {
      setTitle(post.title || "");
      setContent(post.content || "");
      setCategory(post.category || "");
      setImage(post.thumbnail || null);
    }
  }, [post, id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      await updatePost(post._id, formData);
      navigate("/myposts");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="size-14 rounded-full border-8 border-gray-300 border-r-blue-800 animate-spin"></div>
      </div>
    );
  }

  // if (post && post._id !== id) {
  //   return <Navigate to="*" />;
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100  py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Edit Blog Post
            </h1>
            <p className="text-gray-600 ">Update your blog post content</p>
          </div>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-lg font-medium text-gray-700"
              >
                Blog Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter an engaging title for your blog post..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg p-4 border-2 focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="category"
                className="text-lg font-medium text-gray-700 "
              >
                Category
              </Label>
              <Select onValueChange={setCategory} value={category} required>
                <SelectTrigger className="p-4 border-2 focus:border-blue-500">
                  <SelectValue placeholder="Choose a category for your post" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="AI">Artificial Intelligence</SelectItem>
                    <SelectItem value="Coding">Programming & Coding</SelectItem>
                    <SelectItem value="Else">Something Else</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-medium text-gray-700 ">
                Cover Image
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                <Label
                  htmlFor="cover-image"
                  className="flex cursor-pointer flex-col items-center justify-center"
                >
                  {image ? (
                    <div className="relative w-full max-w-md">
                      <button
                        type="button"
                        onClick={() => {
                          setImage(null);
                          setThumbnail(null);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors z-10"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <img
                        src={image}
                        alt="Cover Preview"
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <ImagePlus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <span className="text-lg font-medium text-gray-700  block">
                        Upload Cover Image
                      </span>
                      <span className="text-sm text-gray-500 mt-1">
                        PNG, JPG, GIF
                      </span>
                    </div>
                  )}
                  <input
                    id="cover-image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="content"
                className="text-lg font-medium text-gray-700"
              >
                Blog Content
              </Label>
              <Textarea
                id="content"
                placeholder="Write your blog content here... Share your ideas, experiences, and insights with your readers."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[300px] text-base p-4 border-2 focus:border-blue-500 transition-colors resize-none"
                required
              />
              <div className="text-right text-sm text-gray-500">
                {content.length} characters
              </div>
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Updating...
                  </div>
                ) : (
                  "Update Post"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
