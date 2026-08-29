import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const categories = [
  { name: 'All', path: '/', image: '/assets/banner1.jpg' },
  { name: 'Mobiles', path: '/mobiles', image: '/assets/NewMobile/1.png' },
  { name: 'Computers', path: '/computers', image: '/assets/Computers/12.jpg' },
  { name: 'Watches', path: '/watches', image: '/assets/Watch/1.png' },
  { name: 'Men', path: '/men', image: '/assets/MenWear/1.jpg' },
  { name: 'Women', path: '/woman', image: '/assets/Woman/1.jpg' },
  { name: 'Furniture', path: '/furnitures', image: '/assets/Furniture/1.jpg' },
  { name: 'AC', path: '/ac', image: '/assets/Ac/1.jpg' },
  { name: 'Fridge', path: '/fridge', image: '/assets/fridge/1.jpg' },
  { name: 'Kitchen', path: '/kitchen', image: '/assets/Kitchen/1.jpg' },
  { name: 'TV', path: '/tv', image: '/assets/TV/1.jpg' },
  { name: 'Speakers', path: '/speakers', image: '/assets/speakers/1.jpg' },
  { name: 'Books', path: '/books', image: '/assets/Books/1.jpg' },
];

const Navbar = () => {
  const { totalQuantity } = useCart();

  return (
    <header className="navbar-section">
      <div className="navSection">
        <Link to="/" className="tittle">
          <h2>E-Mart</h2>
        </Link>

        <div className="search">
          <input type="text" placeholder="Search for products..." />
        </div>

        <div className="user">
          <div className="user-detail">SignIn / SignUp</div>
          <Link to="/cart" className="cart-link">
            <div className="cart">
              Cart<span>{totalQuantity}</span>
            </div>
          </Link>
        </div>
      </div>

      <nav className="subMenu">
        <ul>
          {categories.map((category) => (
            <li key={category.name}>
              <NavLink
                to={category.path}
                end={category.path === '/'}
                className={({ isActive }) =>
                  isActive ? 'category-item active' : 'category-item'
                }
              >
                <span className="category-circle">
                  <img src={category.image} alt={category.name} />
                </span>
                <span className="category-name">{category.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
