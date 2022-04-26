const mongoose = require("mongoose");

class ContenedorMongoDB {
    constructor(uri, Model) {
        this.uri = uri;
        this.Model = Model;
    }

    async guardar(data) {
        try {
            mongoose.connect(this.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            const nuevaData = new this.Model(data);
            await nuevaData.save();
        } catch (e) {
            console.log(e);
        }
    }

    async getAll() {
        try {
            mongoose.connect(this.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            return await this.Model.find({}, { _id: 0, _v: 0 });
        } catch (e) {
            console.log(e);
        }
    }

    async getById(id) {
        try {
            mongoose.connect(this.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            return await this.Model.find({ id: id }, { _id: 0, _v: 0 });
        } catch (e) {
            console.log(e);
        }
    }

    async deleteById(id) {
        try {
            mongoose.connect(this.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            const deletedCount = await this.Model.deleteOne({ id: id });
            if (deletedCount.deletedCount != 0) {
                return deletedCount;
            } else {
                return "No se ha podido borrar el elemento";
            }
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = ContenedorMongoDB;