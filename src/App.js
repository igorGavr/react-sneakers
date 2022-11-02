import {Card} from "./components/Card/Card";
import {Header} from "./components/Header";
import {Drawer} from "./components/Drawer";
import {useEffect, useState} from "react";
import axios from "axios";

// const sneakers = [
//     {name: "Мужские Кроссовки Nike Blazer Mid Suede", price: 12999, imageUrl: "/img/sneakers/1.jpg"},
//     {name: "Мужские Кроссовки Nike Air Max 270", price: 12959, imageUrl: "/img/sneakers/2.jpg"},
//     {name: "Мужские Кроссовки Nike Blazer Mid Suede", price: 1599, imageUrl: "/img/sneakers/3.jpg"},
//     {name: "Кроссовки Puma X Aka Boku Future Rider", price: 1539, imageUrl: "/img/sneakers/4.jpg"},
//     {name: "Мужские Кроссовки Under Armour Curry 8", price: 1259, imageUrl: "/img/sneakers/3.jpg"},
// ]

function App() {
    const [items, setItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);

    useEffect(() => {
        axios.get('https://6356a1759243cf412f89c342.mockapi.io/pizzas')
            .then(res => setItems(res.data));
    }, []);

    const onAddToCart = (obj) => {
        setCartItems([...cartItems, obj]);
    }
    const onChangeSearchInput = (event) => {
      setSearchValue(event.target.value);
        console.log(event.target.value)
    }

  return (
    <div className="wrapper clear">
        { cartOpened ?
            <Drawer onCloseCart={() => setCartOpened(false)}
                    items={cartItems}
            /> : null
        }
        <Header onClickCart={() => setCartOpened(true)}/>
        <div className="content p-40">
            <div className="d-flex justify-between align-center mb-40">
                {searchValue ? <h1>{`Поиск по: ${searchValue}`}</h1> : <h1>Все кроссовки</h1>}
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="search"/>
                    {searchValue && <img onClick={() => setSearchValue('')}
                        className="clear" src="/img/btn-remove.svg" alt="clear"/>}
                    <input onChange={onChangeSearchInput}  value={searchValue} placeholder="Поиск..."/>
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {items
                    .filter((item) => item.name.toLowerCase().includes(searchValue))
                    .map((obj, i) =>
                        <Card
                            name={obj.name} price={obj.price}
                            imageUrl={obj.imageUrl} key={i}
                            onPlus={(obj) => onAddToCart(obj)}/>)}
            </div>
        </div>
    </div>
  );
}

export default App;
