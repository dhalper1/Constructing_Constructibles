input_val = "(+ 2 (/ 1 sqrt(3)))"

class Leaf {
	constructor(num) {
		this.num = num
	}
}

class Operation {
	constructor(operator, l_child, r_child) {
		this.operator = operator  // String representing the operator
		this.l_child = l_child
		this.r_child = r_child
	}
}

class Tree {
	constructor(input) {
		this.operator_set = ["+", "/", "-", "*"]
		this.input = input
		this.root = parse(input)
	}

	find_substring(str, start) {
		i = start
		if str[start] == "(" {
			counter = 0
			i = 2
			while str[i] != ")" {
				if (str[i] == "(") {
					counter += 1
				}
				i += 1
			}
			while counter > 0 {
				if (str[i] == ")") {
					counter -= 1
				}
				i += 1
			}
			return [str[start:i], i]
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

			return new Operation() // NOTE WORKING HERE
		}
	}
}