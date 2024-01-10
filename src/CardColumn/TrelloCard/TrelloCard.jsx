import React from 'react';
import './TrelloCard.css'
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { PiChatsCircleLight } from "react-icons/pi";
import { IoMdAttach } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";

function TrelloCard(props) {
    return (
        <div className='TrelloCard'>
            <div className="cardHeader">
                <div className="userInfoContainer">
                    <img src="/person.jpeg" alt="" className="userImg" />
                    <p>Abdul Kader</p>
                </div>
                <div className="userInfoContainer">
                    <img src="/person.jpeg" alt="" className="userImg" />
                    <p>Abdul Kader</p>
                </div>

            </div>
            <div className="contentContainer">
                <div className="textContainer">
                    <LayersIcon />
                    <p className='content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className="taskCounter">
                    <AssignmentIcon />
                    <p>1/2</p>
                </div>
            </div>
            <div className="additionalInfoCounter">
                <div className="userContainer">
                    <img src="/person.jpeg" alt="" className="userImg" />
                    <img src="/person.jpeg" alt="" className="userImg" />
                    <p>10+</p>
                </div>
                <div className="counter">
                    <PiChatsCircleLight />
                    <p>20</p>
                </div>
                <div className="counter">
                    <IoMdAttach />
                    <p>5</p>
                </div>
                <div className="counter">
                    <FaCalendarAlt />
                    <p>{(new Date()).toLocaleDateString('en-GB').split('/').join('-')}</p>
                </div>
            </div>
        </div>
    );
}

export default TrelloCard;