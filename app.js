"use strict"

var arrayOfProducts = [];

var leftImage = document.getElementById('left_product');
var midImage = document.getElementById('middle_product');
var rightImage = document.getElementById('right_product');

console.log();

var productsSection = document.getElementById("products");

var trials = 25;

function Product(name, image) {

  this.image = image;
  this.name = name;
  this.url = 'img/' + image;
  this.counter = 0;
  this.timesShown = 0;

  arrayOfProducts.push(this);
}

function renderImages(leftProducts, midProducts, rightProducts) {
  leftImage.setAttribute("src", arrayOfProducts[leftProducts].url);
  midImage.setAttribute("src", arrayOfProducts[midProducts].url);
  rightImage.setAttribute("src", arrayOfProducts[rightProducts].url);

  numberShown(leftProducts, midProducts, rightProducts);
}

function random() {
  var leftRandom = Math.ceil(Math.random() * 19);
  var midRandom = Math.ceil(Math.random() * 19);
  var rightRandom = Math.ceil(Math.random() * 19);

  while(leftRandom === midRandom || midRandom === rightRandom || leftRandom === rightRandom) {
    leftRandom = Math.ceil(Math.random() * 19);
    midRandom = Math.ceil(Math.random() * 19);
    rightRandom = Math.ceil(Math.random() * 19);
  };

  renderImages(leftRandom, midRandom, rightRandom);
}

function numberOfTrials(object) {
  for(let i = 0; i < arrayOfProducts.length; i++) {
    if(arrayOfProducts[i].url === object) {
      arrayOfProducts[i].counter++;
      trials--;
    }
  }
}

function numberShown(leftProducts, midProducts, rightProducts) {
      arrayOfProducts[leftProducts].timesShown++;
      // console.log(arrayOfProducts[leftProducts].timesShown++);
      arrayOfProducts[midProducts].timesShown++;
      // console.log(arrayOfProducts[midProducts].timesShown++);
      arrayOfProducts[rightProducts].timesShown++;
      // console.log(arrayOfProducts[rightProducts].timesShown++);
}

function countProducts(event) {
  var targetId = event.target.id;

  if(trials !== 0) {
    if(targetId === "left_product" || targetId === "middle_product" || targetId === "right_product") {
      var object = event.target.getAttribute("src");
      numberOfTrials(object);
      random();
    }
  } else {
    productsSection.removeEventListener("click", countProducts)
    console.log(arrayOfProducts);
  }
}

new Product("bag", "bag.jpg");
new Product("banana", "banana.jpg");
new Product("bathroom", "bathroom.jpg");
new Product("bubblegum", "bubblegum.jpg");
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
new Product("tauntaun", "tauntaun.jpg");
new Product("unicorn", "unicorn.jpg");
new Product("usb", "usb.gif");
new Product("water-can", "water-can.jpg");
new Product("wine-glass", "wine-glass.jpg");

random();

productsSection.addEventListener("click", countProducts);

var results = document.getElementById("results");
results.addEventListener("click", function() {
  var ul = document.createElement("ul");
  var section = document.getElementById("list_items");

  section.appendChild(ul);
  for(let i = 0; i < 20; i++) {
    var li = document.createElement("li");
    li.textContent = arrayOfProducts[i].name + " / " + "counter: " + arrayOfProducts[i].counter + " / " + "Time shown: " + arrayOfProducts[i].timesShown
    ul.appendChild(li);
}
});

