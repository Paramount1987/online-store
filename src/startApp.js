import API from 'api/index';

export const renderDealers = async () => {
    try {
        const dealers = await API.getDealers();
        renderCheckboxes(dealers);
    } catch(error) {
        console.log(error);
    }

}

export const startAppHandler = (e, callback, type) => {
    let dealers = [];

    if (type === 'form') {
        const form = document.getElementById('form-dealers');
        const checkboxes = form.querySelectorAll('.ch-dealers');

        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                dealers.push(checkboxes[i].value);
            }
        }

    } else {
        dealers = e.detail ? e.detail : [];
    }

    document.getElementById('start-app').remove();
    callback(dealers);
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
