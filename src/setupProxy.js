const proxy = require('http-proxy-middleware')

module.exports = function(app){
    app.use(proxy('/generate', { target: 'https://glrsc-system-1-27a1742ceb52.herokuapp.com'}));
    app.use(proxy('/login_token', { target: 'https://glrsc-system-1-27a1742ceb52.herokuapp.com'}));
    app.use(proxy('/delete', { target: 'https://glrsc-system-1-27a1742ceb52.herokuapp.com'}));
    app.use(proxy('/password', { target: 'https://glrsc-system-1-27a1742ceb52.herokuapp.com'}));
    app.use(proxy('/logout', { target: 'https://glrsc-system-1-27a1742ceb52.herokuapp.com'}));
    app.use(proxy('/account', { target: 'https://glrsc-system-1-27a1742ceb52.herokuapp.com'}));
    app.use(proxy('/store_location', { target: 'https://glrsc-system-1-27a1742ceb52.herokuapp.com'}));
}