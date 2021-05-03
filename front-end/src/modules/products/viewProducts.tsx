import { Grid } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Card from "./components/CaraSample";
import { productActions } from "./redux/product";

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
  console.log(Arr);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productActions.listProduct(null));
  }, []);
  return (
    <>
      <Grid container justify="space-around" alignItems="center">
        {Arr.map((e: any) => e)}
      </Grid>
    </>
  );
}
