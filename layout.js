const btn = document.querySelector('.form__btn');
btn.addEventListener('click', newInput);

function newInput() {
    const form = document.querySelector('.form__list--location');
    const newInput = document.createElement('li');
    newInput.classList.add('form__list__item');
    newInput.innerHTML = `
    <input type="text" placeholder="New Location" class='form__input loc_input autocomplete'>
`;
    form.appendChild(newInput);
}