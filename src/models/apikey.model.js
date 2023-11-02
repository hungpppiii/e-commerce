"use strict";

import mongoose from "mongoose";
import { Permissions } from "../utils/constantType";

const DOCUMENT_NAME = "ApiKey";
const COLLECTION_NAME = "ApiKeys";

var apiKeySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      require: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      require: true,
      enum: Object.values(Permissions),
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export default mongoose.model(DOCUMENT_NAME, apiKeySchema);
