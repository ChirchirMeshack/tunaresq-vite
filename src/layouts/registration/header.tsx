import { PATHS } from "config";
import { User, LogOut } from "lucide-react"
import { Link } from "react-router-dom";


const Header = () => {
	// const { isLoggedIn, logout } = useAuth();
	const isLoggedIn = false;
	const handleLogout = () => {
		alert("Logout");
	}

	return (
		<header className="flex justify-between items-center p-4 border-b
                            mx-auto px-4 md:px-12 lg:px-24  py-3 md:py-5 ">
			<div className="flex items-center">
				        {/* Logo and Brand Name */} 
                        <Link to="/" className="">
                            <img
                                src="/TunaresQ logo.svg" // Logo path (unchanged)
                                alt="TunaresQ Logo"
                                width={96}
                                height={96}
                                className="w-1/2 md:w-3/4"
                            />
                        </Link>
			</div>
			<nav>
				{isLoggedIn ? (
					<button onClick={handleLogout} className="text-gray-700 hover:text-gray-900 flex items-center space-x-2">
						 <LogOut className="w-4 h-4" />
                        <span className="font-bold font-inter">Log out</span>
					</button>
				) : (
					<Link to={PATHS.login()} className="text-gray-700 hover:text-gray-900 flex items-center space-x-2">
						<User className="w-4 h-4" />
                        <span className="font-bold font-inter">Log in</span>
					</Link>
				)}
			</nav>
		</header>
	);
};

export default Header; 

