/*
  Warnings:

  - The values [SUPER_ADMIN,ADMIN,TEACHER,STUDENT] on the enum `Roles` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Roles_new" AS ENUM ('Super_Admin', 'Admin', 'Teacher', 'Student');
ALTER TABLE "public"."users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Roles_new" USING ("role"::text::"Roles_new");
ALTER TYPE "Roles" RENAME TO "Roles_old";
ALTER TYPE "Roles_new" RENAME TO "Roles";
DROP TYPE "public"."Roles_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'Student';
COMMIT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'Student';
