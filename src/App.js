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

    useEffect(() => {
        async function fetchData() {
            const cartRes = await axios.get('https://6356a1759243cf412f89c342.mockapi.io/cart');
            const favoritesRes = await axios.get('https://6356a1759243cf412f89c342.mockapi.io/favorites');
            const itemsRes = await axios.get('https://6356a1759243cf412f89c342.mockapi.io/pizzas');
            setIsLoading(false);
            setCartItems(cartRes.data);
            setFavorites(favoritesRes.data);
            setItems(itemsRes.data);
        }
        fetchData();
    }, []);

    const onAddToCart = (obj) => {
        if (cartItems.find((item) => Number(item.id) === Number(obj.id))){
            axios.delete(`https://6356a1759243cf412f89c342.mockapi.io/cart/${obj.id}`);
            setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
        }else {
            axios.post('https://6356a1759243cf412f89c342.mockapi.io/cart', obj);
            setCartItems((prev) => [...prev, obj]);
        }
    }
    const onRemoveItem = (id) => {
        axios.delete(`https://6356a1759243cf412f89c342.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter(item => item.id !== id));
        console.log(id)
    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find((favObj) => favObj.id === obj.id)){
                axios.delete(`https://6356a1759243cf412f89c342.mockapi.io/favorites/${obj.id}`);
                // setFavorites((prev) => prev.filter(item => item.id !== obj.id));
            }else {
                const { data } = await axios.post('https://6356a1759243cf412f89c342.mockapi.io/favorites', obj);
                setFavorites((prev) => [...prev, data]);
            }
        }catch (e) {
            console.error(e);
        }
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
        console.log(event.target.value)
    }

    return (
        <AppContext.Provider value={{ items, cartItems, favorites }}>
            <div className="wrapper clear">
                {cartOpened ?
                    <Drawer items={cartItems}
                            onCloseCart={() => setCartOpened(false)}
                            onRemove={onRemoveItem}
                    /> : null
                }
                <Header onClickCart={() => setCartOpened(true)}/>
                <Routes>
                    <Route path="/" exact element={
                        <Home
                            items={items} searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            onChangeSearchInput={onChangeSearchInput}
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
