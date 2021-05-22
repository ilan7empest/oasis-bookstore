const mobileToggle = ({ toggleMenu }) => {
  return (
    <button className='navbar-toggler d-lg-none' onClick={toggleMenu}>
      <span className='navbar-toggler-icon'></span>
    </button>
  );
};

export default mobileToggle;
