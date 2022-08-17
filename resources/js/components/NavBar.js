import React from "react";
import { MyLink } from "./MyNavigation";

export const NavBar = () => {

    const baseUrl = "";
    const auth = false;

    const Login = () => {
        if(auth) {
            return(                        
                <a className="dropdown-item" href="/logout"
                // onClick="event.preventDefault();
                // document.getElementById('logout-form').submit();"
                >
                Logout
            </a>
            );
        } else {
            return(
                <>
                <li className="nav-item">
                    <a className="dropdown-item" href={baseUrl + "login"}>Login</a>
                </li>
                <li className="nav-item">
                    <a className="dropdown-item" href="register">Register</a>
                </li>
                </>
            )
        }
    }

    return (

        <nav className="navbar navbar-light bg-white shadow-sm">
            <div className="container">

            <a className="navbar-brand" href={baseUrl}>aaaSLHhhh123</a>

            {/* <!-- Collapse button --> */}
            <button className="navbar-toggler toggler-example" type="button" data-toggle="collapse" data-target="#navbarSupportedContent1"
                aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation">
                <span className="dark-blue-text">
                    {/* {{-- <i class="fas fa-bars fa-1x" style="background-image: url('https://mdbootstrap.com/img/svg/hamburger1.svg?color=6a1b9a'); font-size:1.1em"></i> --}} */}
                    Menu
                </span>
            </button>

            {/* <!-- Collapsible content --> */}
            <div className="collapse navbar-collapse dropdown-menu dropdown-menu-right" style={{backgroundColoR:'#c55'}}id="navbarSupportedContent1">

                {/* <!-- Links --> */}
                <ul className="navbar-nav ml-auto">
                    {/* {{-- <li class="nav-item active">
                        <a className="dropdown-item" href="{{ url('/') }}">Home <span class="sr-only">(current)</span></a>
                    </li> --}} */}

                    <li className="nav-item">
                        <MyLink to={"Generals"} type="href" className={"dropdown-item"}>gens</MyLink>
                        <MyLink to={"AnnRounds"} type="href" className={"dropdown-item"}>Anniversary Rounds</MyLink>
                    </li>

                    {/* 
                    <a class="dropdown-item" href="{{ route('speeds') }}">
                        {{ __('Speeds') }}
                    </a>
                    <a class="dropdown-item" href="{{ route('troops') }}">
                        {{ __('Troops') }}
                    </a>
                    <a class="dropdown-item" href="{{ route('accounts') }}">
                        {{ __('Accounts') }}
                    </a>
                    <a class="dropdown-item" href="{{ route('buildings') }}">
                        {{ __('Buildings') }}
                    </a>
                    <a class="dropdown-item" href="{{ route('consumption') }}">
                        {{ __('Consumption') }}
                    </a>
                    <a class="dropdown-item" href="{{ route('helpers') }}">
                        {{ __('Helpers') }}
                    </a>
                    <a class="dropdown-item" href="{{ route('cards') }}">
                        {{ __('Cards') }}
                    </a>
                    <a class="dropdown-item" href="{{ route('overview') }}">
                        {{ __('Overview') }}
                    </a> */}

                    <div className="dropdown-divider"></div>

                    <Login/>

                    {/* <form id="logout-form" action="/logout" method="POST" style="display: none;"> */}
                        {/* @csrf */}
                    {/* </form> */}
                    {/* @endguest */}
            </ul>
                {/* <!-- Links --> */}

            </div>
            {/* <!-- Collapsible content --> */}
            </div>
        </nav>


    )
}