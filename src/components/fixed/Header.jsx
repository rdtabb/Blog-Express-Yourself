const Header = ({ handleToggle }) => {
  return (
    <header className="header">
      <h1 className="header__heading">
        Expressive
      </h1>
      <button onClick={handleToggle} class="button-three" aria-controls="primary-navigation" aria-expanded="false">
        <svg stroke="var(--button-color)" fill="none" class="hamburger" viewBox="-10 -10 120 120" width="45">
          <path class="line" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" d="m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70">
          </path>
        </svg>
      </button>
    </header>
  );
};

export default Header;
