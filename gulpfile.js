var gulp = require("gulp");
var webpack = require("webpack");

var WebpackDevServer = require("webpack-dev-server");
var opn = require("opn");

gulp.task("server", function() {
  console.log('LOOL !')
  console.log('start');

  var myConfig = require("./webpack.config");

  new WebpackDevServer(webpack(myConfig), {
    contentBase: './docs',
    hot:true,
    stats: {
      color: true,
    }
  }).listen('8081', '0.0.0.0', function(err, result){
    if(err) {
      console.log(err)
    } else {
      const server_url = `http:0.0.0.0:8081`;
      opn(server_url)
    }
  })

})
