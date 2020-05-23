// Create a class "Grader"
class Grader{
  constructor(name,aname,grade){
    this.name = name;
    this.aname = aname;
    this.grade = grade;
  }
}
let user = new Grader("name","aname",85);
console.log(user);
// Create methods to output a valid grade
// Using the command line ask user a question for students name
// Using the command line ask user a question for assignment name
// Using the command line ask user a question for grade in numbers
// Return the letter grade for the assignment
// Assign letter grades based on points earned. Using if/else/elseif statements, create a function that returns a letter grade based on the following point breakdowns when called:
// 100-90=A, 80-89=B, 79-70=C, 69-60=D, <60=F
// To test your function, try it with these 5 point values and echo the result back out from the value returned from the function:
// 1. 94
// 2. 54
// 3. 89.9
// 4. 60.01
// 5. 102.1
// doors = function(type){
// this.number=0;
// if(type=="Toyota"){
// this.number=4;
// }else{
// this.number = 2;
// }
// return this.number;
// }
