const starGroups = [
  document.querySelectorAll("section:nth-child(1) > div:nth-child(1) svg"),
  document.querySelectorAll("section:nth-child(1) > div:nth-child(2) svg"),
  document.querySelectorAll("section:nth-child(2) > div:nth-child(1) svg"),
  document.querySelectorAll("section:nth-child(2) > div:nth-child(2) svg"),
];

function resetStars(star) {
  for (let j = 0; j < star.length; j++) {
    star[j].style.fill = "transparent";
  }
}

function setupStarClickEvents(starGroup, ratingHolder) {
  for (let i = 0; i < 5; i++) {
    starGroup[i].addEventListener("click", () => {
      resetStars(starGroup);
      for (let j = 4; j >= i; j--) {
        starGroup[j].style.fill = "rgb(255, 234, 0)";
      }
      for (let z = 0; z < 5; z++) {
        const rating = 5 - i;
        ratingHolder[z] = rating;
        break;
      }
      calculateRating(); // Calculer la moyenne après chaque clic sur une étoile
    });
  }
}

const ratings = [[], [], [], []];

setupStarClickEvents(starGroups[0], ratings[0]);
setupStarClickEvents(starGroups[1], ratings[1]);
setupStarClickEvents(starGroups[2], ratings[2]);
setupStarClickEvents(starGroups[3], ratings[3]);

function calculateRating() {
  let totalSum = 0;
  let totalCount = 0;
  // Calculer la somme des notes et le nombre total de notes attribuées
  for (let i = 0; i < ratings.length; i++) {
    for (let j = 0; j < ratings[i].length; j++) {
      totalSum += ratings[i][j];
      totalCount++;
    }
  }

  if (totalCount === 0) {
    container.textContent = "Moyenne : N/A"; // Aucune note attribuée
  } else {
    const average = totalSum / totalCount;
    stars(average);
    return average;
  }
}

function stars(average) {
  const container = document.getElementById("result");
  container.innerHTML = "";

  // Créer un élément div pour entourer les étoiles et le texte du résultat
  const starsContainer = document.createElement("div");

  // Parcourir les notes pour chaque étoile
  for (let i = 0; i < 5; i++) {
    const svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgElement.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    svgElement.setAttribute("viewBox", "0 0 53.867 53.867");
    svgElement.setAttribute("xml:space", "preserve");

    const polygonElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    polygonElement.setAttribute(
      "points",
      "26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182"
    );

    // Remplir l'étoile en jaune si la note est supérieure ou égale à la valeur de l'étoile
    if (average >= 5 - i) {
      polygonElement.style.fill = "rgb(255, 234, 0)";
    }

    svgElement.appendChild(polygonElement);
    starsContainer.appendChild(svgElement);
  }

  // Ajouter starsContainer au container
  container.appendChild(starsContainer);

  // Créer un élément pour afficher le résultat de la moyenne
  const averageText = document.createElement("div");
  averageText.textContent = `Moyenne : ${average.toFixed(2)}`;

  // Ajouter averageText au container
  container.appendChild(averageText);
}
