const bcrypt = require("bcrypt");
const User = require("../../models/User");
const generateToken = require("../../helpers/generateToken");
const cryptPassword = require("../../helpers/cryptPassword");
const ensureUserIsLogged = require("../validators");
const db = require("../../models");
const authenticateUser = require("../../middlewares/authenticateUser"); // Importez votre middleware d'authentification

const resolvers = {
  Query: {
    getDevis: async (parent, args, context, info) => {
      ensureUserIsLogged(context);
      const devis = await db.Devi.findAll({
        where: { userId: context.user.id },
        include: [{ model: db.User, as: "user" }],
      });
      if (devis.length === 0) {
        const error = new Error("No devis found");
        error.extensions.code = "NOT_FOUND";
        throw error;
      }
      return devis;
    },
    getDevi: async (parent, args, context, info) => {
      ensureUserIsLogged(context);
      const devi = await db.Devi.findOne({
        where: { id: args.id, userId: context.user.id },
        include: [{ model: db.User, as: "user" }],
      });
      if (!devi) {
        const error = new Error("Devi not found");
        error.extensions.code = "NOT_FOUND";
        throw error;
      }
      return devi;
    },
  },
  Mutation: {
    registerUser: async (parent, args, context, info) => {
      const { mail, password, firstName, lastName } = args.user;
      const hashedPassword = await cryptPassword(password);
      if (hashedPassword) {
        const user = await db.User.create({
          firstName,
          lastName,
          mail,
          password: hashedPassword,
        });
        if (user) {
          const token = generateToken({ id: user.id });
          if (token) {
            return {
              token: token,
              success: true,
            };
          }
        }
      }
      throw new Error("Error in user registration");
    },
    login: async (parent, { email, password }, context, info) => {
      console.log("email: ", email);
      console.log("User: ", db.User);

      const user = await db.User.findOne({ where: { mail: email } });
      if (!user) {
        throw new Error("Invalid email or password");
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error("Invalid email or password");
      }
      const token = generateToken({ userId: user.id });
      return {
        token,
        user,
      };
    },

    getMe: async (parent, args, context, info) => {
        const { req, user } = context;
        console.log("req: ", req);
        console.log("user: ", user);

      try {
        if (!req.headers.authorization) {
          throw new Error("Authorization header missing");
        }

        const token = req.headers.authorization.split(" ")[1];
        console.log("token: ", token);
        const decodedToken = verifyToken(token);
        console.log("decodedToken: ", decodedToken);

        // Ici, vous avez accès aux informations de l'utilisateur décodées depuis le token
        // Vous pouvez maintenant utiliser ces informations pour récupérer l'utilisateur depuis la base de données
        const userId = decodedToken.userId;
        const user = await db.User.findByPk(userId, {
          include: [{ model: db.Devi, as: "devis" }],
        });

        return user;
      } catch (error) {
        console.error("Failed to get user:", error);
        throw new Error("Failed to get user");
      }
    },

    createDevi: async (parent, args, context, info) => {
      ensureUserIsLogged(context);
      const { eventType, service, numberOfGuests, date, totalAmount } =
        args.devi;
      const newDevi = await db.Devi.create({
        eventType,
        service,
        numberOfGuests,
        date,
        totalAmount,
        userId: context.user.id,
      });
      return newDevi;
    },
    updateDevi: async (parent, args, context, info) => {
      ensureUserIsLogged(context);
      const { eventType, service, numberOfGuests, date, totalAmount } =
        args.devi;
      const updatedDevi = await db.Devi.update(
        { eventType, service, numberOfGuests, date, totalAmount },
        { where: { id: args.id, userId: context.user.id } }
      );
      if (updatedDevi[0] === 0) {
        const error = new Error("Devi not found");
        error.extensions.code = "NOT_FOUND";
        throw error;
      }
      return await db.Devi.findByPk(args.id);
    },
    deleteDevi: async (parent, args, context, info) => {
      ensureUserIsLogged(context);
      const deletedDevi = await db.Devi.destroy({
        where: { id: args.id, userId: context.user.id },
      });
      if (deletedDevi === 0) {
        const error = new Error("Devi not found");
        error.extensions.code = "NOT_FOUND";
        throw error;
      }
      return {
        success: true,
        message: "Devi deleted successfully",
      };
    },
  },
};

module.exports = resolvers;
