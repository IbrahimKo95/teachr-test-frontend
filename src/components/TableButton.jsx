


export default function TableButton({ children, color, onClick }) {
    return (
        <button
            className={`block text-sm antialiased font-medium leading-normal text-white bg-${color} px-5 py-1 rounded-r-full rounded-l-full hover:opacity-70`}>
            {children}
        </button>
    )
}