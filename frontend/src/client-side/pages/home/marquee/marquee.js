import React from 'react'
import './marquee.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Marquee() {

    return (
        <div class="stock-ticker">
            <ul>
                <li class="minus">
                    50% Off
                </li>
                <li class="plus">
                    hello
                </li>
                <li class="plus">
                    hello
                </li>
                <li class="minus">
                    hello
                </li>
                <li class="plus">
                    hello
                </li>
                <li class="minus">
                    hello
                </li>
                <li class="plus">
                    hello
                </li>
                <li class="minus">
                    hello
                </li>
            </ul>

            <ul aria-hidden="true">
                <li class="minus">
                    Hello
                </li>
                <li class="plus">
                    hello
                </li>
                <li class="plus">
                    hello
                </li>
                <li class="minus">
                    hello
                </li>
                <li class="plus">
                    hello
                </li>
                <li class="minus">
                    hello
                </li>
                <li class="plus">
                    hello
                </li>
                <li class="minus">
                    hello
                </li>
            </ul>
        </div>
    )
}

export default Marquee