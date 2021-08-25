ops = {
    "+" : (a, b) => a + b,
    "-" : (a, b) => a - b,
    "*" : (a, b) => a * b,
    "/" : (a, b) => a / b
}

function eval() {
    // Do not use eval!!!
    return;
}

const errorCheck = (expr) => {
	let count = 0;
	let check = expr.split(" ").join("").split("");
	check.forEach((item) => {
		if (item === "(") count ++;
		if (item === ")") count--;
		});
				if (count != 0) {
			throw new Error("ExpressionError: Brackets must be paired");
			return null;
	}
	check.forEach((item, index, arr) => {
		if (item === "/" && arr[index+1] ==="0") {
		throw new Error("TypeError: Division by zero.");
			return null;
		}
	} );
	return true;
};

const calculate = (expr) => {
	let calc = expr.split(" ");
	for (let i = 1; i < calc.length -1;) {
			if (calc[i] == '*' || calc[i] == '/') {
            calc[i] = ops[calc[i]](calc[i-1], calc[i+1]);
            calc.splice(i-1, 3, calc[i]);
        }
		else i++;
	}

	
		for (let i = 1; i < calc.length -1;) {
		    if (calc[i] == '+' || calc[i] == '-') {
            calc[i] = ops[calc[i]](+calc[i-1], +calc[i+1]);
            calc.splice(i-1, 3, calc[i]);
        }
		else i++;
	}

	
	return calc[0];
}

function expressionCalculator(expr) {
	
	if (errorCheck(expr) != true) return null;
	expr = expr.replace(/\s/g, "").replace(/(\*|\/|\+|\-)/g, " $& ");
	
	   if (expr.match(/\(/g) != null ) {
        for (let i = expr.match(/\(/g).length; i > 0; i--) {
            let newExpr = expr.match(/(\([0-9\+\/\*\-. ]+\))/g)[0];
            expr = expr.replace(newExpr, calculate(newExpr.slice( 1, newExpr.length-1 )));
        }  
    }
    return +calculate(expr);
    // write your solution here
}

// var result = expressionCalculator("(2-2");
// alert(result);

module.exports = {
    expressionCalculator
}