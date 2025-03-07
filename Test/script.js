/**
 * getRandomColor()
 * Generates a random hexadecimal color code.
 *
 * @format
 * @returns {string} A random color code in the format #RRGGBB.
 */

let charArray = ['a', 'b', 'c', 'd', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
function getRandomColor() {
    let color = '#';
    for (let i = 0; i < 6; i++) {
        let ranInt = Math.floor(Math.random() * 12);
        color += charArray[ranInt];
    }
    return color;
}

let randomColorDivs = []//document.querySelectorAll('.random-color');
randomColorDivs.forEach(random => {
    random.style.backgroundImage = `linear-gradient(#000, ${getRandomColor()}, #f00)`;
    random.querySelector('span').style.color = "#fff"
});
