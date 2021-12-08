import featured1 from "../../../assets/img/featured/featured-1.jpg";
import featured2 from "../../../assets/img/featured/featured-2.jpg";
import featured3 from "../../../assets/img/featured/featured-3.jpg";
import featured9 from "../../../assets/img/featured/featured-9.jpg";
import featured10 from "../../../assets/img/featured/featured-10.jpg";
import featured11 from "../../../assets/img/featured/featured-11.jpg";

function FeaturedArea() {
  return (
    <section className="featured-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="single-featured">
              <img src={featured9} alt="image" />

              <div className="featured-content">
                <span>Featured</span>
                <h3>Discount on Silk Suit</h3>
                <div className="tag">30% Off</div>

                <div className="featured-btn">
                  <a href="#" className="featured-btn-one">
                    View product
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="single-featured">
              <img src={featured10} alt="image" />

              <div className="featured-content">
                <span>Featured</span>
                <h3>
                  New Suit <p> Smart Fitting</p>
                </h3>
                <div className="tag">20% Off</div>

                <div className="featured-btn">
                  <a href="#" className="featured-btn-one">
                    View product
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 offset-lg-0 offset-md-3">
            <div className="single-featured">
              <img src={featured11} alt="image" />

              <div className="featured-content" style={{color: "white"}}>
                <span style={{color: "white"}}>Featured</span>
                <h3 style={{color: "white"}}>Best Price & Great Quality</h3>
                <div className="tag" style={{color: "white"}}>15% Off</div>

                <div className="featured-btn">
                  <a href="#" className="featured-btn-one" style={{color: "white"}}>
                    View product
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedArea;
