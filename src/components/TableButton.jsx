


export default function TableButton({ children, color, onClickAction }) {
    return (
        <button onClick={() => onClickAction()}
            className={`block text-sm antialiased font-medium leading-normal text-white ${color} px-5 py-1 rounded-r-full rounded-l-full hover:opacity-70`}>
            {children}
        </button>
    )
}