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
	constructor(input) {
		this.operator_set = ["+", "/", "-", "*"];
		this.input = input;
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
		var i = start
		while (str[start] === " ") {
			start += 1
		}
		if ((str[start] === "(") || (str.substring(start, str.length).startsWith("sqrt"))) {
			var counter = 0;
			while (str[i] !== ")") {
				counter += str[i] === "(" ? 1 : 0;
				i += 1
			}
			while (counter > 0) {
				counter -= str[i] === ")" ? 1 : 0;
				i += 1
			}
			return [str.substring(start, i), i]
		} else {
			return [str[start], i + 1]
		}
	}

	parse(input) {
		input = input.trim();
		if ((input !== null) && (input[0] === "(") && (input.length >= 2)) {
            const left_sub = this.find_substring(input, 3);
            const left_to_parse = left_sub[0];
            let i = left_sub[1];
            const right_sub = this.find_substring(input, i);
            const right_to_parse = right_sub[0];
            i = right_sub[1];

			return new Operation(input[1], this.parse(left_to_parse), this.parse(right_to_parse))
		} else if (input.startsWith("sqrt(")) {
			if (this.operator_set.includes(input[5])) {
				return new Operation("sqrt", new Operation(parseInt(input[5]), null))
			} else {
				return new Operation("sqrt", this.parse(input[4]), null)
			}
		} else if (input !== "") {
			return new Operation(parseInt(input[0]), null, null)
		}
	}

    is_valid(input_val) {
        function check_parens(input_val) {
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

        function check_legal_characters(input_val) {
            // return false;
            let legal_set = ["+", "-", "*", "/", "(", " ", ")", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            for (let i = 0; i < input_val.length; i++) {
                if (!legal_set.includes(input_val[i])) {
                    let substr = input_val.substring(i, input_val.length);
                    if (!(substr.startsWith("sqrt") || substr.startsWith("qrt") || substr.startsWith("rt") || substr.startsWith("t"))) {
                        return false
                    }
                }
            }
            return true
        }

        function check_infix(input_val) {
            // return false;
            for (let i = 0; i < input_val.length - 1; i++) {
				let char = input_val[i];
				if (char === "(") {
					if (i + 1 < input_val.length) {
						if (!this.operator_set.includes(input_val[i + 1])) {
							return false
						}
					} else if (i >= 3) {
						if (!(input_val.substring(i - 4, i).startsWith("Sqrt"))) {
							return false
						}
					} else {
						return false
					}
				}
            }
            return true
        }

        return check_parens(input_val) && check_legal_characters(input_val) &&
            check_infix(input_val);
    }

}



console.log(is_valid(input_val))


