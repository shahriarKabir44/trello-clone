import React from 'react';
import './CardColumn.css'
import TrelloCard from './TrelloCard/TrelloCard';
function CardColumn({ title }) {
    return (
        <div className='CardColumn'>
            <div className="columnHeader">{title}</div>
            <div className="cardsContainer">
                {(new Array(10).fill(0)).map((_, i) => {
                    return <TrelloCard key={i} id={title + '-' + i} />
                })}
            </div>
        </div>
    );
}

export default CardColumn;