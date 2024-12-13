import axios from "axios";
import { Upload } from "lucide-react";
import { FC, useState } from "react";
import { toast } from "react-toastify";

// Video Upload Component
const UploadVideo: FC<{
    onClose: () => void
}> = ({ onClose }) => {
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.length) return;
        const file = event.target.files[0] as File;
        setVideoFile(file);
    };

    const handleUpload = async () => {
        setLoading(true)
        try {
            if (!videoFile || !caption) throw new Error('Invalid Inputs')

            const formData = new FormData();

            formData.append('video', videoFile as File);
            formData.append('caption', caption);

            const baseUrl = import.meta.env.VITE_BACKEND_API;
            await axios.post(`${baseUrl}/feed`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("PLAYER_APP_TOKEN") ?? ""
                        }`,
                },
            });

            toast.success("Upload Successful");

            onClose();
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4 flex items-center">
                <Upload className="mr-2" /> Upload Highlight Video
            </h2>

            <input
                type="file"
                accept="video/*"
                onChange={handleFileUpload}
                className="mb-4"
            />

            <textarea
                placeholder="Add a caption for your video"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                rows={3}
            />

            <button
                onClick={handleUpload}
                disabled={loading}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-25"
            >
                {loading ? 'Loading...' : 'Upload Video'}
            </button>
        </div>
    );
};

export default UploadVideo;