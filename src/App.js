import {Card} from "./components/Card/Card";
import {Header} from "./components/Header";
import {Drawer} from "./components/Drawer";

const sneakers = [
    {name: "Мужские Кроссовки Nike Blazer Mid Suede", price: 12999, imageUrl: "/img/sneakers/1.jpg"},
    {name: "Мужские Кроссовки Nike Air Max 270", price: 12959, imageUrl: "/img/sneakers/2.jpg"},
    {name: "Мужские Кроссовки Nike Blazer Mid Suede", price: 1599, imageUrl: "/img/sneakers/3.jpg"},
    {name: "Кроссовки Puma X Aka Boku Future Rider", price: 1539, imageUrl: "/img/sneakers/4.jpg"},
    {name: "Мужские Кроссовки Under Armour Curry 8", price: 1259, imageUrl: "/img/sneakers/3.jpg"},
]

function App() {
  return (
    <div className="wrapper clear">
        <Drawer/>
        <Header/>
        <div className="content p-40">
            <div className="d-flex justify-between align-center mb-40">
                <h1>Все кроссовки</h1>
                <div className="search-block">
                    <img src="/img/search.svg" alt="search"/>
                    <input placeholder="Поиск..."/>
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {
                    sneakers.map((obj, i) =>
                        <Card name={obj.name} price={obj.price} imageUrl={obj.imageUrl} key={i}/>)
                }
            </div>
        </div>
    </div>
  );
}

export default App;
