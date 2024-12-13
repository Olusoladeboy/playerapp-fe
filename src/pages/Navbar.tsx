import { Link, useNavigate } from "react-router";

const Navbar = () => {
    const navigate = useNavigate();
    const onLogout = () => {
        localStorage.removeItem('PLAYER_APP_TOKEN')

        navigate('/login')
    }
    return (
        <div className="w-full flex px-3 md:px-10 py-5 flex-row justify-between items-center">
            <img src="https://playerapp.co/images/newlogo_black_small.png" alt="" />
            <div>
                <nav className="flex flex-row gap-3">
                    <Link to={'/feed'}>Feed</Link>
                    <Link to={'/profile'}>Profile</Link>
                    <a onClick={onLogout}>Logout</a>
                </nav>
            </div>
        </div>
    )
}

export default Navbar;