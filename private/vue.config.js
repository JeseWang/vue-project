module.exports = {
  configureWebpack: {
      devServer: {
          before(app) {
             app.get('/api/goods', function(req,res){
                  res.json({
                      code:0,
                      list: [
                          { id: 1, text: "商品1", price: 200 },
                          { id: 2, text: "商品2", price: 300 }
                      ]
                  })
             }) 
          }
      }
  }
}