/* eslint-disable @typescript-eslint/no-explicit-any */
import { Newspaper, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { Modal } from 'react-responsive-modal';
import UploadVideo from "./UploadVideo";
import axios from "axios";
import { toast } from "react-toastify";

const Feed = () => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const [feedList, setFeedList] = useState<any[]>([]);

    const fetchFeeds = async () => {
        const baseUrl = import.meta.env.VITE_BACKEND_API
        try {
            const response = await axios.get(`${baseUrl}/feed`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('PLAYER_APP_TOKEN') ?? ''}`

                }
            });

            const { feeds } = response.data;
            setFeedList(feeds)


        } catch (error: any) {
            console.error(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {


        fetchFeeds()
    }, [])

    return (
        <div className="bg-gray-100 p-4">
            <div className="flex flex-row justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center">
                    <Newspaper className="mr-2" /> Feed
                </h2>
                <button onClick={onOpenModal} className="text-xs md:text-base flex gap-2 items-center">
                    <Upload className="w-4" /> Upload Video
                </button>
            </div>

            <div className="space-y-4">
                {feedList.map((feed) => (
                    <div
                        key={feed.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <div className="flex items-center p-3 border-b">
                            <img
                                src={feed.profilePictureUrl}
                                alt={`${feed.userName}'s profile`}
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <span className="font-semibold">{feed.userName}</span>
                        </div>

                        <video
                            controls
                            className="w-full"
                            src={feed.videoUrl}
                        >
                            Your browser does not support the video tag.
                        </video>

                        <div className="p-3">
                            <p className="text-gray-700">{feed.caption}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Modal open={open} onClose={onCloseModal} center>
                <UploadVideo onClose={() => {
                    fetchFeeds()
                    onCloseModal();
                }} />
            </Modal>
        </div>
    );
};

export default Feed;