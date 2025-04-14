-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_shift_id_fkey";

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "shiftId" INTEGER,
ADD COLUMN     "user_name" TEXT;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift"("id") ON DELETE SET NULL ON UPDATE CASCADE;
