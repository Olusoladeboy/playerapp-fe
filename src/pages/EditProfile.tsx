import axios from "axios";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Player } from "./Profile";

type FormInputType = {
    currentTeam: string;
    yearsOfExperience: number;
    profilePicture: string;
    currentPosition: string;
    previousClubs: string;
    achievements: string;
};

const EditProfile: FC<{
    onClose: () => void;
    playerInfo: Player
}> = ({ onClose, playerInfo }) => {
    const {
        register,
        handleSubmit,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        formState: { errors },
    } = useForm<FormInputType>({
        values: {
            currentTeam: playerInfo.currentTeam,
            yearsOfExperience: playerInfo.yearsOfExperience,
            profilePicture: playerInfo.profilePicture,
            currentPosition: playerInfo.currentPosition,
            previousClubs: playerInfo.previousClubs,
            achievements: playerInfo.achievements,
        }
    });

    const onSubmit: SubmitHandler<FormInputType> = async (data) => {
        const baseUrl = import.meta.env.VITE_BACKEND_API;
        try {
            await axios.put(`${baseUrl}/user/`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("PLAYER_APP_TOKEN") ?? ""
                        }`,
                },
            });

            toast.success("Update Successful");

            onClose();
        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        }
    };
    return (
        <>
            <div className="w-full mx-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 md:space-y-6"
                    >


                        <div>
                            <label
                                htmlFor="currentTeam"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Current Team
                            </label>
                            <input
                                {...register("currentTeam")}
                                type="text"
                                name="currentTeam"
                                id="currentTeam"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"


                            />
                        </div>

                        <div>
                            <label
                                htmlFor="yearsOfExperience"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Yeats of Experience
                            </label>
                            <input
                                {...register("yearsOfExperience")}
                                type="number"
                                name="yearsOfExperience"
                                id="yearsOfExperience"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"


                            />
                        </div>

                        <div>
                            <label
                                htmlFor="profilePicture"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Profile Picture (URL)
                            </label>
                            <input
                                {...register("profilePicture")}
                                type="url"
                                name="profilePicture"
                                id="profilePicture"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"


                            />
                        </div>

                        <div>
                            <label
                                htmlFor="currentPosition"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Current Position
                            </label>
                            <input
                                {...register("currentPosition")}
                                type="text"
                                name="currentPosition"
                                id="currentPosition"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"


                            />
                        </div>

                        <div>
                            <label
                                htmlFor="previousClubs"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Previous Clubs
                            </label>
                            <input
                                {...register("previousClubs")}
                                type="text"
                                name="previousClubs"
                                id="previousClubs"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"


                            />
                        </div>

                        <div>
                            <label
                                htmlFor="achievements"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Achievements
                            </label>
                            <input
                                {...register("achievements")}
                                type="text"
                                name="achievements"
                                id="achievements"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"


                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-black dark:focus:ring-black"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditProfile;
