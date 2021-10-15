const path = require('path')
const { Storage, Utils, Task } = require('copha')

class File extends Storage {
    static CONFIG = require('./config.json')
    constructor(taskConf) {
        super(taskConf)
    }

    #getDetailPath(id){
        const filename = `${id}.json`
        const detailPath = this.taskConf.main.dataPath ? path.join(this.taskConf.main.dataPath,'detail') : Task.getPath(this.taskConf.main.name,'detail_dir')
        return path.join(detailPath, filename)
    }

    #getPath(name){
        const pathList = {
            saveDetailDataDir: this.taskConf.main.dataPath ? path.join(this.taskConf.main.dataPath,'detail') : Task.getPath(this.taskConf.main.name,'detail_dir')
        }
        return pathList[name]
    }

    async init(){}

    async findById(id){
        const isExist = await Utils.checkFile(this.#getDetailPath(id))
        return isExist ? Utils.readJson(this.#getDetailPath(id)) : null
    }

    async all(){
        return (await Utils.readDir(this.#getPath('saveDetailDataDir')))
            .filter(f => f.endsWith('.json'))
            .map(f => path.join(this.#getPath('saveDetailDataDir'), f))
    }

    async save({data,id}){
        await Utils.saveJson(data, this.#getDetailPath(id))
    }

    async close(){}
}
module.exports = File
