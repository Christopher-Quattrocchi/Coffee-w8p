import React from 'react';
import NavBar from './Header.js';
import CartControl from './CartControl.js';
import '../App.css';
import background from '../img/bGround.jpg';
import arabicaImage from "../img/arabica.jpg";
import robustaImage from "../img/robusta.jpg";
import excelsaImage from "../img/excelsa.jpg";
import CoffeeSackDisplay from './CoffeeSackDisplay.js';



function App() {
  const defaultStyle = {
    backgroundImage: `url(${background})`,
    opactiy: "90%",
    color: "#FFFC00",
    fontFamily: ['Deborah Fancy Dress', "sans-serif"],
    fontSize: "150%",
    minHeight: "100%",
    marginBottom: "0%"
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  const coffeeSacks = [
    { name: 'Arabica', image: arabicaImage, inventory: 130 },
    { name: 'Robusta', image: robustaImage, inventory: 130 },
    { name: 'Exelsa', image: excelsaImage, inventory: 130 },
  ];


  return (
    <React.Fragment>
      <link href="https://fonts.cdnfonts.com/css/deborah-fancy-dress" rel="stylesheet"></link>
      <div className="background" style={defaultStyle}>
        <NavBar />
        <CartControl />
        <div style={containerStyle}>
          {coffeeSacks.map(sack => (
            <CoffeeSackDisplay
              key={sack.name}
              name={sack.name}
              image={sack.image}
              inventory={sack.inventory}
            />
          ))}
        </div>

      </div>
    </React.Fragment>
  );
}

export default App;
