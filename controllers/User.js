const User = require("../models/User");
const {
  validateUserSignupInput,
  validateUserLoginInput,
} = require("../validator/validator");
const { EncryptPassword, DecryptPassword } = require("../utils/authentication");
const { GenerateToken } = require("../utils/authorization");
const _ = require("lodash");
const automl = require("@google-cloud/automl");
const key = require("../key/smart-arc-326202-9ae1376f0fc4.json");
const fs = require("fs");
const { encode } = require("punycode");

const Signup = async (req, res) => {
  try {
    const validated = await validateUserSignupInput.validateAsync(req.body);
    const { email, password, firstname, lastname } = validated;

    const isUserAvailable = await User.findOne({ email });
    if (isUserAvailable)
      return res.status(400).send("user with email already exist");

    const encryptedPassword = await EncryptPassword(password);

    const user = {
      firstname,
      lastname,
      email,
      password: encryptedPassword,
    };

    const created = await User.create(user);
    const token = GenerateToken(created);

    return res.status(200).send({
      data: _.pick(created, ["email", "firstname", "lastname", "createdAt"]),
      accessToken: token,
    });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const Login = async (req, res) => {
  try {
    const validated = await validateUserLoginInput.validateAsync(req.body);
    const { email, password } = validated;

    const isAvailable = await User.findOne({ email });
    if (!isAvailable) return res.status(400).send("invalid email or password");

    const isValidPassword = await DecryptPassword(
      password,
      isAvailable.password
    );
    if (!isValidPassword)
      return res.status(400).send("invalid email or password");

    const token = GenerateToken(isAvailable);

    return res.status(200).send({
      data: _.pick(
        isAvailable,
        ["email"],
        ["createdAt"],
        ["firstname"],
        ["lastname"]
      ),
      token,
    });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const PredictImage = async (req, res) => {
  try {
    const client = new automl.PredictionServiceClient({
      keyFilename: "../key/smart-arc-326202-9ae1376f0fc4.json",
    });

   
    
    const payload = {};
    payload.image = {imageBytes: req.body.image}


    const projectId = `132784863187`;
    const modelId = `ICN4971892624756572160`;
    const computeRegion = `us-central1`;

    
    const modelFullId = client.modelPath(projectId, computeRegion, modelId);
 
    const [response] = await client.predict({
      name: modelFullId,
      payload: payload,
      
    });

    console.log(response);

    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send(error)
  }
};

module.exports = {
  Signup,
  Login,
  PredictImage,
};
