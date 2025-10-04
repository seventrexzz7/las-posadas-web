document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('book-form');

    form.addEventListener('submit', function(e){
        e.preventDefault();

        const inDate = document.getElementById('in-date').value;
        const outDate = document.getElementById('out-date').value;
        const rooms = parseInt(document.getElementById('rooms').value);
        const adults = parseInt(document.getElementById('adults').value);
        const children = parseInt(document.getElementById('children').value);

        const url = `components/booking/booking.html?inDate=${inDate}&outDate=${outDate}&rooms=${rooms}&adults=${adults}&children=${children}`;
        console.log(url);
        window.location.href = url;
    })
});