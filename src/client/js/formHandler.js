function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    Client.checkForName(formText)

    console.log("Form Submitted")
    
    // Construct the body for the POST request
    const requestBody = {
        "inputPerson": {
            "type": "NaturalInputPerson",
            "personName": {
                "nameFields": [
                    {
                        "string": formText,
                        "fieldType": "GIVENNAME"
                    }
                ]
            },
            "gender": "UNKNOWN"
        }
    }


    // Make the POST request
    fetch('https://example-api-express.onrender.com/nameapi', { // localhost:8081
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(res => res.json())
    .then(data=> {
        //Extract the gender and confidence from the bestMatch
        const gender = data.bestMatch.parsedPerson.gender.gender;
        const confidence = data.bestMatch.parsedPerson.gender.confidence;
        // Display the extraxcted data in the results div
        document.getElementById('results').innerHTML = `Gender: ${gender} <br> Confidence: ${confidence}`;
    })
    .catch(error=> {
        console.error("There was an error with the fetch operation:", error);
    });
}

export { handleSubmit }
