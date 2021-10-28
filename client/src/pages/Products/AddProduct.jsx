import React, { useEffect, useState } from "react";
import PageTitle from "../../components/Common/PageTitle";
import AddProductArea from "../../components/Products/AddProductArea";
import { useDispatch, useSelector } from 'react-redux'
import {createProduct} from "../../redux/Product/ProductAction"

function AddProduct() {

  const dispatch = useDispatch()

  const productCreateReducer = useSelector(state => state.productCreateReducer)
  const {loading, error, success, product } = productCreateReducer

  useEffect(() => {
    dispatch(createProduct({
    name: "Test",
    description: "Test Description",
    type: "Women",
    price: 100,
    category: "Eastern",
    color: "black",
    total_in_stock: 5
    }))
  }, [dispatch, createProduct])

  if(product) {
    console.log('Product', product);
  }
  
  return (
    <div className="add-product-wrapper">
    <h1>{product && product.color}</h1>
      <PageTitle title="Add Product" />
      <AddProductArea />
    </div>
  );
}

export default AddProduct;
