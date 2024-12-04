import logo from '../assets/images/logo-white.png';
import NavbarButton from './NavbarButton';
import {MenuIcon} from "lucide-react";
import {useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/authSlicer";
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const {isAuthenticated} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    function logoutFunction() {
        dispatch(logout())
    }
    return (
        <nav className="px-[5%] lg:px-[10%] xl:px-[20%] py-5 bg-background flex justify-between items-center">
            <div>
                <img className="w-32" src={logo} alt="logo" />
            </div>
            <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(true)}><MenuIcon color={"white"} size={40}/></button>
            </div>
            <ul className="gap-x-3 items-center hidden lg:flex">
                <li>
                    <NavbarButton text={"PRODUITS"} color={"bg-primary"} destination="/"/>
                </li>
                <li>
                    <NavbarButton text={"CATÉGORIES"} color={"bg-secondary"} destination="/categories"/>
                </li>
                <li>
                    {isAuthenticated ?
                        <button onClick={() => logoutFunction()} className="text-sm px-8 py-2 text-white font-bold rounded-l-full rounded-r-full">DECONNEXION</button>
                        :
                        <Link to={"/login"} className="text-sm px-8 py-2 text-white font-bold rounded-l-full rounded-r-full">CONNEXION</Link>
                    }
                </li>
            </ul>
        </nav>
    );
}