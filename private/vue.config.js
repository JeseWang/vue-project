module.exports = {
  configureWebpack: {
    devServer: {
      before(app) {
        app.use(function (req, res, next) {
          // 检查token
          if (/^\/api/.test(req.path)) { // 之校验/api开头的请求
            console.log(req.headers.token)
            if (req.path == '/api/login' || req.headers.token) {
              next();
            } else {
              res.sendStatus(401); // 错误状态提示用户需要登录
            }
          } else {
            next()
          }
        })

        app.get('/api/goods', function (req, res) {
          res.json({
            code: 0,
            list: [
              { id: 1, text: "商品1", price: 200 },
              { id: 2, text: "商品2", price: 300 }
            ]
          })
        })

        app.get('/api/login', function (req, res) {
          const { username, password } = req.query
          if (username === 'admin' && password === '123') {
            res.json({
              code: 0,
              token: 'jesse'
            })
          } else {
            res.json({
              code: 1,
              message: '用户名或密码错误'
            })
          }
        })

        app.get('/api/logout', function (req, res) {
          res.json({ code: -1 })
        })
      }
    }
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
