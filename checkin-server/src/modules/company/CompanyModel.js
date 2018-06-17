// @flow

import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hashes: {
      type: [String],
      required: true,
    },
    location: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number, Number], default: [0, 0] },
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'company',
  },
);

Schema.index({ location: '2dsphere' });

export default mongoose.model('Company', Schema);
