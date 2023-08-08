import { Schema, model } from 'mongoose'
import { INote, NoteModel } from './notes.interface'

const noteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    note: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Note = model<INote, NoteModel>('Notes', noteSchema)
