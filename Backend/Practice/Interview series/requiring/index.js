//////////  1
require("./exp")

console.log("File required.");

////////////////////  2
//PRINT COMMAND IN COMMAND LINE

const val = require('./exp');

console.log(val);

////////////////////  3

console.log(require("http"));

/////////// 4
const val = require('./exp');
console.log(val.a, val.b)

const {a,b} = require('./exp')
console.log(a,b);

////// 5
require('./exp').fun()

require('./exp')()

////////// 6
require.resolve('./exp')

/////// 7 
require("./exp")
console.log("Index");

///////////////8 
let data = require('./exp').data
setImmediate(() => {
    console.log('The index.js module object is now loaded!', module.loaded)
  });

console.log(module.loaded, module.data);

////////////// 9
console.log(require.extensions)

console.log(require.extensions[".js"].toString())

//////////// 10
console.log(require("module").wrapper);
console.log(__filename);

// console.log(arguments);
function fun(){
    console.log(arguments);
}
fun(1,2,6)

//////// 11
require = function(){
    return {
        mocked: true
    }
}

console.log(require());