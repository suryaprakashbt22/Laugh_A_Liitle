const delayedColorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const h1Color = document.querySelector('#firsth1');
            h1Color.style.backgroundColor = color;
            h1Color.style.transition = "all 0.5s";
            resolve();
        }, delay)
    })
}

async function rainbow() {
    await delayedColorChange('#d8f3dc', 1000)
    await delayedColorChange('#b7e4c7', 1000)
    return "ALL DONE!"
}
let count = 1;
setInterval(async () => {
    await rainbow();
}, 1800)
const jokeButton = document.querySelector("#jokeButton");
const jokeList = document.querySelector("#jokeList");

const getDadJoke = async () => {
    try {
        const config = { headers: { Accept: 'application/json' } };
        const res = await axios.get("https://icanhazdadjoke.com/", config);
        // console.log(res.data.joke);
        return res.data.joke;
    }
    catch (e) {
        console.log(e);
        return "No Jokes Available Sorry :-( ";
    }
};
const jokeInModal = document.querySelector('#jokeInModal');
const newJoke = async () => {
    const joke = await getDadJoke();
    const newLI = document.createElement("LI");
    const newBoxDiv = document.createElement("DIV");
    const newBox = document.createElement("DIV");
    newBox.classList.add('box');

    newBoxDiv.classList.add('block');

    const delButton = document.createElement("button");
    delButton.classList.add('delete');

    newBox.textContent = joke;
    newBoxDiv.append(newBox);
    newBoxDiv.append(delButton);

    newLI.append(newBoxDiv);
    delButton.addEventListener('click', () => {
        newLI.remove();
    })

    jokeInModal.textContent = joke;
    jokeList.append(newLI);
    jokeDelete = document.querySelectorAll('li .block');
};

jokeButton.addEventListener('click', newJoke);

//Modal Code

document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        const e = event || window.event;

        if (e.keyCode === 27) { // Escape key
            closeAllModals();
        }
    });
});





