/*
  Warnings:

  - Added the required column `fileName` to the `Files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Files" ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "size" DOUBLE PRECISION NOT NULL;
