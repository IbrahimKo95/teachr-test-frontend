import TableButton from "./TableButton";
import {useSelector} from "react-redux";


export default function CategoryTableRows({ categories, openDialog }) {
    const {isAuthenticated} = useSelector(state => state.auth)
    return (
        <tbody>
        {!categories.isLoading && categories.data !== null ? categories.data.map((category) => (
                <tr key={category.id}>
                    <td className="p-4 border-b border-blue-gray-50">
                        <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {category.name}
                        </p>
                    </td>
                    {isAuthenticated && (
                    <td className="p-4 border-b border-blue-gray-50 inline-flex gap-x-4">
                        <TableButton onClickAction={() => openDialog("edit", category)} color={"bg-green-500"}>Modifier</TableButton>
                        <TableButton onClickAction={() => openDialog("delete", category)} color={"bg-secondary"}>Supprimer</TableButton>
                    </td>
                    )}
                </tr>
            )) :
            <tr>
                <td colSpan="6" className="p-4 text-center">
                    <div className="w-10 h-10 border-4 mx-auto text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full"></div>
                </td>
            </tr>
        }
        </tbody>
    )
}