import Chai from "./chai"

function App() {

  const username = "Chai aur code"
  return (
    <>
    <Chai/>
    <h1>Chai Aur React with Vite | Hello My Name Is Mohd Rashid and i'm currently doing diploma in computer engineering from Jamia Millia Islamia  and that's my second year so i have to gain a lot of knowledge related to software engineering because i have a passion to be a software engineer and do a high profile job so, i'm currently learning web development and on it basically React and also made good understanding JavaScript because i face a lot of difficulties in JS in my early days and till i'm little weak in it | {username} </h1>
    </>    
  )
}

export default App

// there is we use the {} for injecting the variable in under return function this is known as "evaluated expresion" means we only write the final outcome of any variable in the {} otherwise if we try to write down js in this then it shows errors because that is not the final outcome.