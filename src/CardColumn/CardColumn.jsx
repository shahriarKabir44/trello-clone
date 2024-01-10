import React from 'react';
import './CardColumn.css'
import TrelloCard from './TrelloCard/TrelloCard';
function CardColumn({ title, numItems, svgColor }) {
    return (
        <div className='CardColumn'>
            <div className="columnHeader">
                {svgColor && <div className="svgContainer">
                    <svg width="25" height="30" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="25" cy="15" r="15"
                            fill={svgColor} />
                    </svg>
                    <svg width="10" height="30" xmlns="http://www.w3.org/2000/svg">
                        <rect cx="25" cy="15" width={10} height={30}
                            fill={svgColor} />
                    </svg>
                </div>}


                <p>{title}</p>
                <p className="cardCounter">{numItems}</p>
            </div>
            <div className="cardsContainer">
                {(new Array(numItems).fill(0)).map((_, i) => {
                    return <TrelloCard key={i} columnId={title} cardId={i} />
                })}
            </div>
        </div>
    );
}

export default CardColumn;