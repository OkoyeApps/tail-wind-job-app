import React, { useState } from "react";
import styles from './styles.module.css';

const Navbar = () => {

    const [hide, setHide] = useState(false);

    const handleHide = () => {
        setHide(!hide);
    };

    return (
        <>
            <nav className={`w-full h-9 sticky top-0 left-0 flex items-center px-10 justify-between z-50 bg-white py-5`}>
                <div className="flex">
                    <div className={styles.menuBar} onClick={handleHide}>
                        <span className={styles.menuSpan}></span>
                        <span className={styles.menuSpan}></span>
                        <span className={styles.menuSpan}></span>
                    </div>
                    <p className={`uppercase text-blue-400 font-bold ${styles.logo}`}>health explore</p></div>
                <ul className={`flex items-center  justify-between w-9 font-bold ${styles.nav_ul_1}`} id="nav_ul_1">
                    <li className="uppercase text-black">profile</li>
                    <li className="uppercase text-black">jobs</li>
                    <li className="uppercase text-black">professional network</li>
                    <li className="uppercase text-black">lounge</li>
                    <li className="uppercase text-black">salary</li>
                </ul>
                <ul className={`flex items-center flex justify-between ${styles.nav_ul_2}`}>
                    <button className={`uppercase text text-blue-400 mr-5 border-solid ${styles.nav_btn}`}>create job</button>
                    <div className={styles.nav_profile}>
                        <div className={styles.nav_profile_reminder}></div>
                    </div>
                    <li className="uppercase text-black font-bold">logout</li>
                </ul>
                <div className={styles.nav_profile2}>
                    <div className={styles.nav_profile_reminder}></div>
                </div>

            </nav>
            <div style={{ height: hide ? '200px' : "0px" }} className={styles.navDrop}>
                <ul className={styles.navDrop_list}>
                    <li className="uppercase text-black my-3">profile</li>
                    <li className="uppercase text-black my-3">jobs</li>
                    <li className="uppercase text-black my-3">professional network</li>
                    <li className="uppercase text-black my-3">lounge</li>
                    <li className="uppercase text-black my-3 ">salary</li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;