// input_val = "(+ 2 (/ 1 sqrt(3)))"

// class Leaf {
// 	constructor(num) {
// 		this.num = num
// 		this.is_leaf = true
// 	}
// }

class Operation {
    constructor(operator, l_child, r_child) {
        this.operator = operator; // String representing the operator
        this.l_child = l_child;
        this.r_child = r_child;
        this.is_leaf = l_child == null && r_child == null
    }
}

class Tree {
    // static operator_set = ["+", "-", "*", "/"];
    // static operator_set;
    constructor(input) {
        // this.operator_set =
        this.operator_set = new Set(["+", "-", "*", "/"])
        // this.input = input;
        // console.log(this.is_valid(input));
        this.root = this.is_valid(input) ? this.parse(input) : null
    }

    // find_substring(str, start) {
    // 	i = start
    // 	if str[start] == "(" {
    // 		counter = 0
    // 		i = 2
    // 		while str[i] != ")" {
    // 			if (str[i] == "(") {
    // 				counter += 1
    // 			}
    // 			i += 1
    // 		}
    // 		while counter > 0 {
    // 			if (str[i] == ")") {
    // 				counter -= 1
    // 			}
    // 			i += 1
    // 		}
    // 		return [str[start:i], i]
    // 	} else {
    // 		return str[start], i + 1
    // 	}
    // }

    find_substring(str, start) {
        let i = start;
        while (str[start] === " ") {
            start += 1
        }
        if ((str[start] === "(") || (str.substring(start, str.length).startsWith("sqrt"))) {
            let counter = 0;
            while (str[i] !== ")") {
                counter += str[i] === "(" ? 1 : 0;
                i += 1
            }
            while (counter > 0) {
                counter -= str[i] === ")" ? 1 : 0;
                i += 1
            }
            // return [str.substring(start, i), i]
        } else {
            // while (!this.operator_set.has(str[i])) {
            //     i++
            // }
            while (str[i] !== " " && str[i] !== ")" && !this.operator_set.has(str[i]) && i < str.length) {
                i++
            }
            // return [str.substr]
            // return [str[start], i + 1]
        }
        return [str.substring(start, i), i + 1]
    }

    parse(input) {
        input = input.trim();
        // console.log(input);
        if ((input !== null) && (input[0] === "(") && (input.length >= 2)) {
            const left_sub = this.find_substring(input, 3);
            const left_to_parse = left_sub[0];
            let i = left_sub[1];
            // console.log()
            const right_sub = this.find_substring(input, i);
            const right_to_parse = right_sub[0];
            console.log(input);
            console.log(left_sub);
            console.log(right_sub);

            // i = right_sub[1];

            return new Operation(input[1], this.parse(left_to_parse), this.parse(right_to_parse))
        } else if (input.startsWith("sqrt(")) {
            // if (this.operator_set.has(input[5])) {
            //     return new Operation("sqrt", new Operation(parseInt(input[5]), null))
            // } else {
            //     return new Operation("sqrt", this.parse(input[4]), null) // TODO NOTE THIS LOOKS WRONG SHOULD MAYBE BE 5 CAUSE NOT IN OPERATOR_SET
            // }
            let i = 5;
            while (input[i] === " ") {
                i++
            }
            if (this.operator_set.has(input[i])) {
                return new Operation("sqrt", new Operation(this.parse(input.substring(4, input.length))))
            } else {
                // Notice that we cut off the final parentheses here
                return new Operation("sqrt", new Operation(parseInt(input.substring(i, input.length - 1)), null, null))
            }
            // let substr = input.substring(i, input.length - 1) // Get's rid of closing parentheses
            // if (this.operator_set.has(substr[0])) {
            //     return new Operation("sqrt", new Operation())
            // }

        } else if (input !== "") {
            // console.log(parseInt(input));
            return new Operation(parseInt(input), null, null)
        }
    }

    is_valid(input_val) {
        return this._check_parens(input_val) && this._check_legal_characters(input_val) &&
            this._check_infix(input_val);
    }

    _check_parens(input_val) {
        let counter = 0;
        for (let i = 0; i < input_val.length; i++) {
            if (input_val[i] === "(") {
                counter += 1
            } else if (input_val[i] === ")") {
                counter -= 1
            }
            if (counter < 0) {
                return false
            }
        }
        return (counter === 0)
    }

    _check_legal_characters(input_val) {
        // return false;
        let legal_set = new Set(["+", "-", "*", "/", "(", " ", ")", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
        for (let i = 0; i < input_val.length; i++) {
            if (!legal_set.has(input_val[i])) {
                let substr = input_val.substring(i, input_val.length);
                // console.log(substr)
                if (!(substr.startsWith("sqrt") || substr.startsWith("qrt") || substr.startsWith("rt") || substr.startsWith("t"))) {
                    return false
                }
            }
        }
        return true
    }

    _check_infix(input_val) {
        // return false;
        for (let i = 0; i < input_val.length - 1; i++) {
            let char = input_val[i];
            if (char === "(") {
                if (i + 1 < input_val.length) {
                    // if (!this.operator_set.has(input_val[i + 1])) {
                    if (!this.operator_set.has(input_val[i + 1])) {
                        if (i >= 1 && input_val[i - 1] !== 't') {
                            return false
                        }
                    }
                } else if (i >= 3) {
                    if (!(input_val.substring(i - 4, i).startsWith("sqrt"))) {
                        return false
                    }
                } else {
                    return false
                }
            }
        }
        return true
    }

}
