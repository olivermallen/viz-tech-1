
function squareRoot(num){
    if (typeof num == "number"){
        return Math.sqrt(num);
    } else {
        return "Not a number";
    }
}

function printNums(num){
    if (typeof num == "number"){
        if (num>0) {
            for (let i = num; i>=0; i--){
                console.log(i);
            }

        } else {
            return "invalid input";
        }
    } else {
        return "invalid input";
    }
}

function randomPosition() {

    return Math.random()*140+70;
}

function sumAB(A, B){

    return A+B;
}