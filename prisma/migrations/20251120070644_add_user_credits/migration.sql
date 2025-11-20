-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "aiCredits" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "basicCredits" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "creditsResetAt" TIMESTAMP(3);
