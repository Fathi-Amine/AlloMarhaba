import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card";
import axios from "axios";

function Products() {
    const [products, setProducts] = useState([]);
    const { restaurantName } = useParams();

    // get cartItems from localStorage
    useEffect(() => {
        document.title = `Products - ${restaurantName} - AlloMarhaba`;
        // set restaurantName in localStorage
        localStorage.setItem("restaurantName", restaurantName);
        console.log("restaurantName", restaurantName);
        // get products from products.json
        async function getProducts() {
            const { data } = await axios.get(
                `http://localhost:5000/api/client/products/${restaurantName}`
            );
            console.log("data", data);
            setProducts(data.menu);
        }
        getProducts();
    }, []);

    return (
        <div>
            <div className="w-full flex flex-wrap gap-2 justify-center">
                {products &&
                    products.map((product) => (
                        <Card product={product} key={product._id} />
                    ))}
            </div>
        </div>
    );
}

export default Products;