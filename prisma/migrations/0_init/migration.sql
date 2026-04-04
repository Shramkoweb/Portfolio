-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "views" (
    "slug" VARCHAR(128) NOT NULL,
    "count" BIGINT NOT NULL DEFAULT 1,

    CONSTRAINT "views_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "reactions" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(128) NOT NULL,
    "type" VARCHAR(32) NOT NULL,
    "count" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "reactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "waitlist" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "waitlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reactions_slug_type_key" ON "reactions"("slug", "type");

-- CreateIndex
CREATE UNIQUE INDEX "waitlist_email_key" ON "waitlist"("email");

