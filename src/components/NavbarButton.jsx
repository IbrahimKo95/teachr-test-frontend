import {Link} from "react-router-dom";


export default function NavbarButton({text, color, destination}) {
    return (
        <Link className={`${color} text-sm px-8 py-2 text-white font-bold rounded-l-full rounded-r-full`} to={destination}>{text}</Link>
    );
}