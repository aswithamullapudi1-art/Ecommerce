import React, { useEffect, useState } from 'react'
import '../App.css'
import Template from './Template'
import ShowProduct from './ShowProduct'
import cookies from 'js-cookie'

function Product() {

  const [result, setResult] = useState(null)

  function fetchProduct() {
    // Check cache first
    const cacheData = localStorage.getItem("cache");

    if (cacheData) {
      console.log("from cache", cacheData);
      setResult(JSON.parse(cacheData));
      return;
    }

    // Fetch from API
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(json => {
        setResult(json);
        localStorage.setItem("cache", JSON.stringify(json));
        console.log(json);
      })
      .catch(err => console.error("Error fetching products:", err));
  }

  useEffect(() => {
    fetchProduct();
  }, [])

  // Safe cookie parsing
  const userCookie = cookies.get('user');
  const user = userCookie ? JSON.parse(userCookie) : null;
  const email = user?.email || "Guest";

  if (!result) {
    return (
      <div className="main-content common">
        <p><b><i><u>Welcome! {email}</u></i></b></p>
        <Template />
      </div>
    )
  }

  return (
    <div className="main-content common">
      <p><b><i><u>Welcome! {email}</u></i></b></p>
      <ShowProduct result={result} />
    </div>
  )
}

export default Product;