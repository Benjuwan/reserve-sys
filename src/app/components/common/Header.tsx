import Link from "next/link";
import { memo } from "react";
import baseStyle from "../../styles/page.module.css";

function Header() {
    return (
        <header className={baseStyle.theHeader}>
            <nav>
                <ul>
                    <li><Link href={'/'}>TOP</Link></li>
                    <li><Link href={'/about'}>使い方について</Link></li>
                </ul>
            </nav>
            <h1>Reservation Rooms</h1>
        </header>
    );
}

export default memo(Header);