import "./App.css";
import { useEffect, useState } from "react";
import Header from "./Components/Header/header";
import ProductsUl from "./Components/Main/ProductsUl";
import ShoppingCart from "./Components/Main/ShoppingCart";
import api from "./assets/services/api";
import Loading from "./Components/Loading/loading";
import logo from "./assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentSale, setCurrentSale] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [filtrar, setFiltrar] = useState(false);
  const [CarrinhoVazio, SetCarrinhoVazio] = useState(false);
  const [CartQnt, SetCartQnt] = useState(1);

  function QntToJson() {
    products.forEach((element) => {
      element["Quantidade"] = 1;
    });
  }
  function Fetch() {
    useEffect(() => {
      api
        .get("/products")
        .then((response) => setProducts(response.data))
        .finally(() => setLoading(false), QntToJson(), SetTotal());
    });
  }

  function SetTotal() {
    let soma = 0;
    currentSale.map((element) => {
      soma = soma + element.price * element.Quantidade;
    });

    setCartTotal(soma);
  }

  Fetch();

  return (
    <div className="App">
      <header>
        <div>
          <img src={logo}></img>
        </div>
        <form>
          <input
            placeholder="Digitar Pesquisa"
            value={busca}
            onChange={(event) => {
              setBusca(event.target.value);
              setFilteredProducts(
                products.filter((element) =>
                  element.name
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase())
                )
              );
              console.log(event.target.value);
              console.log(busca);
              setFiltrar(true);
            }}
          ></input>
          <button>Pesquisar</button>
        </form>
      </header>

      <div className="Main-container">
        {loading ? (
          <Loading />
        ) : (
          <div className="Left-container">
            {!filtrar ? (
              <ProductsUl
                setCurrentSale={setCurrentSale}
                currentSale={currentSale}
                produtos={products}
                CarrinhoVazio={CarrinhoVazio}
                SetCarrinhoVazio={SetCarrinhoVazio}
                SetTotal={SetTotal}
              />
            ) : (
              <ProductsUl
                setCurrentSale={setCurrentSale}
                currentSale={currentSale}
                produtos={filteredProducts}
                CarrinhoVazio={CarrinhoVazio}
                SetCarrinhoVazio={SetCarrinhoVazio}
                SetTotal={SetTotal}
              />
            )}
          </div>
        )}

        <div className="Rigth-container">
          <ShoppingCart
            currentSale={currentSale}
            setCurrentSale={setCurrentSale}
            SetCarrinhoVazio={SetCarrinhoVazio}
            CarrinhoVazio={CarrinhoVazio}
            cartTotal={cartTotal}
            setCartTotal={setCartTotal}
            CartQnt={CartQnt}
            SetCartQnt={SetCartQnt}
            SetTotal={SetTotal}
          />
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
