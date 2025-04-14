/*
  Warnings:

  - Added the required column `team_id` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "team_id" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'in progress',
ALTER COLUMN "important" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
