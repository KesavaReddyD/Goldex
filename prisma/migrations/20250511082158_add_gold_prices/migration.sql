-- CreateTable
CREATE TABLE "gold_prices" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "open_price" DOUBLE PRECISION NOT NULL,
    "high_price" DOUBLE PRECISION NOT NULL,
    "low_price" DOUBLE PRECISION NOT NULL,
    "close_price" DOUBLE PRECISION NOT NULL,
    "volume" INTEGER,
    "change_amount" DOUBLE PRECISION,
    "change_percent" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gold_prices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gold_prices_date_key" ON "gold_prices"("date");

-- CreateIndex
CREATE INDEX "gold_prices_date_idx" ON "gold_prices"("date");
