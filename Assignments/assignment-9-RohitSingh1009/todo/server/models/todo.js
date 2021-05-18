import mongoose from 'mongoose';
// Setting the schema i.e the datatype and if the field is required or not.
const ToDoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: "This field is required"
        },
        description: {
            type: String
        },
        dueDate: {
            type: Date
            
           
        },
        time: {
            type: String
      
        },
        isCompleted:{
            type: Boolean,
            default:false
        }
    },
    {
        versionKey: false
    }
);

ToDoSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

ToDoSchema.set('toJSON', { virtuals: true });

const model = mongoose.model('Todo', ToDoSchema);

export default model;
