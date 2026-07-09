window.onerror = function(

message,

file,

line,

column,

error

){

console.group(

"GAME ERROR"

);


console.log(

"Message:",

message

);


console.log(

"File:",

file

);


console.log(

"Line:",

line

);


console.log(

"Column:",

column

);


console.log(

"Error:",

error

);


console.groupEnd();


};



window.addEventListener(

"unhandledrejection",

event=>{


console.group(

"PROMISE ERROR"

);


console.log(

event.reason

);


console.groupEnd();


}


);