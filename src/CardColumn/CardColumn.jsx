import React from 'react';
import './CardColumn.css'
import TrelloCard from './TrelloCard/TrelloCard';
function CardColumn({ title, numItems }) {
    return (
        <div className='CardColumn'>
            <div className="columnHeader">
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