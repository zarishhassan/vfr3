import collection1 from "../../assets/img/collection/collection-1.png";
import collection2 from "../../assets/img/collection/collection-2.png";
import collection3 from "../../assets/img/collection/collection-3.jpg";
import collection6 from "../../assets/img/collection/collection-6.jpg";
import {Link} from 'react-router-dom';

function Collection() {
  return (
    <section className="collection-area">
      <div className="container">
        <div className="collection-inner-box">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-6">
              <div className="collection-image">
                <img src={collection3} alt="image" />
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="collection-content">
                <span>New Arrival</span>
                <h3>Best Fabric</h3>
                <p>Collection</p>

                <div className="collection-btn">
                <Link to="/shop" className="default-btn">
                    <i className="flaticon-shopping-cart"></i>
                    Shop Now
                    <span></span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 offset-lg-0 offset-md-3">
              <div className="collection-image">
                <img src={collection6} alt="image" style={{height: "530px"}}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Collection;
