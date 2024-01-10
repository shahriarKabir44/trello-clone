import React from 'react';
import './CardColumn.css'
import TrelloCard from './TrelloCard/TrelloCard';
function CardColumn(props) {
    return (
        <div>
            <TrelloCard />
        </div>
    );
}

export default CardColumn;