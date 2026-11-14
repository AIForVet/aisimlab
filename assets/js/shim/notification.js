// Stand-in for Moodle's core/notification: show the error in the simulation box and in the console.
export default {
    exception: (error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        const box = document.getElementById('sim');
        if (box) {
            const p = document.createElement('p');
            p.className = 'empty';
            p.textContent = String(error && error.message ? error.message : error);
            box.append(p);
        }
    },
};
