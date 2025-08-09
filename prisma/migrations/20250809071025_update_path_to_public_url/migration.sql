/*
  Warnings:

  - You are about to drop the column `path` on the `Files` table. All the data in the column will be lost.
  - Added the required column `publicUrl` to the `Files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Files" DROP COLUMN "path",
ADD COLUMN     "publicUrl" TEXT NOT NULL;
