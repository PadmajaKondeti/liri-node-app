console.log('hello');
for (var x = 1, i = 0; i <= 32; i += 1) {
    //console.log(x);
    x += x;
}
var x = +process.argv[2];
var y = +process.argv[3];
console.log((x + y) / 2);