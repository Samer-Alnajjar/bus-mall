"use strict"

var arrayOfProducts = [];
var productsShown = [];
var arrayOfProductsNames = [];
var arrayOfProductsCounters = [];
var arrayOfProductsShown = [];

var leftImage = document.getElementById('left_product');
var midImage = document.getElementById('middle_product');
var rightImage = document.getElementById('right_product');
var productsSection = document.getElementById("products");
var productsCanvas = document.getElementById("products_chart").getContext('2d');
var eraseButton = document.getElementById("erase");


var trials = 25;

function Product(name, image) {

  this.image = image;
  this.name = name;
  this.url = 'img/' + image;
  this.counter = 0;
  this.timesShown = 0;

  //adding the objects inside an array
  arrayOfProducts.push(this);
}

//The storeVotes function is responsible for storing data inside the localStorage.
function storeVotes() {
  localStorage.setItem("votes", JSON.stringify(arrayOfProducts));
  console.log(localStorage);
}

//The eraseVotes function is responsible for erasing the data from the localStorage object.
function eraseVotes() {
  localStorage.clear();

  arrayOfProducts = [];
  arrayOfProductsNames = [];
  arrayOfProductsCounters = [];
  arrayOfProductsShown = [];

  //To reload the page 
  location.reload();
  
  renderChart();

}

// The checkAndRestore function is responsible to check if the localStorage object has any values in it.
function checkAndRestore() {
  
  if (localStorage.length > 0 ) {
    // restore the data from the local storage
    arrayOfProducts = JSON.parse(localStorage.getItem('votes'));
  }
}

function renderImages(leftProducts, midProducts, rightProducts) {
  leftImage.setAttribute("src", arrayOfProducts[leftProducts].url);
  midImage.setAttribute("src", arrayOfProducts[midProducts].url);
  rightImage.setAttribute("src", arrayOfProducts[rightProducts].url);

  numberShown(leftProducts, midProducts, rightProducts);
}

function checkAvaialbilty(index) {

  for (let i = 0; i < productsShown.length; i++) {
    if (productsShown[i] === index) {
      return true;
    }
  }
  return false;
}

function random() {

  do {
    var leftRandom = Math.floor(Math.random() * (arrayOfProducts.length - 1));
    var midRandom = Math.floor(Math.random() * (arrayOfProducts.length - 1));
    var rightRandom = Math.floor(Math.random() * (arrayOfProducts.length - 1));
  } while (leftRandom === midRandom || midRandom === rightRandom || leftRandom === rightRandom || (checkAvaialbilty(leftRandom) || checkAvaialbilty(midRandom) || checkAvaialbilty(rightRandom)));

  if (productsShown.length === 6) {
    for (let i = 0; i < 3; i++) {
      productsShown.shift();
    }
  }

  productsShown.push(leftRandom, midRandom, rightRandom);
  console.log(productsShown);

  renderImages(leftRandom, midRandom, rightRandom);
}

function numberOfTrials(object) {
  for (let i = 0; i < arrayOfProducts.length; i++) {
    if (arrayOfProducts[i].url === object) {
      arrayOfProducts[i].counter++;
      trials--;
    }
  }
}

function numberShown(leftProducts, midProducts, rightProducts) {
  arrayOfProducts[leftProducts].timesShown++;
  arrayOfProducts[midProducts].timesShown++;
  arrayOfProducts[rightProducts].timesShown++;
}

