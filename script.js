const words = [
  "TELLING A CHILD THEY ARE STUPID",
  "CRITICISING A CHILD",
  "ALLOWING CHILDREN TO WATCH DVD’S RATED “18”",
  "SHAKING A CHILD (not a baby)",
  "SENDING A CHILD TO THEIR BEDRROM AS PUNISHMENT",
  "USING “TIME OUT” AS A FORM OF PUNISHMENT",
  "HITTING A CHILD AROUND THE HEAD",
  "SLAPPING A CHILD",
  "TEASING A CHILD ABOUT THEIR PHYSICAL APPEARANCE",
  "IGNORING A CHILD",
  "PARENT DOES NOT CONSIDER THE HEALTH OR QUALITY OF DIET",
  "HOME IN DANGEROUS DISREPAIR – VERY DIRTY AND UNPLEASANT SMELL",
  "CHILD’S CLOTHES ARE WORN DIRTY AND CRUMPLED",
  "CHILD IS DIRTY, RARELY BATHED AND HAS HEAD LICE",
  "CHILD’S ROUTINE HEALTH NEEDS ARE NOT MET",
  "AN 8 YEAR OLD IS LEFT TO BABYSIT A 3 YEAR OLD",
  "MAKING A CHILD FINISH THEIR MEAL",
  "ALLOWING A BABY TO SLEEP IN YOUR BED",
  "MAKING A CHILD SAY THANK YOU FOR GIFTS",
  "MAKING A CHILD KISS A RELATIVE OR FRIEND OF THE FAMILY",
  "ALLOWING A 8 YEAR OLD ACCESS TO THE INTERNET",
  "IGNORING A CHILD’S UNWANTED OR NAUGHTY BEHAVIOUR",
  "CONTROLLING A CHILD’S CHOICE OF FRIENDS",
  "DENYING A CHILD ACCESS TO THEIR FAVOURITE PASTIME",
  "NOT ENSURING A CHILD HAS THE APPROPRIATE EQUIPMENT FOR SCHOOL",
  "EXPECTING A CHILD TO SHARE A BED WITH A SIBLING OR PARENT",
  "INSISTING A CHILD WEARS PARTICULAR CLOTHES",
  "COMPARING A CHILD UNFAVOURABLY WITH ANOTHER CHILD",
  "HAVING SEXUAL INTERCOURSE IN THE SAME ROOM AS A CHILD UNDER 5",
  "VERBALLY OR PHYSICALLY FIGHTING IN FRONT OF CHILDREN",
  "USING ALCOHOL DURING PREGNANCY"
];

function checkParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.forEach((value, key) => {
    if (key.startsWith('brick')) {
      document.getElementById(value).appendChild(document.getElementById(key));
    }
  });
}

function buildLadder() {
  //   Get each div with a class of ladder on the page
  let ladders = document.querySelectorAll(".ladder");

  /*   loop through each ladder to add the required
      number of rungs based on the number of
      phrases in the words array */
  ladders.forEach((ladder, lI) => {
    //     lowercase L capital I for ladder index
    /*     ladder index used to ensure each rung
        has a unique ID on the page */
    for (let i = 0; i < words.length; i++) {
      //       create a rung for each phrase in the words array
      let rung = document.createElement("div");
      rung.id = `rung${lI}${i}`;
      rung.classList.add("rung");
      /*       if this is the last rung to be added
          give it the additinal class last to
          give a more ladder like appearance */
      if (i === words.length - 1) rung.classList.add("last");
      ladder.append(rung);
    }
  });
}

function addBricks() {
  //   Add a brick to each rung of the left ladder
  let rungs = document.querySelectorAll("#left .rung");
  rungs.forEach((rung, i) => {
    let brick = document.createElement("div");
    brick.id = `brick${i}`;
    brick.textContent = words[i];
    brick.classList.add("brick");
    brick.setAttribute("draggable", "true");
    brick.addEventListener("dragstart", drag);
    rung.append(brick);
  });
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  this.style.opacity = "0.4";
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  if (ev.target.id !== data)
    ev.target.appendChild(document.getElementById(data));
  document.getElementById(data).style.opacity = "1";
}

/**
 * Add required drag and drop event listeners to each rung
 */
function addEventHandlers() {
  const rungs = document.querySelectorAll(".rung");
  rungs.forEach((rung) => {
    rung.addEventListener("drop", drop);
    rung.addEventListener("dragover", allowDrop);
  });
  document.getElementById("save").addEventListener("click", buildQueryString);
}

/**
 * Builds a query parameter string for the URL so the brick positions can be saved for later
 */
function buildQueryString() {
  let rightRungs = document.querySelectorAll("#right > .rung");
  let queryString = "";

  rightRungs.forEach((rung) => {
    let brick = rung.querySelector(".brick");
    if (brick) {
      let key = brick.id;
      let value = rung.id;
      queryString += `${key}=${value}&`;
    }
  });
  
  let urlInput = document.getElementById('urlSave');
  /* REFERENCE: https://stackoverflow.com/questions/6257463/how-to-get-the-url-without-any-parameters-in-javascript */
  let mainUrl = window.location.href.split('?')[0];
  urlInput.value = `${mainUrl}?${queryString}`
}

function copyURL() {
  let urlInput = document.getElementById('urlSave');
  urlInput.select();
  urlInput.setSelectionRange(0, 99999); /* For mobile devices */

   /* Copy the text inside the text field */
  navigator.clipboard.writeText(urlInput.value);
  
  let popup = document.querySelector('.popup');
  popup.textContent = 'Copied to clipboard';
  popup.style.visibility = 'visible';
  popup.style.opacity = '1';
}

function start() {
  buildLadder();
  addBricks();
  addEventHandlers();
  checkParameters();
}

start();