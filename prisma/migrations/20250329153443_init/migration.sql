/*
  Warnings:

  - Added the required column `updated_at` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `impotant` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "impotant" BOOLEAN NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
