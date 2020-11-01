import React from 'react'
import amazonlogo from '../resources/amazon.png'
import { MdSearch, MdShoppingBasket, MdMenu } from "react-icons/md";
import { Link } from 'react-router-dom';

function Header({ hanldeAnchor, anchor, numberOfItemsInCart, userName, handleSelectCategoryInNav}) {
    return (
        <nav>
            <ul className="flexCol">
                <li className="logo-li">
                    <div className="anchor-logo">
                        <button className="anchor" onClick={hanldeAnchor}>
                            <MdMenu />
                        </button>
                        <div className="logo-div">
                            <Link to="/">
                                <img src={amazonlogo} className="logo" alt='amazon logo' />
                            </Link>
                        </div>
                    </div>
                </li>
                <li className={`search-box-li`}>
                    <div className="search-box theme-border">
                        <select id="item-category" type="option" className="select-border" onChange={handleSelectCategoryInNav}>
                            <option>All</option>
                            <option>Car</option>
                            <option>Motorbikes</option>
                            <option>Fashion</option>
                        </select>
                        <input type="text" />
                        <button>
                            <MdSearch />
                        </button>
                    </div>
                </li>
                <li className={`sign-in username cursor-pointer ${anchor ? 'display-flex' : 'display-none'}`}>
                    <Link to="/login">
                        <p className="upperText link-style-none">Hello,</p>
                        <h5 className="link-style-none">{userName ? userName : 'Sign In'}</h5>
                    </Link>
                </li>
                <li className={`orders cursor-pointer ${anchor ? 'display-flex' : 'display-none'}`}>
                    <Link to="/login">
                        <p className="upperText link-style-none">Returns</p>
                        <h5 className="link-style-none">& Orders</h5>
                    </Link>
                </li>
                <li className={`orders cursor-pointer ${anchor ? 'display-flex' : 'display-none'}`}>
                    <Link to="/checkout">
                        <p className="upperText link-style-none">Your</p>
                        <h5 className="link-style-none">Prime</h5>
                    </Link>
                </li>
                <li className={`bag cursor-pointer ${anchor ? 'display-flex' : 'display-none'}`}>
                    <Link to="/checkout">
                        <button className="cart cursor-pointer link-style-none">
                            <MdShoppingBasket />
                        </button>
                    </Link>
                </li>
                <li className={`cursor-pointer ${anchor ? 'display-flex' : 'display-none'}`}>
                    <Link to="/checkout">
                        <p>{numberOfItemsInCart}</p>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Header
