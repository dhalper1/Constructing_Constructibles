input_val = " (+ 2 (/ 1 sqrt(3)))"


class Leaf:
    def __init__(self, num):
        self.num = num

    def __str__(self):
        return str(self.num)


class Operation:
    def __init__(self, operator, l_child, r_child=None):
        self.operator = operator  # String representing the operator
        self.l_child = l_child
        self.r_child = r_child

    def set_child(self, l_child=None, r_child=None):
        if l_child is not None:
            self.l_child = l_child
        if r_child is not None:
            self.r_child = r_child

    def __str__(self):
        if self.operator == "sqrt":
            return "sqrt(" + str(self.l_child) + ")"
        return "(" + self.operator + " " + str(self.l_child) + " " + str(self.r_child) + ")"


class Tree:
    def __init__(self, input):
        self.operator_set = ["+", "/", "-", "*"]
        self.input = input
        self.root = self._parse(self.input)

    def _find_substr(self, str, start):
        i = start
        str = str[0:start] + str[start:].lstrip(" ")
        print(str[start])
        if str[start] == "(" or str[start:].startswith("sqrt"):
            counter = 0
            # i = 2
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


def is_valid(input_val):
    return check_parens(input_val) and check_legal_characters(input_val) and check_infix(
        input_val)  # and check_spacing(input_val)


# def check_spacing(input_val):
#     last_space = True
#     for i in range(len(input_val)):
#         if input_val[i] != " ":
#             if not last_space:
#                 return False
#             last_space = False
#         else:
#             last_space = True

def check_legal_characters(input_val):
    legal_set = ["+", "-", "*", "/",
                 "(", " ", ")", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    # i = 0
    for i in range(len(input_val)):
        char = input_val[i]
        # if not (i + 4 < len(input_val) and input_val[i:].startswith("sqrt")) and char not in legal_set:
        #     return False
        if not (char in legal_set):
            if not (input_val[i:].startswith("sqrt") or input_val[i:].startswith("qrt") or
                    input_val[i:].startswith("rt") or input_val[i:].startswith("t")):
                return False

    return True


def check_infix(input_val):
    for i in range(len(input_val)):
        operator_set = ["+", "-", "*", "/"]
        char = input_val[i]
        if char == "(" and i != len(input_val) - 1:
            if i < len(input_val):
                if input_val[i + 1] not in operator_set:
                    return False
            elif i >= 3:
                if not input_val[i - 4:].startswith("sqrt"):
                    return False
            else:
                return False

        return True


# def check_parens(input_val):
#     # string = input_val[:] # Copying
#     # left_most_parens_ind = -1
#     left_parens = 0
#     i = 0
#     while i < len(input_val) and input_val[i] != ")":
#         char = input_val[i]
#         if char == "(":
#             left_parens += 1
#             # left_most_parens_ind = i
#         i += 1
#
#     if input_val[i] != ")":
#         return False
#     right_parens = 0
#     while i < len(input_val):
#         char = input_val[i]
#         if char == "(":
#             return False
#         if char == ")":
#             right_parens += 1
#         i += 1
#
#     return right_parens == left_parens

def check_parens(input_val):
    counter = 0
    for char in input_val:
        if char == "(":
            counter += 1
        elif char == ")":
            counter -= 1

        if counter < 0:
            return False

    return counter == 0


print(Tree(input_val).root)
