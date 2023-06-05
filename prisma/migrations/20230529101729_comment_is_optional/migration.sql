/*
  Warnings:

  - The `status` column on the `requests` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "request_status" AS ENUM ('Active', 'Resolved');

-- AlterTable
ALTER TABLE "requests" ALTER COLUMN "comment" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "request_status" NOT NULL DEFAULT 'Active';

-- DropEnum
DROP TYPE "RequestStatus";
