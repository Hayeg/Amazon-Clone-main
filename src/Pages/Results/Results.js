import React, { useEffect, useState } from "react";
import classes from "./Results.module.css";
import LayOut from "../../Component/LayOut/LayOut";

import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Component/Product/ProductCard";
import Loader from "../../Component/Loader/Loader";
const Results = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { categoryName } = useParams();
  console.log(categoryName);
  useEffect(() => {
    setisLoading(true);
    axios.get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setisLoading(false);
        setResults(res.data);
      })
      .catch((err) => {
        setisLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <section>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px" }}>Category / {categoryName}</p>
          <hr />
          <div className={classes.products_container}>
            {results?.map((product) => (
              <ProductCard key={product.id} product={product} renderDesc={false} renderAdd={true} />
            ))}
          </div>
        </section>
      )}
    </LayOut>
  );
};

export default Results;
