import Container from "../components/Container";
import TitleBadge from "../components/TitleBadge";
import TableButton from "../components/TableButton";
import ProductTableRows from "../components/ProductTableRows";
import ErrorBanner from "../components/ErrorBanner";
import {useEffect, useState} from "react";
import {fetchProduct} from "../redux/productSlicer";
import {fetchCategory} from "../redux/categorySlicer";
import {useDispatch, useSelector} from "react-redux";
import CategoryTableRows from "../components/CategoryTableRows";
import {CreateProductDialog, DeleteProductDialog, EditProductDialog} from "../components/Dialog/ProductDialogs";
import {CreateCategoryDialog, DeleteCategoryDialog, EditCategoryDialog} from "../components/Dialog/CategoryDialogs";


export default function Categories() {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.category)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [createDialogOpen, setCreateDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    useEffect(() => {
        dispatch(fetchCategory())
    }, []);

    function openDialog (dialog, category) {
        if (dialog === "create") {
            setCreateDialogOpen(true)
        } else if (dialog === "edit") {
            setSelectedCategory(category)
            setEditDialogOpen(true)
        } else {
            setSelectedCategory(category)
            setDeleteDialogOpen(true)
        }
    }
    function closeDialog (dialog) {
        setSelectedCategory(null)
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
            <p className="font-black text-2xl">Liste des <TitleBadge color={"secondary"}>Catégories</TitleBadge></p>
            <div className="px-[5%] lg:px-[10%] xl:px-[20%] relative flex flex-col w-full h-full xl:overflow-hidden overflow-auto text-gray-700 bg-white rounded-xl bg-clip-border mt-20 items-center">
                <ErrorBanner/>
                <table className="text-left">
                    <thead>
                    <tr>
                        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Nom
                            </p>
                        </th>
                        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 inline-flex">
                            <TableButton onClickAction={() => openDialog("create",null)} color={"bg-primary"}>Ajouter</TableButton>
                        </th>
                    </tr>
                    </thead>
                    <CategoryTableRows categories={categories} openDialog={openDialog}/>
                </table>
            </div>
            <CreateCategoryDialog open={createDialogOpen} close={(dialog) => closeDialog(dialog)}/>
            <DeleteCategoryDialog open={deleteDialogOpen} close={(dialog) => closeDialog(dialog)} category={selectedCategory}/>
            <EditCategoryDialog open={editDialogOpen} close={(dialog) => closeDialog(dialog)} category={selectedCategory}/>
        </Container>
    )
}