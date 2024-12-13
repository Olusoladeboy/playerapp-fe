/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Edit, User } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import { toast } from "react-toastify";
import EditProfile from "./EditProfile";

export interface Player {
    currentTeam: string;
    password: string;
    yearsOfExperience: number;
    profilePicture: string;
    updatedAt: string;
    currentPosition: string;
    createdAt: string;
    previousClubs: string;
    email: string;
    id: string;
    name: string;
    achievements: string;
    highlights: string[];
}
const PlayerProfile = () => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [playerInfo, setPlayerInfo] = useState<Player>({
        currentTeam: '',
        password: '',
        yearsOfExperience: 0,
        profilePicture: '',
        updatedAt: '',
        currentPosition: '',
        createdAt: '',
        previousClubs: '',
        email: '',
        id: '',
        name: '',
        achievements: '',
        highlights: [],
    });

    const fetchFeeds = async () => {
        const baseUrl = import.meta.env.VITE_BACKEND_API
        try {
            const response = await axios.get(`${baseUrl}/user/profile`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('PLAYER_APP_TOKEN') ?? ''}`

                }
            });

            const resp = response.data;
            setPlayerInfo(resp)


        } catch (error: any) {
            console.error(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {

        fetchFeeds()
    }, [])
    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
            <div className="flex justify-end">
                <button onClick={onOpenModal} className="text-xs md:text-base flex gap-2 items-center">
                    <Edit className="w-4" /> Edit Profile
                </button>
            </div>
            <div className="flex items-center space-x-4">
                {playerInfo?.profilePicture ? <img
                    src={playerInfo.profilePicture}
                    alt={`${playerInfo?.name} profile`}
                    className="w-24 h-24 rounded-full object-cover"
                /> : <User />}

                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{playerInfo?.name}</h2>
                    <p className="text-gray-600">{playerInfo?.currentPosition}</p>
                    <p className="text-gray-500">Current Club: {playerInfo?.currentTeam}</p>
                </div>
            </div>

            <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">Career Information</h3>
                <div className="space-y-2">
                    <p><strong>Years of Experience:</strong> {playerInfo?.yearsOfExperience} years</p>
                    <p><strong>Previous Clubs:</strong> {playerInfo?.previousClubs}</p>
                    <p><strong>Achievements:</strong> {playerInfo?.achievements}</p>
                </div>
            </div>

            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-3">Recent Highlights</h3>
                <ul className="space-y-2">
                    {playerInfo?.highlights?.length ? playerInfo.highlights.map((highlight, index) => (
                        <li key={index} className="bg-gray-100 p-2 rounded">
                            {highlight}
                        </li>
                    )) : <></>}
                </ul>
            </div>

            <div className="mt-4">
                <h6>My Uploads</h6>

            </div>

            <Modal classNames={{
                modal: 'min-w-[50%]'
            }} open={open} onClose={onCloseModal} center>
                <EditProfile playerInfo={playerInfo} onClose={() => {
                    onCloseModal()
                    fetchFeeds()
                }} />
            </Modal>
        </div >
    );
};


export default PlayerProfile;