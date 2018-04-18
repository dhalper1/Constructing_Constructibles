input_val = "(+ 2 (/ 1 sqrt(3))"


class Leaf:
    def __init__(self, num):
        self.num = num

    def __str__(self):
        return str(self.num)


class Operation:
    def __init__(self, operator, l_child, r_child=None):
        self.operator = operator  ## String representing the operator
        self.l_child = l_child
        self.r_child = r_child

    def set_child(self, l_child=None, r_child=None):
        if l_child is not None:
            self.l_child = l_child
        if r_child is not None:
            self.r_child = r_child

    def __str__(self):
        if self.operator == "sqrt":
            return "(sqrt (" + str(self.l_child) + ")"
        return "(" + self.operator + " (" + str(self.l_child) + ", " + str(self.r_child) + "))"

class Tree:
    def __init__(self, input):
        self.operator_set = ["+", "/", "-", "*"]
        self.input = input
        self.root = self._parse(self.input)

    def _find_substr(self, str, start):
        i = start
        if str[start] == "(":
            counter = 0
            i = 2
            while str[i] != ")":
                counter += int(str[i] == "(")
                i += 1
            while counter > 0:
                counter -= int(str[i] == ")")
                i += 1
            return str[start:i], i
        # elif str[start] == ")":
        #     return None, i
        else:
            return str[start], i + 1

    def _parse(self, str):
        str = str.lstrip(" ")
        if str and str[0] == "(" and len(str) >= 2:
            # left_to_parse = str[3]
            left_to_parse, i = self._find_substr(str, 3)
            right_to_parse, i = self._find_substr(str, i)

            return Operation(str[1], self._parse(left_to_parse), self._parse(right_to_parse))
        elif str.startswith("sqrt("):
            if str[5] not in self.operator_set:
                return Operation("sqrt", Leaf(int(str[5])))
            else:
                return Operation("sqrt", self._parse(str[4]))
        elif str:
            return Leaf(int(str[0]))

    def __str__(self):
        return str(self.root)



print(Tree(input_val).root)
