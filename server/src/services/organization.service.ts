import { Organization } from "../models/organization.model";
import { User } from "../models/user.model";

export const createOrganization = async (
  name: string,
  ownerId: string
) => {
  return Organization.create({
    name,
    owner: ownerId,
    members: [
      {
        user: ownerId,
        role: "OWNER",
      },
    ],
  });
};

export const getOrganizations = async (
  userId: string
) => {
  return Organization.find({
    "members.user": userId,
  });
};

export const getOrganizationRole = async (
  organizationId: string,
  userId: string
) => {
  const organization = await Organization.findById(
    organizationId
  );

  if (!organization) {
    return null;
  }

  const membership = organization.members.find(
    (member) =>
      member.user.toString() === userId
  );

  return membership?.role || null;
};

export const inviteMember = async (
  organizationId: string,
  email: string,
  role: "OWNER" | "ADMIN" | "MEMBER"
) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const organization = await Organization.findById(
    organizationId
  );

  if (!organization) {
    throw new Error("Organization not found");
  }

  const alreadyMember = organization.members.some(
    (member: any) =>
      member.user.toString() ===
      user.id
  );

  if (alreadyMember) {
    throw new Error("User is already a member");
  }

  organization.members.push({
    user: user.id,
    role,
  } as any);

  await organization.save();

  return organization;
};

export const listMembers = async (
  organizationId: string
) => {
  const organization = await Organization.findById(
    organizationId
  ).populate("members.user", "name email");

  if (!organization) {
    throw new Error("Organization not found");
  }

  return organization.members.map((member: any) => {
    const user = member.user;
    return {
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: member.role,
    };
  });
};

export const changeMemberRole = async (
  organizationId: string,
  memberId: string,
  role: "OWNER" | "ADMIN" | "MEMBER"
) => {
  const organization = await Organization.findById(
    organizationId
  );

  if (!organization) {
    throw new Error("Organization not found");
  }

  const member = organization.members.find(
    (member: any) =>
      member.user.toString() ===
      memberId
  );

  if (!member) {
    throw new Error("Member not found");
  }

  member.role = role;
  await organization.save();

  return organization;
};

export const removeMember = async (
  organizationId: string,
  memberId: string
) => {
  const organization = await Organization.findById(
    organizationId
  );

  if (!organization) {
    throw new Error("Organization not found");
  }

  organization.members = organization.members.filter(
    (member: any) =>
      member.user.toString() !==
      memberId
  );

  await organization.save();

  return organization;
};
