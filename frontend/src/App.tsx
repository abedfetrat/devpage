import {useEffect} from "react";

function App() {
  useEffect(() => {
    const fetchApi = async () => {
      const result = await fetch("api/Pages");
      console.log(await result.text());
    }
    fetchApi();
  });

  return (
    <>
      <h1 className="text-3xl">devpage</h1>
      <button className="btn">Click me!</button>
    </>
  )
}

export default App
