import '../App.css';
import TitleBadge from '../components/TitleBadge';
import Container from '../components/Container';
import {useDispatch, useSelector} from "react-redux";
import {fetchProduct} from "../redux/productSlicer";
import {useEffect} from "react";
import ProductTableRows from "../components/ProductTableRows";
import TableButton from "../components/TableButton";

function Home() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.product)

    useEffect(() => {
        dispatch(fetchProduct())
    }, []);

    return (
        <Container>
            <p className="font-black text-2xl">Liste des <TitleBadge color={"primary"}>Produits</TitleBadge></p>
            <div className="px-[5%] lg:px-[10%] xl:px-[20%] relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white rounded-xl bg-clip-border mt-20">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                    <tr>
                        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Nom
                            </p>
                        </th>
                        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Description
                            </p>
                        </th>
                        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Prix
                            </p>
                        </th>
                        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Catégorie
                            </p>
                        </th>
                        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Date de création
                            </p>
                        </th>
                        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 inline-flex ">
                            <TableButton onClick={""} color={"primary"}>New</TableButton>
                        </th>
                    </tr>
                    </thead>
                    <ProductTableRows products={products}/>
                </table>
            </div>
        </Container>
    );
}

export default Home;
