import logo from '../../assets/logo.svg'

const Header = (props) => {
  return (
    <header>
      <div>
        <img src={logo}></img>
      </div>
      <form>
        <input placeholder="Digitar Pesquisa"></input>
        <button>Pesquisar</button>
      </form>
    </header>
  );
};

export default Header;

