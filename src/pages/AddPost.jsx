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
import { ImagePlus, X, FileText, Hash, Image as ImageIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const AddPost = () => {
  const { createPost, loading } = usePost();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file)
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
      await createPost(formData);
      if (!loading) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              Create Post
            </h1>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent mb-6"></div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Share your thoughts and insights with the world
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-12"
          >
            {/* Title Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Post Title</h2>
                  <p className="text-sm text-muted-foreground">Give your post a compelling title</p>
                </div>
              </div>
              <div className="space-y-3">
                <Label
                  htmlFor="title"
                  className="text-lg font-medium text-foreground"
                >
                  Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter your blog title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg p-6 bg-background/50 border-2 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl"
                  required
                />
              </div>
            </section>

            {/* Category Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20">
                  <Hash className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Category</h2>
                  <p className="text-sm text-muted-foreground">Choose the most relevant category</p>
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="category"
                  className="text-lg font-medium text-foreground"
                >
                  Category
                </Label>
                <Select onValueChange={setCategory} required>
                  <SelectTrigger className="p-6 text-lg bg-background/50 border-2 border-border/50 focus:border-primary/50 rounded-xl">
                    <SelectValue placeholder="Select a category for your post" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border/50">
                    <SelectGroup>
                      <SelectLabel className="text-muted-foreground">Available Categories</SelectLabel>
                      <SelectItem value="AI" className="text-lg p-3 focus:bg-primary/10">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          Artificial Intelligence
                        </div>
                      </SelectItem>
                      <SelectItem value="Coding" className="text-lg p-3 focus:bg-primary/10">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          Programming & Coding
                        </div>
                      </SelectItem>
                      <SelectItem value="Else" className="text-lg p-3 focus:bg-primary/10">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          Something Else
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </section>

            {/* Cover Image Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20">
                  <ImageIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Cover Image</h2>
                  <p className="text-sm text-muted-foreground">Add a stunning cover image to attract readers</p>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-lg font-medium text-foreground">
                  Upload Image
                </Label>
                <div className="relative group">
                  <div className="border-2 border-dashed border-border/50 hover:border-primary/50 bg-background/30 rounded-2xl p-8 transition-all duration-300 hover:bg-background/50">
                    <Label
                      htmlFor="cover-image"
                      className="flex cursor-pointer flex-col items-center justify-center min-h-[200px]"
                    >
                      {image ? (
                        <div className="relative w-full max-w-2xl">
                          <button
                            type="button"
                            onClick={() => {
                              setImage(null);
                              setThumbnail(null);
                            }}
                            className="absolute -top-3 -right-3 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full p-2 transition-all duration-300 shadow-lg hover:shadow-xl z-10 group"
                          >
                            <X className="h-5 w-5" />
                          </button>
                          <div className="relative overflow-hidden rounded-xl shadow-lg">
                            <img
                              src={image}
                              alt="Cover Preview"
                              className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                          </div>
                          <div className="mt-4 text-center">
                            <p className="text-sm text-muted-foreground">Click the × to remove image</p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center group-hover:scale-105 transition-transform duration-300">
                          <div className="mb-6">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                              <ImagePlus className="h-10 w-10 text-primary" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <span className="text-xl font-semibold text-foreground block">
                              Upload Cover Image
                            </span>
                            <span className="text-base text-muted-foreground block">
                              PNG, JPG, GIF up to 10MB
                            </span>
                            <div className="mt-4 inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-lg border border-primary/20 hover:bg-primary/20 transition-colors duration-300">
                              <span className="text-sm font-medium">Choose File</span>
                            </div>
                          </div>
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
              </div>
            </section>

            {/* Content Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Content</h2>
                  <p className="text-sm text-muted-foreground">Write your amazing content here</p>
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="content"
                  className="text-lg font-medium text-foreground"
                >
                  Post Content
                </Label>
                <div className="relative">
                  <Textarea
                    id="content"
                    placeholder="Start writing your blog content here... Share your thoughts, insights, and stories."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[400px] text-lg p-6 bg-background/50 border-2 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none rounded-xl leading-relaxed"
                    required
                  />
                  <div className="absolute bottom-4 right-4 text-sm text-muted-foreground bg-background/80 px-3 py-1 rounded-lg border border-border/30">
                    {content.length} characters
                  </div>
                </div>
              </div>
            </section>

            {/* Submit Section */}
            <section className="pt-8 border-t border-border/50">
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="px-8 py-4 text-lg font-medium border-2 border-border/50 hover:border-border hover:bg-muted/50 transition-all duration-300 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25 rounded-xl min-w-[200px]"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Publishing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Publish Post</span>
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
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </div>
                  )}
                </Button>
              </div>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;