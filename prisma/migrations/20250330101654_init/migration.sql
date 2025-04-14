/*
  Warnings:

  - You are about to drop the column `updated_at` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "updated_at";
