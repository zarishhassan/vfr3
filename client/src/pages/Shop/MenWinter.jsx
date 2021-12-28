import { useState, useEffect } from "react";
import axios from "axios";
import PageTitle from "../../components/Common/PageTitle";
import Partner from "../../components/Common/Partner";
import Footer from "../../components/Footer/Footer";
import ShopListViewArea from "../../components/Shop/ShopListViewArea";
import QuickView from "../../components/Products/QuickView";

function MenWinter() {
  const [products, setProducts] = useState([]);
  const [menWinter, setMenWinter] = useState([]);
  const [product, setProduct] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const showQuickView = (product) => {
    setIsOpen(true);
    setProduct(product);
  };

  const closeModal = () => {
    setIsOpen(false);
    setProduct({});
  };

  useEffect(() => {
    axios
      .get("/products/")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }, []);

  let menWint = []

  if(products && products.length > 0) {
    products.map(product => {
      if(product.type === "men" && product.category === "winter") {
        menWint.push(product)
        // setMenWestern(product)
      }
    })
  }

  if(menWint.length > 0){
    console.log('MEn West ', menWint);
  }

  return (
    <div className="shop-list-view-wrapper">
      <PageTitle title="Men Winter" />
      {/* {product && product.type === "men" && product.category === "western" && ( */}
        <ShopListViewArea products={menWint} showQuickView={showQuickView} />
      {/* )} */}
      {/* <Partner paddingClass=" pbt-50" /> */}
      <Footer />
      <QuickView isOpen={isOpen} closeModal={closeModal} product={product} />
    </div>
  );
}

export default MenWinter;
