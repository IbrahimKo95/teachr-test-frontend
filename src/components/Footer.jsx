import {Link} from "react-router-dom";


export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 z-20 w-full px-[5%] lg:px-[10%] xl:px-[20%] py-4 bg-background border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6">
        <span className="text-sm sm:text-center text-gray-400">© 2024 <a href="/" className="hover:underline">Teach'r</a>. All Rights Reserved.
    </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-0">
                <li>
                    <Link to={"/"} className="hover:underline me-4 md:me-6">Produits</Link>
                </li>
                <li>
                    <Link to={"/categories"} className="hover:underline me-4 md:me-6">Catégories</Link>
                </li>
            </ul>
        </footer>

    )
}