function renderChart() {
  for (let i = 0; i < arrayOfProducts.length; i++) {
    arrayOfProductsNames.push(arrayOfProducts[i].name);
    arrayOfProductsCounters.push(arrayOfProducts[i].counter);
    arrayOfProductsShown.push(arrayOfProducts[i].timesShown);
  }

  var chart = new Chart(productsCanvas, {
    type: 'bar',
    data: {
      labels: arrayOfProductsNames,
      datasets: [
        {
          label: '# of products clicked',
          data: arrayOfProductsCounters,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(180, 140, 255, 0.5)',
            'rgba(150, 100, 25, 0.5)',
            'rgba(190, 40, 160, 0.5)',
            'rgba(240, 12, 50, 0.5)',
            'rgba(24, 100, 150, 0.5)',
            'rgba(185, 120, 170, 0.5)',
            'rgba(40, 70, 50, 0.5)',
            'rgba(175, 40, 250, 0.5)',
            'rgba(40, 175, 220, 0.5)',
            'rgba(100, 200, 75, 0.5)',
            'rgba(50, 200, 125, 0.5)',
            'rgba(80, 125, 120, 0.5)',
            'rgba(70, 70, 70, 0.5)',
            'rgba(100, 100, 100, 0.5)',
            'rgba(200, 200, 200, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(180, 140, 255, 1)',
            'rgba(150, 100, 25, 1)',
            'rgba(190, 40, 160, 1)',
            'rgba(240, 12, 50, 1)',
            'rgba(24, 100, 150, 1)',
            'rgba(185, 120, 170, 1)',
            'rgba(40, 70, 50, 1)',
            'rgba(175, 40, 250, 1)',
            'rgba(40, 175, 220, 1)',
            'rgba(100, 200, 75, 1)',
            'rgba(50, 200, 125, 1)',
            'rgba(80, 125, 120, 1)',
            'rgba(25, 100, 250, 1)',
            'rgba(750, 250, 25, 1)',
            'rgba(160, 60, 250, 1)'
          ],
          borderWidth: 1
        },
        {
          label: '# of products shown',
          data: arrayOfProductsShown,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(180, 140, 255, 0.2)',
            'rgba(150, 100, 25, 0.2)',
            'rgba(190, 40, 160, 0.2)',
            'rgba(240, 12, 50, 0.2)',
            'rgba(24, 100, 150, 0.2)',
            'rgba(185, 120, 170, 0.2)',
            'rgba(40, 70, 50, 0.2)',
            'rgba(175, 40, 250, 0.2)',
            'rgba(40, 175, 220, 0.2)',
            'rgba(100, 200, 75, 0.2)',
            'rgba(50, 200, 125, 0.2)',
            'rgba(80, 125, 120, 0.2)',
            'rgba(25, 100, 250, 0.2)',
            'rgba(750, 250, 25, 0.2)',
            'rgba(160, 60, 250, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(180, 140, 255, 1)',
            'rgba(150, 100, 25, 1)',
            'rgba(190, 40, 160, 1)',
            'rgba(240, 12, 50, 1)',
            'rgba(24, 100, 150, 1)',
            'rgba(185, 120, 170, 1)',
            'rgba(40, 70, 50, 1)',
            'rgba(175, 40, 250, 1)',
            'rgba(40, 175, 220, 1)',
            'rgba(100, 200, 75, 1)',
            'rgba(50, 200, 125, 1)',
            'rgba(80, 125, 120, 1)',
            'rgba(25, 100, 250, 1)',
            'rgba(750, 250, 25, 1)',
            'rgba(160, 60, 250, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function countProducts(event) {
  var targetId = event.target.id;

  if (trials !== 0) {
    if (targetId === "left_product" || targetId === "middle_product" || targetId === "right_product") {
      var object = event.target.getAttribute("src");
      numberOfTrials(object);
      random();
    }
  } else {
    productsSection.removeEventListener("click", countProducts);
    //Storing the each object inside the localStorage
    storeVotes();
    renderChart();
    renderResults();
  }
}

function renderResults() {
  var results = document.getElementById("results");
  results.addEventListener("click", function () {
    var ul = document.createElement("ul");
    var section = document.getElementById("list_items");

    section.appendChild(ul);
    for (let i = 0; i < 20; i++) {
      var li = document.createElement("li");
      li.textContent = arrayOfProducts[i].name + " / " + "counter: " + arrayOfProducts[i].counter + " / " + "Time shown: " + arrayOfProducts[i].timesShown
      ul.appendChild(li);
    }
  });
}

new Product("bag", "bag.jpg");
new Product("banana", "banana.jpg");
new Product("bathroom", "bathroom.jpg");
new Product("boots", "boots.jpg");
new Product("breakfast", "breakfast.jpg");
new Product("bubblegum", "bubblegum.jpg");
new Product("chair", "chair.jpg");
new Product("cthulhu", "cthulhu.jpg");
new Product("dog-duck", "dog-duck.jpg");
new Product("dragon", "dragon.jpg");
new Product("pen", "pen.jpg");
new Product("pet-sweep", "pet-sweep.jpg");
new Product("scissors", "scissors.jpg");
new Product("shark", "shark.jpg");
new Product("sweep", "sweep.png");
new Product("tauntaun", "tauntaun.jpg");
new Product("unicorn", "unicorn.jpg");
new Product("usb", "usb.gif");
new Product("water-can", "water-can.jpg");
new Product("wine-glass", "wine-glass.jpg");

random();


productsSection.addEventListener("click", countProducts);
eraseButton.addEventListener("click", eraseVotes);

checkAndRestore();
