import * as Mongoose from 'mongoose';

const EmailTemplateSchema: Mongoose.Schema = new Mongoose.Schema({
    alias: { type: String, required: true, index: true },
    template: { type: String, required: true }
});

export default Mongoose.model('EmailTemplate', EmailTemplateSchema);
