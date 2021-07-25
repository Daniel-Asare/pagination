import React,{useState,useEffect} from "react";
import ReactPaginate from "react-paginate";

function App() {
  const [people,setPeople] = useState([])
  const [pageNumber,setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false)

  const getPeople = async ()=>{
    const res = await fetch("https://randomuser.me/api/?page=3&results=60&seed=abc")
    const data = await res.json()
    setPeople(data.results)
    setLoading(true)
    console.log(data.results);
  }

  useEffect(()=>{
    setTimeout(()=>{
      getPeople()
    },3000)
  },[people])




  const userPerPage = 10;
  const pagesVisited = pageNumber * userPerPage;
  const pageCount = Math.ceil(people.length / userPerPage)

 const pageChange = ({selected})=>{
   setPageNumber(selected)
 }

 if(!loading){
   return(
     <div className="massive">
       <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
     </div>
   )
 }
  
  
  return (
    <div className="massive">
    <h1 style={{color:"Black",textAlign:"center",margin:"2rem",fontFamily:"nunito"}}>PAGINATION</h1>
    <div className="container"> 
    {loading && people.slice(pagesVisited, pagesVisited + userPerPage).map((person,index)=>{
    const {email,name,picture} = person
    return(
      <div key={index} className="person-container">
        <img src={picture.large} alt="" className="person-img" />
      <h4>{name.last}</h4>
        <p>{email}</p>
      </div>
    )
   })}
  </div>
  <ReactPaginate
  previousLabel={'prev'}
  nextLabel={"next"}
  pageCount={pageCount}
  onPageChange={pageChange}
  containerClassName={"pagination"}
  previousLinkClassName={"prev-btn"}
  nextLinkClassName={"next-btn"}
  activeClassName={"active-btn"}
  disabledClassName={"disabled"}

  />
  </div>
  );
}

export default App;
