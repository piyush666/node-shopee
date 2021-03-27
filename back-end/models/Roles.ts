import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  roleName: {
    type: String,
    required: true,
  },
  apis: [String],
  RouteAccess: [String],
});

const RoleModel = mongoose.model("roles", roleSchema);

export default RoleModel;
