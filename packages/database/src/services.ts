import { prisma } from './client';
import type { User, Prisma } from '@prisma/client';

export const userService = {
  // 모든 사용자 조회
  async getUsers() {
    return await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
  },

  // 사용자 생성
  async createUser(data: Prisma.UserCreateInput) {
    return await prisma.user.create({ data });
  },

  // 사용자 조회 (ID로)
  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id }
    });
  },

  // 사용자 업데이트
  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    return await prisma.user.update({
      where: { id },
      data
    });
  },

  // 사용자 삭제
  async deleteUser(id: string) {
    return await prisma.user.delete({
      where: { id }
    });
  }
};