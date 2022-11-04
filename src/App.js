import {Header} from "./components/Header";
import {Drawer} from "./components/Drawer";
import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Favorites} from "./pages/Favorites";

// const sneakers = [
//     {name: "Мужские Кроссовки Nike Blazer Mid Suede", price: 12999, imageUrl: "/img/sneakers/1.jpg"},
//     {name: "Мужские Кроссовки Nike Air Max 270", price: 12959, imageUrl: "/img/sneakers/2.jpg"},
//     {name: "Мужские Кроссовки Nike Blazer Mid Suede", price: 1599, imageUrl: "/img/sneakers/3.jpg"},
//     {name: "Кроссовки Puma X Aka Boku Future Rider", price: 1539, imageUrl: "/img/sneakers/4.jpg"},
//     {name: "Мужские Кроссовки Under Armour Curry 8", price: 1259, imageUrl: "/img/sneakers/3.jpg"},
// ]

export const AppContext = createContext({});

function App() {
    const [items, setItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const BASE_URL = "https://6356a1759243cf412f89c342.mockapi.io";
    useEffect(() => {
        async function fetchData() {
            const cartRes = await axios.get(`${BASE_URL}/cart`);
            const favoritesRes = await axios.get(`${BASE_URL}/favorites`);
            const itemsRes = await axios.get(`${BASE_URL}/sneakers`);
            setIsLoading(false);
            setCartItems(cartRes.data);
            setFavorites(favoritesRes.data);
            setItems(itemsRes.data);
        }
        fetchData().then();
    }, []);

    const onAddToCart = (obj) => {
        try {
            if (cartItems.find((item) => Number(item.id) === Number(obj.id))){
                axios.delete(`${BASE_URL}/cart/${obj.id}`);
                setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
            }else {
                axios.post(`${BASE_URL}/cart`, obj);
                setCartItems((prev) => [...prev, obj]);
                console.log(obj.id)
            }
        }catch (e) {
            console.error(e);
        }
    }
    const onRemoveItem = (id) => {
        axios.delete(`${BASE_URL}/cart/${id}`);
        setCartItems((prev) => prev.filter(item => item.id !== id));
        console.log(id)
    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find((favObj) => favObj.id === obj.id)){
                axios.delete(`${BASE_URL}/favorites/${obj.id}`);
                // setFavorites((prev) => prev.filter(item => item.id !== obj.id));
            }else {
                const { data } = await axios.post(`${BASE_URL}/favorites`, obj);
                setFavorites((prev) => [...prev, data]);
            }
        }catch (e) {
            console.error(e);
        }
    }
    return (
        <AppContext.Provider value={{ items, cartItems, favorites, searchValue, setSearchValue,
                                     setCartOpened }}>
            <div className="wrapper clear">
                {cartOpened ? <Drawer onRemove={onRemoveItem}/> : null}

                <Header/>
                <Routes>
                    <Route path="/" exact element={
                        <Home
                            onAddToFavorite={onAddToFavorite}
                            cartItems={cartItems}
                            isLoading={isLoading}
                            onAddToCart={onAddToCart}/>}>
                    </Route>
                    <Route path="/favorites" exact element={
                        <Favorites onAddToFavorite={onAddToFavorite}/>}/>
                </Routes>

            </div>
        </AppContext.Provider>
    );
}

export default App;
