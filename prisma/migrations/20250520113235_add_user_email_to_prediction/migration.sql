/*
  Warnings:

  - Added the required column `user_email` to the `predictions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "predictions" DROP CONSTRAINT "predictions_user_id_fkey";

-- AlterTable
ALTER TABLE "predictions" ADD COLUMN     "user_email" TEXT NOT NULL;
