import React from 'react';
import faker from 'faker';
import SocialCard from './component/SocialCard';

export default class App extends React.Component {
  constructor(){
    super();
    let cards = [];
    for(let i = 0; i < 10; i++){
      cards.push(
        {
          id: i,
          cardName: faker.company.companyName(),
          avatarImage: faker.image.avatar(),
          cardDescription: faker.lorem.paragraph(),
          cardImage: `${faker.image.imageUrl()}?random=${Date.now()+i}`
        }
      );
    }
    this.state = {cards};
  }
  renderCards = () =>{
    return this.state.cards.map(card => {
      return <SocialCard key={card.id} card={card}/>;
    });
  }

  render() {
    return (
      <div className="ui container">
        {this.renderCards()}
      </div>
    )
  }
}
