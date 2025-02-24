import axios from "axios";
import { useEffect, useState } from "react";


export default function Home() {

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = axios.get()
    }
  }, [])

  return (
    <>
      <h1>Product List</h1>
      <div className="flex">

      </div>
    </>
  );
}
