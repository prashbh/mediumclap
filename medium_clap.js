// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "<your-firestore-api-key>",
  authDomain: "<your-firestore-auth-domain>",
  projectId: "<your-firestore-project-id>",
  storageBucket: "<your-firestore-storage-bucket>",
  messagingSenderId: "<your-firestore-messaging-sender-id>",
  appId: "<your-firestore-app-id>",
  measurementId: "<your-firestore-measurement-id>"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const collection = db.collection("claps")

// Setup authentication
var userid;
function authenticate() {
  return auth.signInAnonymously()
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log("catch", errorCode, errorMessage)
  });
}

auth.onAuthStateChanged((user) => {
  console.log("onAuthStateChanged:", user)
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/v8/firebase.User
    userid = user.uid;
  } else {
    // User is signed out
    userid = undefined
  }
});

function getClaps(id) {
  collection.doc(id).get().then((doc) => {
    totalCount = 0
    console.log(doc)
    if (doc.exists) {
      totalCount = doc.data().value  
    }
    document.getElementById('totalCounter').innerText = totalCount;
  })
  
}

// Adding claps
function saveClaps(id, count) {
  collection.doc(id).set({
    "value": firebase.firestore.FieldValue.increment(count)
  }, {merge: true})
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding claps: ", error);
  })
}



// counter vars
let clapCounter = 0;
let totalCount = 0;
const minDeg = 1;
const maxDeg = 72;
const particlesClasses = [
  {
    class: "pop-top"
  },
  {
    class: "pop-top-left"
  },
  {
    class: "pop-top-right"
  },
  {
    class: "pop-bottom-right"
  },
  {
    class: "pop-bottom-left"
  },
];
document.getElementById('totalCounter').innerText = totalCount;

var interval; // store setInterval return value


function clapHovered() {
  let sonarClap = document.getElementById('sonar-clap');
  sonarClap.classList.add('hover-active');
  setTimeout(() => {
    sonarClap.classList.remove('hover-active');
  }, 2000);
}

function clapReleased(clapId) {
  clearInterval(interval);
  showFinalClapCount();
  saveClaps(clapId, clapCounter)
  clapCounter = 0;
}

function clapPressed() {
  if(userid === undefined) {
    authenticate().then(() => {
        clap()
    })
  } else {
  clap()
  interval = setInterval(clap, 100);
  }
}

function clap() {
  const clap = document.getElementById('clap');
  const clickCounter = document.getElementById("clicker");
  const particles = document.getElementById('particles');
  const particles2 = document.getElementById('particles-2');
  const particles3 = document.getElementById('particles-3');
  clap.classList.add('clicked');
  
  clapCounter ++;
  runAnimationCycle(clap, 'scale');
  
  if (!particles.classList.contains('animating')) {
    animateParticles(particles, 700);
  } else if(!particles2.classList.contains('animating')){
    animateParticles(particles2, 700);
  } else if(!particles3.classList.contains('animating')) {
    animateParticles(particles3, 700);
  } 
}


function showFinalClapCount() {
  const clickCounter = document.getElementById("clicker");
  const totalClickCounter = document.getElementById('totalCounter');
  
  clickCounter.children[0].innerText = '+' + clapCounter;
  totalCount = totalCount + clapCounter;
  totalClickCounter.innerText = totalCount;
  
  if (clickCounter.classList.contains('first-active')) {
    runAnimationCycle(clickCounter, 'active');
  } else {
    runAnimationCycle(clickCounter, 'first-active');
  }
  runAnimationCycle(totalClickCounter, 'fader');
}


// Animations
function runAnimationCycle(el, className, duration) {
  if (el && !el.classList.contains(className)) {
    el.classList.add(className);
  } else {
    el.classList.remove(className);
    void el.offsetWidth; // Trigger a reflow in between removing and adding the class name
    el.classList.add(className);
  }
}

function runParticleAnimationCycle(el, className, duration) {
  if (el && !el.classList.contains(className)) {
    el.classList.add(className);
    setTimeout(() => {
      el.classList.remove(className);
    }, duration);
  } 
}

function animateParticles(particles, dur) {
  addRandomParticlesRotation(particles.id, minDeg, maxDeg);
  for(let i = 0; i < particlesClasses.length; i++) {
    runParticleAnimationCycle(particles.children[i], particlesClasses[i].class, dur);
  }
  // Boolean functionality only to activate particles2, particles3 when needed
  particles.classList.add('animating');   
  setTimeout(() => {
    particles.classList.remove('animating');
  }, dur);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min  + 1)) + min;
}

function addRandomParticlesRotation(particlesName, minDeg, maxDeg) {
  const particles = document.getElementById(particlesName); 
  const randomRotationAngle = getRandomInt(minDeg, maxDeg) + 'deg';
  particles.style.transform = `rotate(${randomRotationAngle})`;
}