-- AlterTable
ALTER TABLE "Trip" ADD COLUMN "source" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Trip" ADD COLUMN "destination" TEXT NOT NULL DEFAULT '';

-- Remove default after adding columns (they should be required in application code)
ALTER TABLE "Trip" ALTER COLUMN "source" DROP DEFAULT;
ALTER TABLE "Trip" ALTER COLUMN "destination" DROP DEFAULT;
