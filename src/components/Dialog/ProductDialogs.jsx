import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import {OctagonAlertIcon} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {createProduct, deleteProduct, updateProduct} from "../../redux/productSlicer";
import {useEffect, useState} from "react";
import {fetchCategory} from "../../redux/categorySlicer";

export function CreateProductDialog({open, close}) {
    const categories = useSelector(state => state.category)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState()
    const [category, setCategory] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCategory())
    }, []);

    function handleSubmit(event) {
        event.preventDefault()
        const product = {
            name: name,
            description: description,
            price: price,
            category_id: category,
        }
        dispatch(createProduct({product: product}))
        close('create')
    }

    return (
        <Dialog open={open} onClose={() => close('create')} className="relative z-10">
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"/>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                        Ajouter un produit
                                    </DialogTitle>
                                    <form className="mt-2 flex flex-col gap-y-4" onSubmit={handleSubmit}>
                                        <div>
                                            <label>Nom</label>
                                            <input onChange={(e) => setName(e.target.value)} className="w-full bg-gray-200 h-10 px-2"
                                                   required={true}/>
                                        </div>
                                        <div>
                                            <label>Prix</label>
                                            <input onChange={(e) => setPrice(e.target.valueAsNumber)} className="w-full bg-gray-200 h-10 px-2" type="number" required={true}/>
                                        </div>
                                        <div>
                                            <label>Catégorie</label>
                                            <select value={category} onChange={(e) => setCategory(e.currentTarget.value)} className="w-full bg-gray-200 h-10 px-2" required={true}>
                                                <option value="" disabled={category === ""}>Choisir une catégorie</option>
                                                {
                                                    !categories.isLoading && categories.data !== null ? categories.data.map((category) => (
                                                        <option key={category.id} value={category.id}>{category.name}</option>
                                                    )) : null
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            <label>Description</label>
                                            <textarea onChange={(e) => setDescription(e.target.value)} className="w-full bg-gray-200 p-2" rows={5} required={true}></textarea>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button type="submit"
                                                    className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75 sm:ml-3 sm:w-auto">
                                                Ajouter
                                            </button>
                                            <button onClick={() => close('create')} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                                Annuler
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export function EditProductDialog({open, close, product}) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState()
    const [category, setCategory] = useState()
    const dispatch = useDispatch()
    const categories = useSelector(state => state.category)
    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category.id);
            dispatch(fetchCategory())
        }
    }, [product]);

    if (!product) {
        return null;
    }
    function handleSubmit(event) {
        event.preventDefault()
        const updatedProduct = {
            name: name,
            description: description,
            price: price,
            category_id: category,
            created_at: product.created_at
        }
        dispatch(updateProduct({id: product.id, product: updatedProduct}))
        close('edit')
    }

    return (
        <Dialog open={open} onClose={() => close('edit')} className="relative z-10">
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"/>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                        Modifier un produit
                                    </DialogTitle>
                                    <form className="mt-2 flex flex-col gap-y-4" onSubmit={handleSubmit}>
                                        <div>
                                            <label>Nom</label>
                                            <input onChange={(e) => setName(e.target.value)} className="w-full bg-gray-200 h-10 px-2" defaultValue={product.name}
                                                   required={true}/>
                                        </div>
                                        <div>
                                            <label>Prix</label>
                                            <input onChange={(e) => setPrice(e.target.valueAsNumber)} className="w-full bg-gray-200 h-10 px-2" defaultValue={product.price} required={true}
                                                   type="number"/>
                                        </div>
                                        <div>
                                            <label>Catégorie</label>
                                            <select onChange={(e) => setCategory(e.currentTarget.value)} className="w-full bg-gray-200 h-10 px-2" required={true}>
                                                <option value={product.category.id}>{product.category.name}</option>
                                                {
                                                    !categories.isLoading && categories.data !== null ? categories.data.filter((category) => category.id !== product.category.id).map((category) => (
                                                        <option key={category.id} value={category.id}>{category.name}</option>
                                                    )) : null
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            <label>Description</label>
                                            <textarea onChange={(e) => setDescription(e.target.value)} className="w-full bg-gray-200 p-2" rows={5} defaultValue={product.description} required={true}></textarea>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button type="submit"
                                                    className="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75 sm:ml-3 sm:w-auto">
                                                Modifier
                                            </button>
                                            <button onClick={() => close('edit')} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                                Annuler
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export function DeleteProductDialog({open, close, product}) {
    const dispatch = useDispatch()
    const products = useSelector(state => state.product)

    function deleteFunction() {
        dispatch(deleteProduct(product.id))
        close('delete')
    }

    if (!product) {
        return null;
    }
    return (
        <Dialog open={open} onClose={() => close('delete')} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                    <OctagonAlertIcon color={"#f87171"}/>
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                        Supprimer le produit {product.name}
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Etes vous sûr de vouloir supprimer ce produit ? Toutes les données seront perdues.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button onClick={() => deleteFunction()} type="button" className="inline-flex w-full justify-center rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75 sm:ml-3 sm:w-auto">
                                Supprimer
                            </button>
                            <button onClick={() => close('delete')} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                Annuler
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

