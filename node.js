const readline = require("readline");
// Create a class "Grader"
checker = (num) => {
  if (num < 0 || isNaN(num) || num > 100) {
    return "not a valid grade."
  } else if(num <= 60) {
    return "F"
  }else if(num <= 69) {
    return "D"
  } else if(num <= 79) {
    return "C"
  }else if(num <= 89) {
    return "B"
  }else{
    return "A"
  }
}

class Grader{
  constructor(name,aname,grade){
    this.name = name;
    this.aname = aname;
  }

  getGrade(num){
    num = checker(num)
    console.log("Hello "+this.name+". The grade for the assingment "+this.aname +" is "+num);
  }
}

const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout
})
// Using the command line ask user a question for students name
rl.question("Student Name: ",(name)=>{
  // Using the command line ask user a question for assignment name
  rl.question("Assignment Name: ", (aname)=>{
    // Using the command line ask user a question for grade in numbers
    rl.question("Number Grade: ", (grade)=>{
      let user = new Grader(name,aname)
      user.getGrade(grade)
      rl.close()
    })
  })
})

// Create methods to output a valid grade



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
