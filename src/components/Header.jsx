import logo from '../images/rb_2147922105.png';

const Header = () => {
  return (
    <div className="header-section mb-4">
      <img src={logo} alt="Rent Receipt Generator" className="header-logo" />
      <h1 className="header-title">Rent Receipt Generator</h1>
      <p className="header-subtitle">Generate professional rent receipts instantly</p>
    </div>
  );
};

export default Header;
