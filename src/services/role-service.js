const { FormateData } = require("../utils");
const { PrismaClient } = require("@prisma/client");
const { APIError } = require("../utils/app-errors");

class RoleService {
  constructor() {
    this.prisma = new PrismaClient().role;
  }

  async CreateRole(roleInputs) {
    try {
      const roleResult = await this.prisma.create({ data: roleInputs });
      return FormateData({ roleResult });
    } catch (error) {
      throw new APIError("Create Role Failed");
    }
  }

  async GetRoles() {
    try {
      const roles = await this.prisma.findMany();
      return FormateData({ roles });
    } catch (error) {
      throw new APIError("Get Role Failed");
    }
  }

  async GetRoleById(roleId) {
    try {
      const role = await this.prisma.findUnique({ where: { id: roleId } });
      return FormateData({ role });
    } catch (error) {
      throw new APIError("Get Role Failed");
    }
  }

  async UpdateRole(roleInputs) {
    const { roleId, name } = roleInputs;
    try {
      const role = await this.prisma.update({
        where: {
          id: roleId,
        },
        data: {
          name: name,
        },
      });
      return FormateData({ role });
    } catch (error) {
      throw new APIError("Update Role Failed");
    }
  }

  async DeleteRole(roleId) {
    try {
      const role = await this.prisma.delete({
        where: {
          id: roleId,
        },
      });
      return FormateData({ role });
    } catch (error) {
      throw new APIError("Delete Role Failed");
    }
  }
}

module.exports = RoleService;
