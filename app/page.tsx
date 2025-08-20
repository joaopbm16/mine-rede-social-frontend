import Link from "next/link";

const Index = ()=> {
  return(
   <div>
    <h1>
      Mini Rede Social
    </h1>
    <p>Faça login para continuar</p>
    <input type="email" placeholder="E-mail"></input>
    <input type="password" placeholder="Senha"></input>


    <button>Entrar</button>

    <p>
      Ainda não tem conta? {" "} 
      <Link style={{color: "#19762d"}} href={"/usuarios"}>
      Cadastre-se
      </Link>
    </p>
   </div>
  
  );
};

export default Index