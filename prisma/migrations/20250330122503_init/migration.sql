/*
  Warnings:

  - Added the required column `team_id` to the `Shift` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shift" ADD COLUMN     "team_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
