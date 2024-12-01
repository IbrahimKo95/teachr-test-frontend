import logo from '../assets/images/logo-white.png';
import NavbarButton from './NavbarButton';
import {MenuIcon} from "lucide-react";
import {useState} from "react";
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
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
                    <NavbarButton text={"PRODUITS"} color={"bg-primary"}/>
                </li>
                <li>
                    <NavbarButton text={"CATÉGORIES"} color={"bg-secondary"}/>
                </li>
            </ul>
        </nav>
    );
}