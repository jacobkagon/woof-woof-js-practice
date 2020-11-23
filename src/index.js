const URL = "http://localhost:3000/pups";

document.addEventListener("DOMContentLoaded", () => {
  getDog();
});

function getDog() {
  fetch(URL)
    .then((resp) => resp.json())
    .then((dogsArray) => dogsArray.forEach((dog) => renderDog(dog)));
}

function renderDog(dog) {
  let dogBar = document.getElementById("dog-bar");
  let span = document.createElement("span");
  span.innerText = dog.name;
  span.id = dog.id;
  expand(span, dog);
  dogBar.appendChild(span);
}

function expand(element, dog) {
  
    element.addEventListener("click", () => {
    let dogInfo = document.getElementById("dog-info");
    let img = document.createElement("img");

    img.src = dog.image;
    let header = document.createElement("h2");
    header.innerText = dog.name;
    let button = document.createElement("button");
    if (dog.isGoodDog === true) {
      button.innerText = "Good Dog!";
    } else {
      button.innerText = "Bad Dog!";
    }
    updateDog(button, dog.id);

    dogInfo.append(img, header, button);
  });
}

function updateDog(element, dog) {
    
    element.addEventListener("click", (event) => {
    
    let buttonValue = document.getElementsByTagName('button')[1]
    if (buttonValue.innerText == "Good Dog!") {
        buttonValue.isGoodDog = false
    } else {
        buttonValue.isGoodDog = true
    }

    let data = {}
    data.isGoodDog = buttonValue.isGoodDog


    fetch(`${URL}/${dog}`, {
      method: "PATCH",
   headers: { "Content-Type": "application/json" },
     body: JSON.stringify(data),
     }).then(newDog => renderDog(newDog))
    
    });
}


function filterDogs(element, dog) {
    element.addEventListener('click', () => { 
        dog.filter((isGoodDog)=> {
        return dog.isGoodDog === true
        })
    })
    
    
    



}



