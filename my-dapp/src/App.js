import logo from './logo.svg';
import './App.css';
import MetaMaskComponent from "./MetaMaskComponent";
import TicketSaleComponent from "./TicketSaleComponent"; // Import the TicketSaleComponent
import Image1 from "./assets/img/post_1.png";
import Image2 from "./assets/img/chk.jpg";

function App() {
  return (
    <>
      {/* header */}
       <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0 px-4 px-lg-5">
        <a href="index.html" className="navbar-brand d-flex align-items-center">
            <h2 className="m-0 text-primary"><img className="img-fluid me-2" src="img/icon-1.png" alt=""
                    style={{ width: '45px' }} />Eventa</h2>
        </a>
        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-4 py-lg-0">
                <a href="index.html" className="nav-item nav-link active">Home</a>
                <a href="service.html" className="nav-item nav-link">Upcomming Envent</a>
                <a href="roadmap.html" className="nav-item nav-link">Events</a>
            </div>
        </div>
      </nav>


      <div className="container-fluid hero-header bg-light py-5 mb-5" style={{ backgroundImage: `url(${Image2})`, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div className="container py-5">
            <div className="row g-5 align-items-center">
                <div className="col-lg-5">
                    <h1 className="display-4 mb-3 animated slideInDown" style={{ color: 'white', fontWeight: 'bold' }}>Buy tickets of every event</h1>
                    <p className="animated slideInDown" style={{ color: 'white', fontWeight: 'bold' }}>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                        diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo
                        magna dolore erat amet</p>
                    <a href="" className="btn btn-primary py-3 px-4 animated slideInDown">Explore More</a>
                </div>
                <div className="col-lg-7 animated fadeIn">
                    <img className="img-fluid animated pulse infinite" style={{ animationDuration: '6s' }} src={Image2} alt="image" />
                
                </div>
            </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
            <div className="row g-5 align-items-center">
                <div className="col-lg-7 wow fadeInUp" data-wow-delay="0.1s">
                    <img className="img-fluid" src={Image2} alt="" />
                </div>
                <div className="col-lg-5 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="h-100">
                        <h1 className="display-6">About Us</h1>
                        <p className="text-primary fs-5 mb-4">The Most Trusted Cryptocurrency Platform</p>
                        <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos.
                            Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet
                        </p>
                        <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet
                            diam et eos. Clita erat ipsum et lorem et sit.</p>
                        <div className="d-flex align-items-center mb-2">
                            <i className="fa fa-check bg-light text-primary btn-sm-square rounded-circle me-3 fw-bold"></i>
                            <span>Tempor erat elitr rebum at clita</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                            <i className="fa fa-check bg-light text-primary btn-sm-square rounded-circle me-3 fw-bold"></i>
                            <span>Tempor erat elitr rebum at clita</span>
                        </div>
                        <div className="d-flex align-items-center mb-4">
                            <i className="fa fa-check bg-light text-primary btn-sm-square rounded-circle me-3 fw-bold"></i>
                            <span>Tempor erat elitr rebum at clita</span>
                        </div>
                        <a className="btn btn-primary py-3 px-4" href="">Read More</a>
                    </div>
                </div>
            </div>
        </div>
      </div>
      
          <div className="container-xxl bg-light py-5 my-5" style={{ backgroundImage: `url(${Image2})`, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div className="container py-5">
            <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '500px' }}>
                <h1 className="display-6" style={{ color: 'white', fontWeight: 'bold' }}>Services</h1>
                <p className="text-primary fs-5 mb-5" style={{ color: 'white', fontWeight: 'bold' }}>Buy, Sell And Exchange Cryptocurrency</p>
            </div>
            <div className="row g-4">
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="service-item bg-white p-5">
                        <img className="img-fluid mb-4" src="img/icon-7.png" alt="" />
                        <h5 className="mb-3">Currency Wallet</h5>
                        <p>Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo
                            justo</p>
                        <a href="">Read More <i className="fa fa-arrow-right ms-2"></i></a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="service-item bg-white p-5">
                        <img className="img-fluid mb-4" src="img/icon-3.png" alt="" />
                        <h5 className="mb-3">Currency Transaction</h5>
                        <p>Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo
                            justo</p>
                        <a href="">Read More <i className="fa fa-arrow-right ms-2"></i></a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="service-item bg-white p-5">
                        <img className="img-fluid mb-4" src="img/icon-9.png" alt="" />
                        <h5 className="mb-3">Bitcoin Investment</h5>
                        <p>Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo
                            justo</p>
                        <a href="">Read More <i className="fa fa-arrow-right ms-2"></i></a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="service-item bg-white p-5">
                        <img className="img-fluid mb-4" src="img/icon-5.png" alt="" />
                        <h5 className="mb-3">Currency Exchange</h5>
                        <p>Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo
                            justo</p>
                        <a href="">Read More <i className="fa fa-arrow-right ms-2"></i></a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="service-item bg-white p-5">
                        <img className="img-fluid mb-4" src="img/icon-2.png" alt="" />
                        <h5 className="mb-3">Bitcoin Escrow</h5>
                        <p>Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo
                            justo</p>
                        <a href="">Read More <i className="fa fa-arrow-right ms-2"></i></a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="service-item bg-white p-5">
                        <img className="img-fluid mb-4" src="img/icon-8.png" alt="" />
                        <h5 className="mb-3">Token Sale</h5>
                        <p>Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo
                            justo</p>
                        <a href="">Read More <i className="fa fa-arrow-right ms-2"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
      
      {/* footer */}
      <div className="container-fluid bg-light footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s" style={{ backgroundImage: `url(${Image2})`, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div className="container py-5">
            <div className="row g-5">
                <div className="col-md-12" style={{ textAlign:"center" }}>
                    <h1 className="text-primary mb-4"><img className="img-fluid me-2" src="img/icon-1.png" alt=""
                             style={{ width: '45px',textAlign:"center",color: 'white', fontWeight: 'bold' }}/>Buys Tickets</h1>
                    <span style={{ color: 'white', fontWeight: 'bold' }}>Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed
                        stet lorem sit clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum
                        et lorem et sit.</span>
                </div>
            </div>
        </div>

    </div>
    </>
  );
}

export default App;
