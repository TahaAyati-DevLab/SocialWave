
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expire: {
    type: Date,
    required: true,
  },
});

schema.statics.createToken = async function (user) {
  const expireInDays = Number(process.env.REFRESH_TOKEN_EXPIRE);
  const refreshToken = uuidv4();

  const refreshTokenDocument = await this.create({
    token: refreshToken,
    user: user._id,
    expire: new Date(
      Date.now() + expireInDays * 24 * 60 * 60 * 1000
    ),
  });

  return refreshTokenDocument;
};

schema.statics.verifyToken = async function (token) {
  const refreshTokenDocument = await this.findOne({ token });

  if (
    refreshTokenDocument && refreshTokenDocument.expire.getTime() >= Date.now()
  ) {
    return refreshTokenDocument.user;
  }

  return null;
};

const model = mongoose.model("RefreshToken", schema);

module.exports = model;
