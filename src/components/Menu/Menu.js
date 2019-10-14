import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

const menus = [
    {
        name: "Home",
        to: "/",
        exact: true
    },
    {
        name: "Product List",
        to: "/product-list",
        exact: false
    }
];
const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => {
                var active = match ? 'active' : '';
                return (
                    <li className={`nav-item ${active}`}>
                        <Link to={to}>{label}</Link>
                    </li>
                );
            }}
        />
    );
};

class Menu extends Component {
    render() {
        return (
            <div className="navbar">
                <ul className="nav nav-pills nav-fill">{this.showMenus(menus)}</ul>
            </div>
        );
    }
    showMenus = menus => {
        var result = null;
        if (menus.length > 0) {
            result = menus.map((menu, index) => {
                return (
                    <MenuLink className= "nav-item nav-link"
                        key={index}
                        label={menu.name}
                        to={menu.to}
                        exact={menu.active}
                    />
                );
            });
        }
        return result;
    };
}

export default Menu;
