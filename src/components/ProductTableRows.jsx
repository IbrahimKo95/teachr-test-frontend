import TableButton from "./TableButton";


export default function ProductTableRows({ products }) {
    return (
        <tbody>
        {!products.isLoading && products.data !== null ? products.data.map((product) => (
                <tr key={product.id}>
                    <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {product.name}
                        </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {product.description}
                        </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {product.price} €
                        </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {product.category.name}
                        </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {new Date(product.created_at).toLocaleDateString("fr-FR")}
                        </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 inline-flex gap-x-4">
                        <TableButton onClick={""} color={"green-500"}>Edit</TableButton>
                        <TableButton onClick={""} color={"secondary"}>Delete</TableButton>
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