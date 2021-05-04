import { Grid } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./components/CaraSample";
import { productActions, selectProdctState } from "./redux/product";
import { Card as MuiCard } from "@material-ui/core";
function createArr(val: any) {
  const arr = [];
  for (let i = 0; i < val; i++) {
    arr.push(<Card />);
  }
  return arr;
}
export function ViewProducts() {
  const [a, setA] = useState(15);
  const Arr = useMemo(() => createArr(a), [a]);
  const productState = useSelector(selectProdctState);
  let prdctArr = [];
  if (productState && productState.list && productState.list.length > 0) {
    prdctArr = productState.list.map((e: any) => <Card data={e} />);
  }
  console.log(productState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productActions.listProduct(null));
  }, []);
  return (
    <>
      <Grid container justify="space-around" alignItems="center">
        {/* {Arr.map((e: any) => e)} */}
        {prdctArr}
      </Grid>
    </>
  );
}
