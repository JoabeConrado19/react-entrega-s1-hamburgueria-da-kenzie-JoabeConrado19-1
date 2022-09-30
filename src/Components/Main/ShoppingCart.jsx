import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";


const ShoppingCart = (props) => {


  
  
  function Incrementar(element, index){
    
    props.setCartTotal(props.cartTotal + element.price)
    element.Quantidade = element.Quantidade + 1

    

  }
  function Decrementar(element){

      props.setCartTotal(props.cartTotal - element.price)
    props.SetCartQnt(props.CartQnt - 1)
    element.Quantidade = element.Quantidade - 1

  }

    function ExcluirTudo(){
        props.setCurrentSale([])
        props.setCartTotal(0)
        props.SetCarrinhoVazio(false)
        
    }

    function ExcluirUnico(element){
      if(props.currentSale.length == 1){
        props.SetCarrinhoVazio(false)

      }
      const ListaComRemovido = props.currentSale.filter((item)=>{return item != element })
      props.setCurrentSale(ListaComRemovido)
      props.setCartTotal(props.cartTotal - element.price)
      toast.error('Produto Removido do Carrinho!')
      
      
    }

    useEffect(()=>{
        let soma = 0
        props.currentSale.map(element => {
            soma += element.price
            props.setCartTotal(soma)
            
        })

    },[props.currentSale]);
   

  return (
    <div className="Shopping-Cart">
      <div className="Shopping-Cart-top"> Carrinho de compras</div>
      <div className="Shopping-Cart-bottom">
        
        {<ul>
            
          {props.CarrinhoVazio ? (
          props.currentSale.map((element, index) => (
            
            <li key={index}>
              <div className="Shopping-Cart-img">
                <img src={element.img}></img>
              </div>
              <div className="Shopping-Cart-text">
                <div className="Shopping-Cart-text2">
                  <h4>{element.name}</h4>
                  <span>{element.category}</span>
                </div>
                <div className="Shopping-Cart-counter">
                  <button onClick={()=>{Incrementar(element, index)}}>+</button>{element.Quantidade}<button onClick={()=>{Decrementar(element)}}>-</button>
                </div>
              </div>
              <span onClick={()=>{ExcluirUnico(element)}}>Remover</span>
            </li> 
          ))) : (<div className="NoItem">
            <h4>Sua sacola está vazia</h4>
            <p>Adicione itens</p>
            
            </div>)
            }
        </ul>}
        
        {
            props.CarrinhoVazio ? (<div className="Total">
                <div>
                    <p>Total</p>
                    <span>R$ {parseFloat(props.cartTotal.toFixed(2))}</span>
                </div>
                <button onClick={ExcluirTudo}>Remover Todos</button>
            </div>) : (<></>)
        }
        
        
      </div>
      
    </div>
    
  );
};

export default ShoppingCart;
