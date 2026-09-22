import "server-only";
import bcrypt from "bcryptjs";
import type { DemoUser } from "@/lib/types";

/**
 * In-memory demo user store.
 * Swap for Prisma + PostgreSQL in production — see README.
 */
const users: DemoUser[] = [
  {
    id: "demo-1",
    name: "Demo Aspirant",
    email: "demo@itjobprep.bd",
    passwordHash: bcrypt.hashSync("demo1234", 10),
  },
];

export function findUserByEmail(email: string) {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function verifyUser(email: string, password: string) {
  const user = findUserByEmail(email);
  if (!user) return null;
  if (!bcrypt.compareSync(password, user.passwordHash)) return null;
  return user;
}

export function createUser(name: string, email: string, password: string): DemoUser | null {
  if (findUserByEmail(email)) return null;
  const user: DemoUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    passwordHash: bcrypt.hashSync(password, 10),
  };
  users.push(user);
  return user;
}
