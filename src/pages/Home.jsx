import '../App.css';
import TitleBadge from '../components/TitleBadge';
import Container from '../components/Container';
import {useDispatch, useSelector} from "react-redux";
import {fetchProduct} from "../redux/productSlicer";
import {useEffect, useState} from "react";
import ProductTableRows from "../components/ProductTableRows";
import TableButton from "../components/TableButton";
import {CreateProductDialog, DeleteProductDialog, EditProductDialog} from "../components/Dialog/ProductDialogs";
import ErrorBanner from "../components/ErrorBanner";

function Home() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.product)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [createDialogOpen, setCreateDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    useEffect(() => {
        dispatch(fetchProduct())
    }, []);

    function openDialog (dialog, product) {
        if (dialog === "create") {
            setCreateDialogOpen(true)
        } else if (dialog === "edit") {
            setSelectedProduct(product)
            setEditDialogOpen(true)
        } else {
            setSelectedProduct(product)
            setDeleteDialogOpen(true)
        }
    }
    function closeDialog (dialog) {
        setSelectedProduct(null)
        if (dialog === "create") {
            setCreateDialogOpen(false)
        } else if (dialog === "edit") {
            setEditDialogOpen(false)
        } else {
            setDeleteDialogOpen(false)
        }
    }

    return (
        <Container>
            <p className="font-black text-2xl">Liste des <TitleBadge color={"primary"}>Produits</TitleBadge></p>
            <div className="px-[5%] lg:px-[10%] xl:px-[20%] relative flex flex-col w-full h-full xl:overflow-hidden overflow-auto text-gray-700 bg-white rounded-xl bg-clip-border mt-20">
                <ErrorBanner/>
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
                            <TableButton onClickAction={() => openDialog("create", null)} color={"bg-primary"}>Ajouter</TableButton>
                        </th>
                    </tr>
                    </thead>
                    <ProductTableRows products={products} openDialog={openDialog}/>
                </table>
            </div>
            <CreateProductDialog open={createDialogOpen} close={(dialog) => closeDialog(dialog)}/>
            <EditProductDialog open={editDialogOpen} close={(dialog) => closeDialog(dialog)} product={selectedProduct}/>
            <DeleteProductDialog open={deleteDialogOpen} close={(dialog) => closeDialog(dialog)} product={selectedProduct}/>
        </Container>
    );
}

export default Home;
