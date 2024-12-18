import React from 'react'
import styled from 'styled-components'
import avatar from '../../img/avatar.png'
import { menuItems } from '../../utils/menuItems'
import { signout } from '../../utils/Icons'


function Navigation({active, setActive}) {
    
    return (
        <NavStyled>
            <div className="user-con">
                <img src={avatar} alt="" />
                <div className="text">
                    <h2>Erik</h2>
                    <p>Your Money</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => (
                    <li 
                    key={item.id}
                    onClick={() => setActive(item.id)}
                    className={active === item.id ? "active" : ""}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>
            <div className='bottom-nav'>
                <li>
                    {signout} Sign Out
                </li>
            </div>
        </NavStyled>
    );
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: auto;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;

    /* User container styling */
    .user-con {
        height: 100px;
        display: flex;
        align-items: center;
        gap: 2rem;
        
        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #FCF6F9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06); /* Corrected shadow property */
        }

        .text {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        h2 {
            font-size: 50px; /* Added font size */
            color: rgba(34, 34, 96, .9); /* Adjusted color for better contrast */
        }

        p {
            font-size: 35px; /* Added font size */
            color: rgba(34, 34, 96, .6);
        }
    }

    /* Menu items styling */
    .menu-items {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1 rem;

        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            padding: 0.6rem 0;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.4s ease-in-out;
            color: rgba(34, 34, 96, 0.6);
            padding-left: 1rem;
            position: relative;
            i {
                color: rgba(34, 34, 96, 0.6);
                font-size: 30px; /* Adjusted font size for the icons */
                transition: all 0.4s ease-in-out;
            }
            &:hover {
                background-color: rgba(34, 34, 96, 0.1); /* Optional hover effect */
            }
                

            span {
                font-size: 40px; /* Ensure the span text is styled */
            }   
        }
        .active {
        color: rgba(34, 34, 96, 1);
        i {
            color: rgba(34, 34, 96, 1);   
        }
            &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        } 
    }
    
    

    /* Bottom navigation styling */
    .bottom-nav {
        padding-top: 1rem; /* Optional, add some space above the bottom nav */
        
        li {
            font-size: 40px; /* Adjusted font size for the bottom nav */
            cursor: pointer;
            display: flex;
            align-items: center;
        }
    }
`;

export default Navigation;
