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
  span.addEventListener('click', () => dogInfo(dog))
  dogBar.appendChild(span);
}


function dogInfo(dog) {
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
  button.addEventListener('click', () => updateDog( dog.id));
  dogInfo.innerHTML = "";
  dogInfo.append(img, header, button);
}

function updateDog(dog) {
    let buttonValue = document.getElementsByTagName("button")[1];
    if (buttonValue.innerText == "Good Dog!") {
      buttonValue.isGoodDog = false;
    } else {
      buttonValue.isGoodDog = true;
    }

    let data = {};
    data.isGoodDog = buttonValue.isGoodDog;

    fetch(`${URL}/${dog}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((newDog) => dogInfo(newDog));
  };


// function filterDog(dog) {
//   // if toggle is on = good dog
//   // renderDog should only show good dogs
//   // default is off
//   let filterDog = document.getElementsByTagName("button")[0];
//   filterDog.addEventListener("click", () => {
//     let text = "Filter good dogs:";
//     if (filterDog.innerText == `${text} OFF`) {
//       return (filterDog.innerText = `${text} ON`);
//     } else {
//       return (filterDog.innerText = `${text} OFF`);
//     }

//     if (filterDog.innerText == `${text} ON` &&  dog.isGoodDog == true){
//         renderDog(dog)
//     }

//   });
// }
