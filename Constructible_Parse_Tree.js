input_val = "(+ 2 (/ 1 sqrt(3)))"

// class Leaf {
// 	constructor(num) {
// 		this.num = num
// 		this.is_leaf = true
// 	}
// }

class Operation {
	constructor(operator, l_child, r_child, is_leaf) {
		this.operator = operator  // String representing the operator
		this.l_child = l_child
		this.r_child = r_child
		this.is_leaf = is_leaf
	}
}

class Tree {
	constructor(input) {
		this.operator_set = ["+", "/", "-", "*"]
		this.input = input
		this.root = parse(input)
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
		while (str[start] == " ") {
			start += 1
		}
		if str[start] == "(" || str.substring(start, str.length).startsWith("sqrt") {
			var counter = 0
			while str[i] != ")" {
				counter += str[i] == "(" ? 1 : 0
				i += 1
			}
			while counter > 0 {
				counter -= str[i] == ")" ? 1 : 0
				i += 1
			}
			return [str.substring(start, i), i]
		} else {
			return str[start], i + 1
		}
	}

	parse(input) {
		input = input.trimLeft()
		if input && input[0] == "(" && input.length >= 2 {
			var left_sub = find_substring(str, 3)
			var left_to_parse = left_sub[0]
			var i = left_sub[1]
			var right_sub = find_substring(str, i)
			var right_to_parse = right_sub[0]
			i = right_sub[1]

			return new Operation(input[1], parse(left_to_parse), parse(right_to_parse), false)
		} else if input.startsWith("sqrt(") {
			if this.operator_set.includes(input[5]) {
				return new Operation("sqrt", new Operation(parseInt(input[5]), null, false))
			} else {
				return new Operation("sqrt", parse(input[4]), null, false)
			}
		} else if str != "" {
			return new Operation(parseInt(input[0]), null, null, true)
		}
	}
}

function is_valid(input_val) {
	return check_parens(input_val) && check_legal_characters(input_val) && 
			check_infix(input_val);
}



