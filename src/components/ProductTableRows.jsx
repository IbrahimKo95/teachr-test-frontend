import TableButton from "./TableButton";


export default function ProductTableRows({ products, openDialog }) {

    return (
        <tbody>
        {!products.isLoading && products.data !== null ? products.data.map((product) => (
                <tr key={product.id}>
                    <td className="p-4 border-b border-blue-gray-50">
                        <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {product.name}
                        </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                        <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900 truncate max-w-52 2xl:max-w-96">
                            {product.description}
                        </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                        <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {product.price} €
                        </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                        <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {product.category.name}
                        </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                        <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {new Date(product.created_at).toLocaleDateString("fr-FR")}
                        </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 inline-flex gap-x-4">
                        <TableButton onClickAction={() => openDialog("edit", product)} color={"bg-green-500"}>Modifier</TableButton>
                        <TableButton onClickAction={() => openDialog("delete", product)} color={"bg-secondary"}>Supprimer</TableButton>
                    </td>
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