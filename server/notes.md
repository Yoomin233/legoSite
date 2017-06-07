### Schema
schema defines data structure, as well as instance methods, model methods, compound indexes, and lifecycle hooks.
Defined on model (`var blog = mongoose.model('modelName', schemaName)`)

#### instance methods
you can define instance methods on the moment of schema definition. It will avaialble on the model instances.
```JavaScript
animalSchema.methods.findSimilarTypes = function(cb) {
  return this.model('Animal').find({ type: this.type }, cb);
};
```

#### static methods
you can also add static methods.

#### virtual properties
```JavaScript
schema.virtual('virtualPropertyName').get(function () {
    return `${this.prop1}, ${this.prop2}`
})
// result ->
console.log(document.virtualPropertyName)
```
you can also set virtual properties setters. for example `schema.virtual('virtualPropertyName').set((val) => {})`...
however, you cant query on virtual properties.

#### alias
```JavaScript
const schema = new Schema({
  n: {
    type: String,
    alias: 'name'
  }
})
// set 'name' -> set 'n', get 'name' -> get 'n'
```

--------

#### schema options
schema options can be passed as second value.  
```JavaScript
const mySchema = new Sehema({types...}, optionObject)
```
for detailed possible settings, ==see== [here](http://mongoosejs.com/docs/guide.html).
schema types: `required, default, select, validate, get, set, alias`. see [here](http://mongoosejs.com/docs/schematypes.html).

#### module(node api)
模块导出: `exports.varName`
默认模块导出: `module.exports`

#### MVC
routes forward request to controllers, controllers combine model and view and render the response, and send it to the end-user.

#### MongoDB queries syntax
##### `find` method
`Model.find(conditions, [fields], [options], [callback])`
for example
