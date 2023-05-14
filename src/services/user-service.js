const {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
  DecodeSignature,
} = require("../utils");
const { APIError } = require("../utils/app-errors");
const { PrismaClient } = require("@prisma/client");

// bussiness logic here
class UserService {
  constructor() {
    this.prisma = new PrismaClient().user;
  }

  async GetUsers() {
    try {
      const users = await this.prisma.findMany({
        select: { id: true, username: true, role: true },
      });
      return FormateData({ users });
    } catch (error) {
      throw new APIError("Get Users Failed", error);
    }
  }

  async GetUserById(userId) {
    try {
      const user = await this.prisma.findUnique({
        where: {
          id: userId,
        },
        select: { id: true, username: true, role: true },
      });
      return FormateData({ user });
    } catch (error) {
      throw new APIError("Get User Failed");
    }
  }

  async DeleteUser(userId) {
    try {
      const user = await this.prisma.delete({
        where: {
          id: userId,
        },

        select: {
          id: true,
          username: true,
        },
      });
      return FormateData({ user });
    } catch (error) {
      throw new APIError("Delete Users Failed", error);
    }
  }

  async UpdateUser(userInputs) {
    const { userId, username, password, role } = userInputs;

    try {
      const existingUser = await this.prisma.findUnique({
        where: {
          id: userId,
        },
      });

      const newPassword = await GeneratePassword(password, existingUser.salt);

      const updateUser = await this.prisma.update({
        where: { id: userId },
        data: { username, password: newPassword, roleId: role },
      });

      return FormateData({ id: updateUser.id });
    } catch (error) {
      throw new APIError("Update Failed", error);
    }
  }

  async SignUp(userInputs) {
    const { username, password, role } = userInputs;

    try {
      let salt = await GenerateSalt();

      let userPassword = await GeneratePassword(password, salt);

      const existingUser = await this.prisma.create({
        data: { username, password: userPassword, salt, roleId: role },
      });

      return FormateData({ id: existingUser.id });
    } catch (error) {
      throw new APIError("SignUp Failed", 401);
    }
  }

  async ValidateUser(userInputs) {
    try {
      const payload = await DecodeSignature(userInputs);
      return FormateData({ payload });
    } catch (error) {
      throw new APIError("user not found");
    }
  }

  async SignIn(userInputs) {
    const { username, password } = userInputs;

    try {
      const existingUser = await this.prisma.findUnique({
        where: {
          username,
        },
        include: {
          role: true,
        },
      });

      if (existingUser) {
        const validPassword = await ValidatePassword(
          password,
          existingUser.password,
          existingUser.salt
        );

        if (validPassword) {
          const token = await GenerateSignature({
            username: existingUser.username,
            id: existingUser.id,
          });

          return FormateData({
            id: existingUser.id,
            username: existingUser.username,
            role: existingUser.role.name,
            token,
          });
        }
      }
      return FormateData(null);
    } catch (error) {
      throw new APIError("SignIn Failed", 401, "wrong username or password");
    }
  }
}

module.exports = UserService;
