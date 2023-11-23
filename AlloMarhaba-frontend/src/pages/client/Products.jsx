import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card";

function Products() {
    const [products, setProducts] = useState([]);
    const { restaurantName } = useParams();

    // get cartItems from localStorage
    useEffect(() => {
        document.title = `Products - ${restaurantName} - AlloMarhaba`;
        // get products from products.json
        fetch("/products.json")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <div className="w-full flex flex-wrap gap-2 justify-center">
                {products.map((product) => (
                    <Card product={product} key={product._id} />
                ))}
            </div>
        </div>
    );
}

export default Products;
