import { User, LogOut } from "lucide-react"
import { Link } from "react-router-dom";

interface HeaderProps {
     isLoggedIn: boolean;
     logout: () => void;
}

const Header = ({ isLoggedIn, logout }: HeaderProps) => {
	// const { isLoggedIn, logout } = useAuth();

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
					<button onClick={logout} className="text-gray-700 hover:text-gray-900 flex items-center space-x-2">
						 <LogOut className="w-4 h-4" />
                        <span className="font-bold font-inter">Log out</span>
					</button>
				) : (
					<Link to="/login" className="text-gray-700 hover:text-gray-900 flex items-center space-x-2">
						<User className="w-4 h-4" />
                        <span className="font-bold font-inter">Log in</span>
					</Link>
				)}
			</nav>
		</header>
	);
};

export default Header; 

