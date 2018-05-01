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
        this.operator_set = new Set(["+", "-", "*", "/"]);
        this.root = this.is_valid(input) ? this.parse(input) : null
    }

    /**
     * Helper method for parse
     * @param str - The string
     * @param start - The starting location for where to start finding the string to return inside of str
     * @returns {*[]} - A tuple the substring and the returning index
     */
    _find_substring(str, start) {
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
        } else {
            while (str[i] !== " " && str[i] !== ")" && !this.operator_set.has(str[i]) && i < str.length) {
                i++
            }
        }
        return [str.substring(start, i), i + 1]
    }

    /**
     * Recursive parsing algorithm
     * @param input The string
     * @returns {Operation} The Operation for that given input
     */
    parse(input) {
        input = input.trim();
        if ((input !== null) && (input[0] === "(") && (input.length >= 2)) {
            const left_sub = this._find_substring(input, 3);
            const left_to_parse = left_sub[0];
            let i = left_sub[1];
            const right_sub = this._find_substring(input, i);
            const right_to_parse = right_sub[0];

            return new Operation(input[1], this.parse(left_to_parse), this.parse(right_to_parse))

        } else if (input.startsWith("sqrt(")) {
            let i = 5;
            while (input[i] === " ") {
                i++
            }
            if (this.operator_set.has(input[i])) {
                // return new Operation("sqrt", new Operation(this.parse(input.substring(4, input.length))))
                return new Operation("sqrt", this.parse(input.substring(4, input.length)))
            } else {
                // Notice that we cut off the final parentheses here
                return new Operation("sqrt", new Operation(parseInt(input.substring(i, input.length - 1)), null, null))
            }
            // if ()
            // return new Operation("sqrt", this.parse(input.substring(4, input.length)))

        } else if (input !== "") {
            return new Operation(parseInt(input), null, null)
        }
    }

    /**
     * Tests whether a string is valid or not
     * @param input_val - The string
     * @returns {boolean|*} - A boolean telling us whether or not we got valid input
     */
    is_valid(input_val) {
        return this._check_parens(input_val) && this._check_legal_characters(input_val) &&
            this._check_prefix(input_val);
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
        let legal_set = new Set(["+", "-", "*", "/", "(", " ", ")", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
        for (let i = 0; i < input_val.length; i++) {
            if (!legal_set.has(input_val[i])) {
                let substr = input_val.substring(i, input_val.length);
                if (!(substr.startsWith("sqrt") || substr.startsWith("qrt") ||
                        substr.startsWith("rt") || substr.startsWith("t"))) {
                    return false
                }
            }
        }
        return true
    }

    _check_prefix(input_val) {
        for (let i = 0; i < input_val.length - 1; i++) {
            let char = input_val[i];
            if (char === "(") {
                if (i + 1 < input_val.length) {
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
