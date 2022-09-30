import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";




const ProductsUl = (props) => {
 

  

  function addToCart2(item) {
    if(props.currentSale.some(elem => elem === item) == false){
      props.setCurrentSale([item, ...props.currentSale]);
      toast.success('Produto Adicionado ao carrinho!')
      props.SetCarrinhoVazio(true)
      console.log(props.currentSale)
      props.SetTotal()
      
    }
    else{
      toast.error('Produto já existe no carrinho!')

    }
    
    console.log(props.CarrinhoVazio)
  }
  return (
    <ul className="Products-ul">
      {props.produtos.map((element, index) => (
        <li key={index}>
          <div className="ProductCart-top">
            <img src={element.img}></img>
          </div>
          <div className="ProductCart-bottom">
            <h2>{element.name}</h2>
            <span>{element.category}</span>
            <p>R$ {element.price}</p>
            <button
              onClick={() => {
               

                    return addToCart2(element);


              }}
            >
              Adicionar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductsUl;
