/*
  Warnings:

  - You are about to drop the column `file` on the `Files` table. All the data in the column will be lost.
  - Added the required column `path` to the `Files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Files" DROP COLUMN "file",
ADD COLUMN     "path" TEXT NOT NULL;
