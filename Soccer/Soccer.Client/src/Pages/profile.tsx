import { Edit } from "lucide-react";
import DashboardSidebar from "../Components/dashboards/sidebar";
import { useAuth } from "../Hooks/useAuth";
import { useProfile } from "../Hooks/useProfile";
import { useState } from "react";

export default function ProfilePage() {
    const { user } = useAuth();
    const { profile } = useProfile();
    const [showModal, setShowModal] = useState(false);
    const [first, setFirst] = useState(profile?.firstName);
    const [last, setLast] = useState(profile?.lastName);
    const [imgUrl, setImgUrl] = useState(profile?.profileImage);
    const {updateProfile, removePicture, uploadPicture} = useProfile();

    const handleSave = async () => {
        updateProfile({firstName: first || "", lastName: last || ""}).then();
        if (imgUrl) {
            await uploadPicture(imgUrl).then();
        }
        setShowModal(false);
    };

    const removeAvatar = () => {
        removePicture().then();
        setImgUrl("");
    };

    const onClose = () => {
        setShowModal(false);
    };

    const posts = [
        {
            id: 1,
            date: new Date().toDateString(),
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam."
        }
    ];

    return (
        <div className="flex">
            <div className="w-64 h-screen sticky top-0">
                <DashboardSidebar/>
            </div>
            <div className="flex-1 px-4 py-8 md:px-8 md:py-12">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="bg-white rounded-lg shadow border p-6">
                        <div className="flex flex-col items-center gap-4 md:flex-row">
                            <div className="relative">
                                <img
                                    src={profile?.profileImage}
                                    alt={user?.username}
                                    width={200}
                                    height={200}
                                    className="rounded-full border-4 border-white shadow-md object-cover"
                                />
                            </div>
                            <div className="flex-1 space-y-4 text-center md:text-left">
                                <div>
                                    <h2 className="text-3xl font-bold">{user?.username}</h2>
                                    <div className="mt-2 flex flex-wrap justify-center gap-2 md:justify-start">
                                        {user?.roles.map((role) => (
                                            <span
                                                key={role}
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                            >
                                                {role}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-500">
                                    A {profile?.firstName} {profile?.lastName} that embodies athletic excellence, showcasing determination and championship spirit.
                                </p>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <div key={post.id} className="bg-white rounded-lg shadow border overflow-hidden">
                                    <div className="p-4 border-b">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={profile?.profileImage}
                                                alt={user?.username}
                                                width={40}
                                                height={40}
                                                className="rounded-full object-cover"
                                            />
                                            <div>
                                                <h3 className="text-base font-medium">{user?.username}</h3>
                                                <p className="text-sm text-gray-500">{post.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <p>{post.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 space-y-4">
                        <h2 className="text-xl font-bold">Edit Profile</h2>
                        <input
                            value={first || ""}
                            onChange={(e) => setFirst(e.target.value)}
                            placeholder="First Name"
                            className="w-full border px-2 py-1 rounded"
                        />
                        <input
                            value={last || ""}
                            onChange={(e) => setLast(e.target.value)}
                            placeholder="Last Name"
                            className="w-full border px-2 py-1 rounded"
                        />
                        <input type="text"
                            placeholder="https://cdn.com/avatar.jpg"
                            value={imgUrl || "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?t=st=1742582408~exp=1742586008~hmac=0bf2fb65f0cc0df4a0b903c1832dbf8fd63160e829d6488536e3a4866d2302cf&w=1060"}
                            onChange={(e) => setImgUrl(e.target.value)}
                        className="w-full border px-2 py-1 rounded"/>
                        <div className="flex justify-between items-center pt-2">
                            <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save
                            </button>
                            <button onClick={removeAvatar} className="text-red-500 text-sm">Remove Picture</button>
                        </div>
                        <button onClick={onClose} className="text-sm text-gray-500 hover:underline">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}