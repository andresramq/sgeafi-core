-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('INACTIVE', 'ACTIVE');

-- CreateTable
CREATE TABLE "accounts" (
    "id" UUID NOT NULL,
    "code" BIGSERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "status" "AccountStatus" NOT NULL DEFAULT 'INACTIVE',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_code_key" ON "accounts"("code");

ALTER SEQUENCE public.accounts_code_seq
RESTART WITH 100000000001;