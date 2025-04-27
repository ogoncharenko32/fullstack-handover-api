-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "status" SET DEFAULT 'In Progress';

-- CreateTable
CREATE TABLE "Maintenance" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "pre_scm_summary_total" TEXT,
    "post_scm_summary_total" TEXT,
    "pre_scm_summary_total_count" INTEGER,
    "post_scm_summary_total_count" INTEGER,
    "pre_rpd" TEXT,
    "post_rpd" TEXT,
    "pre_cm_partial" INTEGER,
    "post_cm_partial" INTEGER,
    "pre_cpe_total_count" INTEGER,
    "post_cpe_total_count" INTEGER,
    "pre_cpe_erouter_count" INTEGER,
    "post_cpe_erouter_count" INTEGER,
    "pre_cpe_cpe_count" INTEGER,
    "post_cpe_cpe_count" INTEGER,
    "pre_cpe_edva_count" INTEGER,
    "post_cpe_edva_count" INTEGER,
    "pre_cpe_emta_count" INTEGER,
    "post_cpe_emta_count" INTEGER,
    "pre_cpe_estb_count" INTEGER,
    "post_cpe_estb_count" INTEGER,
    "pre_cpe_d4_count" INTEGER,
    "post_cpe_d4_count" INTEGER,
    "pre_cpe_d6_count" INTEGER,
    "post_cpe_d6_count" INTEGER,
    "pre_cpe_exclude_d4d6" TEXT,
    "post_cpe_exclude_d4d6" TEXT,

    CONSTRAINT "Maintenance_pkey" PRIMARY KEY ("id")
);
