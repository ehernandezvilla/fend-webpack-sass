function checkForName(inputText) {
    console.log("Running checkForName", inputText);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou",
        "Eduardo",
        "Juan"
    ]

    if(names.includes(inputText)) {
        alert("Welcome, Capitan!")
    }
    
    if(!names.includes(inputText)) {
        alert("Welcome, Guest!")
    }
}

export { checkForName }
