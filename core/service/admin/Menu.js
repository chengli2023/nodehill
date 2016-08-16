/**
 * Created by licheng on 16/8/16.
 */
exports = module.exports = {}
exports.resSorter = function(menuObjs,pid,startLevel){
    let results = [];
    function todo(pid,nlevel){
        let arrtmp = []
        for(let i = 0; i < menuObjs.length; i ++){
            let menuObj = menuObjs[i]
            if(menuObj.pid == pid){
                arrtmp.push(menuObj)
            }
            continue
        }

        arrtmp.sort((a,b)=>{
            return a.order - b.order
        })
        for(let i = 0; i < arrtmp.length; i ++){

            arrtmp[i].nlevel = nlevel;
            results.push(arrtmp[i])
            todo(arrtmp[i].id,nlevel + 1)
        }
    }
    todo(pid,startLevel)
    return results;

}