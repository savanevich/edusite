import * as Mongoose from 'mongoose';

export interface JobDocument {
    queue: string;
    type: string;
    createdAt: Date;
}

interface JobMongoDocument extends Mongoose.Document, JobDocument {
    _id: string;
}

const JobSchema: Mongoose.Schema = new Mongoose.Schema({
    queue: { type: String, required: true, index: true },
    type: { type: String, required: true, index: true },
    createdAt: { type: Date }
});

JobSchema.pre('save', (next: Function) => {
    this.createdAt = new Date();
    next();
});

Mongoose.model('Job', JobSchema);

export const JobModel: Mongoose.Model<JobMongoDocument> = Mongoose.model('Job');