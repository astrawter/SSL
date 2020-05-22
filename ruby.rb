# Create a class "Grader"
class Grader
  def initialize(name, aname, grade)
    @name =  name
    @aname = aname
    @grade = grade
  end
  # Create methods to output a valid grade
  def getGrade
    if 0 > @grade || @grade > 100
      return "not a valid grade."
    elsif @grade <= 60
      return "F"
    elsif @grade <= 69
      return "D"
    elsif @grade <= 79
      return "C"
    elsif @grade <= 89
      return "B"
    else
      return "A"
    end
  end
  def getUser
    return "Hello "+ @name + ". The grade the assignment " + @aname+ " is "
  end
  end

# Using the command line ask user a question for students name
puts "Enter your name below."
name = gets

# Using the command line ask user a question for assignment name
puts "Enter the name of the assignment."
aname = gets

# Using the command line ask user a question for grade in numbers
puts "Enter the number grade for the assignment."
grade = gets.to_f

#create user with input
user = Grader.new(name.chomp, aname.chomp, grade)

# Return the letter grade for the assignment
puts(user.getUser() + user.getGrade())

# To test your function, try it with these 5 point values and echo the result back out from the value returned from the function:
# 1. 94
# 2. 54
# 3. 89.9
# 4. 60.01
# 5. 102.1