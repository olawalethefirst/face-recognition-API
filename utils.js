const isValidStringCharacters = (stringArr) => {
    const isArr = Array.isArray(stringArr)
    
    if (!isArr) {
        throw new Error("Invalid parameter provided");
    }

    let run = true;
    let i = 0;

    while (i < stringArr.length && run) {
        const currentChar = stringArr[i];

        if (!(typeof currentChar === "string")) {
            run = false;
        }

        i += 1;
    }

    return run;
};


module.exports = { isValidStringCharacters };
