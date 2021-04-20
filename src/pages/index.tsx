// Single Page Application - Carrega os dados apenas no momento em que o user acessa a app
// useEffect(() => {fetch(localhost).then(response => response.json()).then(data=>console.log(data))}, []) 
// Estratégia ruim para SEO e indexing no Google
// Necessita do JS para carregar a página

// Server-side Rendering - Os dados já estarão disponíveis quando o browser carregar a página
// Em qualquer page, se inserir a função 
// export function getServerSideProps(){
//  const response = await fetch(localhost)
//  const data = await response.json()
//  return { 
//    props: {
//     episodes: data,
//    } 
//  }
// } 
// o NextJS já entendera que ele precisa retornar a página já carregada p o browser
// O props é passado também por parâmetros nos componentes
// É executado toda vez que alguém acessa a home da aplicação


// Static-side Generation - Gera uma versão estática da página para não sobrecarregar as APIs
// Em qualquer page, se inserir a função 
// export function getStaticProps(){
//  const response = await fetch(localhost)
//  const data = await response.json()
//  return { 
//    props: {
//     episodes: data,
//    },
//    revalidate: 60 * 60 * 8, // a cada 8 horas uma nova chamada à página
//  }
// } 
// o NextJS já entendera que ele precisa retornar a página já carregada p o browser
// Só funciona em produção



export default function Home(props) {
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()
  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, // a cada 8 horas uma nova chamada à página
  }
}
