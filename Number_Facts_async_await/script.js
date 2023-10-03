// Part 1: Number Facts with Promises

// Single number fact
const singleNumberFact = async (number) => {
  try {
    const response = await fetch(`http://numbersapi.com/${number}?json`);
    const data = await response.json();
    if (data.text) {
      displayFactOnPage(data.text);
    } else {
      console.error(`No fact available for number: ${number}`);
    }
  } catch (error) {
    console.error("Error fetching the number facts:", error);
  }
};

const multipleNumberFacts = async (numbers) => {
  try {
    const response = await fetch(`http://numbersapi.com/${numbers.join(',')}?json`);
    const data = await response.json();
    for (let num in data) {
      if (data[num].text) {
        displayFactOnPage(data[num].text);
      } else {
        console.error(`No fact available for number: ${num}`);
      }
    }
  } catch (error) {
    console.error("Error fetching the number facts:", error);
  }
};

const fourFactsAboutNumber = async (number) => {
  try {
    let factsSet = new Set();  // Use Set to ensure uniqueness
    while (factsSet.size < 4) {
      const response = await fetch(`http://numbersapi.com/${number}?json`);
      const data = await response.json();
      factsSet.add(data.text);
    }
    factsSet.forEach(fact => {
      displayFactOnPage(fact);
    });
  } catch (error) {
    console.error("Error fetching the four facts:", error);
  }
};

  
  function displayFactOnPage(fact) {
    const p = document.createElement("p");
    p.textContent = fact;
    document.body.appendChild(p);
  }
  