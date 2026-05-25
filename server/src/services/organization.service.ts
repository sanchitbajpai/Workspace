import { Organization } from "../models/organization.model";

export const createOrganization = async (
  name: string,
  ownerId: string
) => {
  return Organization.create({
    name,
    owner: ownerId,
    members: [ownerId],
  });
};

export const getOrganizations =
  async (userId: string) => {
    return Organization.find({
      members: userId,
    });
  };
