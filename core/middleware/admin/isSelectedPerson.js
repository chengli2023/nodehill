
var co = require('co');
exports = module.exports = (req,res,next) => {
    let personId = req.query['personId'];
    if(personId && personId.length > 0){
        res.cookie('personId', personId, { path: '/admin', httpOnly: true,expires: new Date(Date.now() + 900000000) });
        req.$personId = personId;
        next();
        return;
    }else{
        if(!req.cookies['personId'] || req.cookies['personId'] == 'undefined'){
            res.redirect('/admin/search')
            return;
        }else{
            req.$personId = req.cookies['personId'];
            next();
        }

    }
}
