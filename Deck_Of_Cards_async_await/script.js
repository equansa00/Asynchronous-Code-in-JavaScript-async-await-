const cardsContainer = document.getElementById("cardsContainer");

const displayCardImage = (imageUrl) => {
  const cardImg = document.createElement("img");
  cardImg.src = imageUrl;
  cardImg.alt = "Card Image";
  cardImg.style.width = "100px"; // You can adjust the size as needed
  cardsContainer.appendChild(cardImg);
};

// Single card from a newly shuffled deck
// Single card from a newly shuffled deck
const singleCard = async () => {
  try {
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
    const data = await response.json();
    console.log(`${data.cards[0].value} of ${data.cards[0].suit}`);
    displayCardImage(data.cards[0].image);
  } catch (error) {
    console.error("Error fetching the card:", error);
  }
};

// Two cards from the same deck
const twoCardsFromDeck = async () => {
  try {
    const response1 = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
    const data1 = await response1.json();
    console.log(`${data1.cards[0].value} of ${data1.cards[0].suit}`);
    displayCardImage(data1.cards[0].image);

    const response2 = await fetch(`https://deckofcardsapi.com/api/deck/${data1.deck_id}/draw/?count=1`);
    const data2 = await response2.json();
    console.log(`${data2.cards[0].value} of ${data2.cards[0].suit}`);
    displayCardImage(data2.cards[0].image);
  } catch (error) {
    console.error("Error fetching the two cards:", error);
  }
};


