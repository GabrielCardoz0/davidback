/*
  Warnings:

  - You are about to drop the column `service_id` on the `check_ins` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_fk1";

-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "service_id",
ADD COLUMN     "service" TEXT;
