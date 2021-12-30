import React, { useEffect, useState } from "react";
import PageTitle from "../../components/Common/PageTitle";
import AddProductArea from "../../components/Products/AddProductArea";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/Product/ProductAction";
import EditProductArea from "../../components/Products/EditProductArea";

function EditProduct() {
  return (
    <div className="add-product-wrapper">
      <PageTitle title="Edit Product" />
      <EditProductArea />
    </div>
  );
}

export default EditProduct;
