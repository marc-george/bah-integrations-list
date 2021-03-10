# \<bah-polymer-component-seed\>



## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. To make sure it is setup properly, run `polymer serve` to serve your application locally.

## Install dependencies

Download all dependencies

```
$ npm install && bower install
```

## Viewing Your Component

To build your SASS, watch for SASS changes, and serve your component, use the below gulp task.

```
$ gulp serve
```

## Building SASS

You can compile SASS into CSS by using the below gulp task.

```
$ gulp sass
```

## Running Tests

To test your component, update the tests found in the test directory. Then run the below command.

```
$ wct
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester).
