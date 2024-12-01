

export default function TitleBadge({color, children}) {
    return (
        <span className={`${color == "primary" ? "from-[#005bcb] to-primary" : color == "secondary" ? "from-secondary to-[#ffb6a3]" : "bg-black"} bg-gradient-to-r  w-auto inline-block p-2 rounded-titleBadge text-white`}>
            {children}
        </span>
    );
}