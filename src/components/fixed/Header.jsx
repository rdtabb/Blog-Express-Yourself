const Header = ( {handleToggle}) => {

  return (
    <header className="header">
      <h1 className="header__heading">
        Expressive
      </h1>
      <button onClick={handleToggle} className="header__toggle" aria-expanded="false">
        <svg stroke="var(--button-color)" fill="none" className="hamburger" viewBox="-10 -10 120 120" width="45">
          <path className="line" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" d="m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70">
          </path>
        </svg>
      </button>
      <svg className="header__logo" width="53" height="54" viewBox="0 0 300 303" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="150" cy="151.5" rx="150" ry="151.5" fill="white"/>
        <path d="M130.967 141.34H192.167L189.277 155.79H128.077L130.967 141.34ZM121.787 194.21H191.317L188.427 209H101.897L125.697 90H209.677L206.787 104.79H139.637L121.787 194.21Z" fill="black"/>
      </svg>
    </header>
  );
};

export default Header;
