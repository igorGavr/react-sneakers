import {Header} from "./components/Header";
import {Drawer} from "./components/Drawer";
import {useEffect, useState} from "react";
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

function App() {
    const [items, setItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);

    useEffect(() => {
        axios.get('https://6356a1759243cf412f89c342.mockapi.io/pizzas')
            .then(res => setItems(res.data));
        axios.get('https://6356a1759243cf412f89c342.mockapi.io/cart')
            .then(res => setCartItems(res.data));
        axios.get('https://6356a1759243cf412f89c342.mockapi.io/favorites')
            .then(res => setFavorites(res.data));
    }, []);

    const onAddToCart = (obj) => {
        axios.post('https://6356a1759243cf412f89c342.mockapi.io/cart', obj);
        setCartItems([...cartItems, obj]);
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
                        onAddToCart={onAddToCart}/>}>
                </Route>
                <Route path="/favorites" exact element={
                    <Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>}/>
            </Routes>

        </div>
    );
}

export default App;
