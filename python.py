# Create a grader

# Create a class "Grader"
class Grader:
  def __init__(self, name, aname, grade):
    self.name = name
    self.aname = aname
    self.grade = grade

# Create methods to output a valid grade
  # Assign letter grades based on points earned.
  # 100-90=A, 80-89=B, 79-70=C, 69-60=D, <60=F
  def getGrade(self):
    num = self.grade
    if 0 > num:
        return "not a valid grade."
    elif num < 60:
       return "F"
    elif num <= 69:
       return "D"
    elif num <= 79:
       return "C"
    elif num <= 89:
       return "B"
    elif num <= 100:
       return "A"
    else:
        return "not a valid grade."


# Using the command line ask user a question for students name
name = raw_input("Student Name: ")

# Using the command line ask user a question for assignment name
aname = raw_input("Assignment Name: ")

# Using the command line ask user a question for grade in numbers
#grade = raw_input("Number Grade: ")

#Validate user input for grade
while True:
    #Check to see if the number entered is valid
    try:
        grade = float(raw_input("Number Grade: "))
    #Tell the user to enter a number
    except ValueError:
        print("Please enter a number.")
        #Repeats the try
        continue
    else:
        #User entered a number
        break

user = Grader(name, aname, grade)

# Return the letter grade for the assignment

output = "Hello "+name+". Your letter grade for "+aname+" is " + user.getGrade()
print(output)

# To test your function, try it with these 5 point values and echo the result back out from the value returned from the function:
# 1. 94
# 2. 54
# 3. 89.9
# 4. 60.01
# 5. 102.1

# Show errors in command line if there are any.