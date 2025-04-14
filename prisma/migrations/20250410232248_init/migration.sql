/*
  Warnings:

  - You are about to drop the column `team_id` on the `Shift` table. All the data in the column will be lost.
  - You are about to drop the column `team_id` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `team_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Shift` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Shift" DROP CONSTRAINT "Shift_team_id_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_team_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_team_id_fkey";

-- AlterTable
ALTER TABLE "Shift" DROP COLUMN "team_id",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "team_id";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "team_id";

-- DropTable
DROP TABLE "Team";
