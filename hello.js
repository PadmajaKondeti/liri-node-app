console.log('hello');
for (var x = 1, i = 0; i <= 32; i += 1) {
    //console.log(x);
    x += x;
}
var x = +process.argv[2];
var y = +process.argv[3];
console.log((x + y) / 2);
// SOLUTION 1 - More Obvious
var a = process.argv[2];
var b = process.argv[3];

if (a == b){
	console.log(true);
}
else {
	console.log(false);
}


// SOLUTION 2 - Simplified (Refactored)
console.log(process.argv[2] == process.argv[3]);