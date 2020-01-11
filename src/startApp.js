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
