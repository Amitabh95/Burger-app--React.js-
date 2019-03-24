import React from 'react';

import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
    return (
        <header className={styles.Toolbar}>
            <DrawToggle clicked = {props.drawerToggleClicked}/>
            <div className = {styles.Logo}>
                <Logo />
            </div>
            <nav className = {styles.DesktopOnly}>
                <NavigationItems isAuthenticated = {props.isAuth}/>
            </nav>
        </header>
    );
};

export default toolbar; 