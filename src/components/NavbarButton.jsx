


export default function NavbarButton({text, color}) {
    return (
        <button className={`${color} text-sm px-8 py-2 text-white font-bold rounded-l-full rounded-r-full`}>{text}</button>
    );
}