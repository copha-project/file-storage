const path = require('path')

class File {
    static CONFIG = require('./config')

    async init(){
        this.utils = this.helper.utils
    }

    async findById(id){
        const filePath = path.join(this.getPath('detail_dir'),`${id}.json`)
        const isExist = await this.utils.checkFile(filePath)
        return isExist ? this.utils.readJson(filePath) : null
    }

    async all(){
        return (await this.utils.readDir(this.getPath('detail_dir')))
            .filter(f => f.endsWith('.json'))
            .map(f => path.join(this.getPath('detail_dir'), f))
    }

    async save({data,id}){
        const filePath = path.join(this.getPath('detail_dir'),`${id}.json`)
        await this.utils.saveJson(data, filePath)
    }

    async close(){}
}
module.exports = File
