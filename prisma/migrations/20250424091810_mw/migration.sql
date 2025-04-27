/*
  Warnings:

  - The `pre_scm_summary_total` column on the `Maintenance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `post_scm_summary_total` column on the `Maintenance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pre_rpd` column on the `Maintenance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `post_rpd` column on the `Maintenance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pre_cpe_exclude_d4d6` column on the `Maintenance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `post_cpe_exclude_d4d6` column on the `Maintenance` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Maintenance" DROP COLUMN "pre_scm_summary_total",
ADD COLUMN     "pre_scm_summary_total" INTEGER,
DROP COLUMN "post_scm_summary_total",
ADD COLUMN     "post_scm_summary_total" INTEGER,
DROP COLUMN "pre_rpd",
ADD COLUMN     "pre_rpd" INTEGER,
DROP COLUMN "post_rpd",
ADD COLUMN     "post_rpd" INTEGER,
DROP COLUMN "pre_cpe_exclude_d4d6",
ADD COLUMN     "pre_cpe_exclude_d4d6" INTEGER,
DROP COLUMN "post_cpe_exclude_d4d6",
ADD COLUMN     "post_cpe_exclude_d4d6" INTEGER;
