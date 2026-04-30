-- CreateTable
CREATE TABLE "EmailLead" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT NOT NULL,
    "pagePath" TEXT,
    "name" TEXT,
    "company" TEXT,
    "message" TEXT,
    "tags" TEXT[],
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "confirmedAt" TIMESTAMP(3),
    "tokenHash" TEXT,
    "meta" JSONB,

    CONSTRAINT "EmailLead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadMagnetRequest" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "magnet" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "redeemedAt" TIMESTAMP(3),
    "tokenHash" TEXT,
    "meta" JSONB,

    CONSTRAINT "LeadMagnetRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EmailLead_email_idx" ON "EmailLead"("email");

-- CreateIndex
CREATE INDEX "EmailLead_source_idx" ON "EmailLead"("source");

-- CreateIndex
CREATE INDEX "EmailLead_createdAt_idx" ON "EmailLead"("createdAt");

-- CreateIndex
CREATE INDEX "LeadMagnetRequest_email_idx" ON "LeadMagnetRequest"("email");

-- CreateIndex
CREATE INDEX "LeadMagnetRequest_magnet_idx" ON "LeadMagnetRequest"("magnet");

-- CreateIndex
CREATE INDEX "LeadMagnetRequest_createdAt_idx" ON "LeadMagnetRequest"("createdAt");
