# Create a class "Grader"
# Create methods to output a valid grade
# Using the command line ask user a question for students name
# Using the command line ask user a question for assignment name
# Using the command line ask user a question for grade in numbers
# Return the letter grade for the assignment
# Class Example
class Grader
  def initialize(name, aname, grade)
    @name =  name
    @aname = aname
    @grade = grade
  end
  def getGrade
    if 0 > @grade || @grade > 100
      return "not a valid grade."
    elsif @grade <= 60
      return "F"
    else
      return "A"
    end
  end
  end



user = Grader.new("John", "Grader", 102)
puts("This is " + user.getGrade())


#   def getGrade
#     if 0 > num:
#         return "not a valid grade."
#     elsif num < 60
#       return "F"
#     elsif num <= 69
#       return "D"
#     elsif num <= 79
#       return "C"
#     elsif num <= 89
#       return "B"
#     elsif num <= 100
#       return "A"
#     else
#       return "not a valid grade."
#     end
#   end
# end
# end
# end
# end