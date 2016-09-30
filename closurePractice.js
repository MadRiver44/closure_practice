//1 .function expression blab, calling it inside nonsense
function nonsense(string){
   var blab = function(){
        alert(string);
   };
   blab(); // if blab is not called with "()", alert doesn't happen
}
nonsense("what");


// 2. w/o function expression, works the same
function nonsense(string){
    function blab(){
        alert(string);
    }
    blab();
}
nonsense("what, what");


//3. with setTimeout
function nonsense(string){
    var blab = function(){
        alert(string);
    };
    setTimeout(blab,3000); // when blab is passed as a var and not w/ function invocation it works
                           // as planned, with it, it excecutes w/o delay
}
nonsense("poww");



/*Now, instead of calling blab inside of nonsense, return blab (without invoking it). Call nonsense with some string and store 
the returned value (the blab function) in a variable called blabLater. Call nonsense again with a different string and store the 
returned value in a variable called blabAgainLater.
*/
// 4. 
function nonsense(string){
    var blab = function(){
        alert(string);
    };
   return blab; // return blab() "return the blab function and execute it"
                // return blab is just a refernce to a function
} 

nonsense("wwww");
nonsense("zzzz");


// 5. first name / last name
function firstName(first){
    function fullName(last){
        console.log(first + " " + last);
    }
    return fullName; //do not return fullName(), that will return undefined
}
var llamo = firstName("Kevin");
llamo("Turney")


//6 .Create a storyWriter function 

    /*that returns an object with two methods. One method, addWords adds a word to your story 
    and returns the story while the other one, erase, resets the story back to an empty 
    string. Here is an implementation:*/

 function storyWriter(){
     var moreWords = " ";
    return {
        addWords : function(string){
            moreWords = moreWords.concat(string + " ");
             return moreWords;
         },
         erase : function(){
             return moreWords.replace(moreWords," ");
         }
     };
 }   
var myStory = storyWriter();
myStory.addWords("the quick fox");
myStory.addWords("jumps over the fence");
myStory.addWords("and escapes the farmer");
myStory.erase();

function make_calculator() {
    var n = 0;  // this calculator stores a single number n
    return {
                  add : function (a) { n += a; return n; },
             multiply : function (a) { n *= a; return n; }
           };
}

first_calculator = make_calculator();
second_calculator = make_calculator();

first_calculator.add(3);                   // returns 3
second_calculator.add(400);                // returns 400

first_calculator.multiply(11);             // returns 33
second_calculator.multiply(10);            // returns 4000

 #7 Using the module pattern, design a toaster. Use your creativity here and think about 
 what you want your users to be able to access on the outside of your toaster 
 vs what you don/''t want them  
  to be able to touch.

 var Toaster = (function(){
    var setting = 0;
    var temperature;
    var low = 100;
    var med = 200;
    var high = 300;
    // public
    var turnOn = function(){
        return heatSetting();
    };
    var adjustSetting = function(setting){
        if(setting <= 3){
            temperature = low;
        }if (setting >3  && setting <= 6){
            temperature = med;
        }if (setting > 6 && setting <= 10){
            temperature = high;

        }return temperature;
    };
    // private
    var heatSetting = function(adjustSetting){
        var thermostat = adjustSetting;
        return thermostat;
        };    
    return{
            turnOn:turnOn,
            adjustSetting:adjustSetting
        };
})();


Toaster.adjustSetting(5);
//Toaster.adjustSetting(8);








//Fontend Master closure exercises

// example 1

var closureAlert = function(){
    var x = "help im a variable stuck in a closure";
    
    var alerter = function(){
        alert(x);
    };
    setTimeout(alerter,1000);
    console.log("we will return right after");
};
//closureAlert();


// example 2
var closureAlert = function(){
    var x = 0;
    var alerter = function(){
        alert(++x);
    };
     //alerter; //if you DON'T RETURN a function (function name or name sored in var), undefined
     //alerter(); // closureAlert executes twice because, funcStorer is fired off, and then alerter
     return alerter; // fires off once
};
var funcStorer = closureAlert();
var funcStorer2 = closureAlert();

// the () after funcStorer means that alerter (a function) is returned, thus the returned function is executed ... in other words, call funcStorer and execute the named function returned
//funcStorer();



// example 3
function say666(){
    var num = 666;
    var alerter = function(){
        alert(num);// first call alerts 666
        num++; // if there is a secondary or more call the number is 667,668 etc.
    };
        return alerter;
}
//say666();// returns reference to function: alerter
var sayotherNum  = say666(); // assign reference value (function object) to another variable
//sayotherNum();// 666 with the (parens), we execute that reference value, a function object
             // the reason we assign the outter function to a variable is 
             // to capture/retain that handle on the inner functions variables, these variables
             // are now stored somewhere else and cant be destroyed
//sayotherNum();//667





/*https://www.sitepoint.com/demystifying-javascript-closures-callbacks-iifes/

//So, at the end of the loop the value of i is 5. That most recent version of the variable is used in all the functions produced by the loop. All this happens because closures are linked to the variables themselves, not to their values.

To fix the problem, we need to provide a new scope – for each function created by the loop – that will capture the current state of the i variable. We do that by closing the setTimeout() method in an IIFE, and defining a private variable to hold the current copy of i.
*/

// example 4, still need to understand....
function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = 'item' + list[i];
        result.push(function() {alert(item + ' ' + list[i])} );
    }
    return result;
}
//buildList([1,2,3,4,5]);

//function testList() {
    var fnlist = buildList([1,2,3,4,5]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j](); // 
    
}
//testList();



// example 5
function sayAlice() {
    var sayAlert = function(){ 
        alert(alice); 
        
    }; // inner function has access to outter functions scope
        // Local variable that ends up within closure
    var alice = 'Hello Alice'; 
    return sayAlert;
}

var sayAlice2 = sayAlice();
//sayAlice2; // returns referece to function sayAlert
//sayAlice2(); // executes that reference function



// example 6

function counter(){
    var n = 0;
    return {
        count : function(){
            return ++n;
            },
        reset : function(){
            n = 0;
            }
        };
}

//counter(); // returns the object
var myCounter = counter();
myCounter.count();

        
