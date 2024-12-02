import Container from "../components/Container";
import TitleBadge from "../components/TitleBadge";
import TableButton from "../components/TableButton";
import ProductTableRows from "../components/ProductTableRows";


export default function Categories() {
    return (
        <Container>
            <p className="font-black text-2xl">Liste des <TitleBadge color={"secondary"}>Catégories</TitleBadge></p>
        </Container>
    )
}