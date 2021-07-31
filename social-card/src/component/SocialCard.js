import React from 'react';

import faker from 'faker';
import './SocialCard.css';

const SocialCard = (props) => {
    return(
        <div className="ui card fluid">
            <div className="content card-header">
                <div className="avatar card-header__image">
                    <img alt="avatar" className="ui avatar image" src={props.card.avatarImage}/>
                </div>
                <div className="card-header__details">
                    <a className="name">{props.card.cardName}</a>
                    <div className="metadata">
                    <span className="date">Today at 5:42PM</span>
                    </div>
                </div>
            </div>
            <div className="content card-description">
                {props.card.cardDescription}
            </div>
            <div className="image card-image">
                <img alt="card-image" src={props.card.cardImage} />
            </div>
            <div className="extra content">
                {faker.helpers.createCard().website}
            </div>
        </div>
    );
}

export default SocialCard;