import { useState } from "react";
import {Heart, MessageSquare, Share, ImageIcon, Plus} from "lucide-react";
import DashboardSidebar from "../Components/dashboards/sidebar.tsx";
import avatar1 from "../Images/avatar1.webp";
import avatar2 from "../Images/default.webp";
import avatar3 from "../Images/avatar3.webp";
import post from "../Images/post.webp";
import post2 from "../Images/post2.webp";
import post3 from "../Images/post3.webp";

export default function FeedPage() {
    const [posts, setPosts] = useState([
        {
            id: 1,
            user: {
                name: "John Doe",
                avatar: avatar1,
            },
            content:
                "Just finished an intense training session with Team Alpha. Everyone is looking sharp for the upcoming tournament!",
            image: post,
            date: "2 hours ago",
            likes: 24,
            comments: 5,
        },
        {
            id: 2,
            user: {
                name: "Jane Smith",
                avatar: avatar2,
            },
            content:
                "Our team just qualified for the national championship! So proud of everyone's hard work and dedication.",
            image: post2,
            date: "1 day ago",
            likes: 42,
            comments: 12,
        },
        {
            id: 3,
            user: {
                name: "Mike Johnson",
                avatar: avatar3,
            },
            content: "New team jerseys just arrived! Can't wait to wear them in our next match.",
            image: post3,
            date: "3 days ago",
            likes: 18,
            comments: 3,
        },
    ]);

    const [newPost, setNewPost] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleCreatePost = () => {
        if (newPost.trim()) {
            const post = {
                id: posts.length + 1,
                user: {
                    name: "John Doe",
                    avatar: "/placeholder.svg?height=40&width=40",
                },
                content: newPost,
                image: null,
                date: "Just now",
                likes: 0,
                comments: 0,
            };

            setPosts([{ ...post, image: post.image || "" }, ...posts]);
            setNewPost("");
            setIsDialogOpen(false);
        }
    };
    return (
        <>
            <div className="flex">
                <div className="w-64 h-screen sticky top-0">
                    <DashboardSidebar/>
                </div>

                <div className="flex-1 p-6">
                    <div className="max-w-2xl mx-auto space-y-6">
                        <div className="flex justify-between">
                            <h2 className="text-2xl font-bold">Feed</h2>
                            <button
                                onClick={() => setIsDialogOpen(true)}
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Plus className="h-4 w-4 mr-2"/>
                                Create Post
                            </button>
                        </div>

                        {posts.map((post) => (
                            <div key={post.id} className="bg-white rounded-lg shadow border overflow-hidden">
                                <div className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={post.user.avatar || "/placeholder.svg"}
                                            alt={post.user.name}
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                        <div>
                                            <div className="font-medium">{post.user.name}</div>
                                            <div className="text-xs text-gray-500">{post.date}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 pt-0">
                                    <p className="mb-4">{post.content}</p>
                                    {post.image && (
                                        <div className="overflow-hidden rounded-md flex justify-center">
                                            <img
                                                src={post.image || "/placeholder.svg"}
                                                alt="Post image"
                                                className="max-h-96 object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="border-t p-4">
                                    <div className="flex w-full justify-between">
                                        <button
                                            className="inline-flex items-center justify-center px-2 py-1 rounded text-sm text-gray-700 hover:bg-gray-100">
                                            <Heart className="h-4 w-4 mr-2"/>
                                            <span>{post.likes}</span>
                                        </button>
                                        <button
                                            className="inline-flex items-center justify-center px-2 py-1 rounded text-sm text-gray-700 hover:bg-gray-100">
                                            <MessageSquare className="h-4 w-4 mr-2"/>
                                            <span>{post.comments}</span>
                                        </button>
                                        <button
                                            className="inline-flex items-center justify-center px-2 py-1 rounded text-sm text-gray-700 hover:bg-gray-100">
                                            <Share className="h-4 w-4 mr-2"/>
                                            <span>Share</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isDialogOpen && (
                <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Create a new post</h3>
                            <button
                                onClick={() => setIsDialogOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ×
                            </button>
                        </div>
                        <div className="space-y-4 pt-4">
                          <textarea
                              placeholder="What's on your mind?"
                              value={newPost}
                              onChange={(e) => setNewPost(e.target.value)}
                              className="w-full min-h-[100px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                            <button
                                className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <ImageIcon className="h-4 w-4 mr-2"/>
                                Add Image
                            </button>
                            <button
                                onClick={handleCreatePost}
                                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}