import API from 'api/index';

export const renderDealers = async () => {
    try {
        const dealers = await API.getDealers();
        renderCheckboxes(dealers);
    } catch(error) {
        console.log(error);
    }

}

export const startAppHandler = (event, initApp, typeEvent) => {
    let dealers = [];
    const form = document.getElementById('form-dealers');

    if (typeEvent === 'form' && form) {
        const checkboxes = form.querySelectorAll('.ch-dealers');
        const checkboxesArray = Array.prototype.slice.call(checkboxes);

        dealers = checkboxesArray
                    .filter(el => el.checked)
                    .map(item => item.value);
    } else {
        dealers = event.detail ? event.detail : [];
    }

    document.getElementById('start-app').remove();
    initApp(dealers);
}

const renderCheckboxes = (dealers) => {
    const checkboxes = [];
    const preloader = document.getElementById('chs-preloader');
    const container = document.getElementById('checkboxes-placeholder');

    dealers.forEach((dealer) => {
        checkboxes.push(`
            <label>
                <input type="checkbox" class="filled-in ch-dealers" value="${dealer}" />
                <span>${dealer}</span>
            </label><br />`)
    });
    preloader.remove();
    container.innerHTML = checkboxes.join('');
}
