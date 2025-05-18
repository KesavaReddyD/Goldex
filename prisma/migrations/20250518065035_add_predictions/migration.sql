-- CreateTable
CREATE TABLE "predictions" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "sentimentScore" DOUBLE PRECISION NOT NULL,
    "sentimentLabel" TEXT NOT NULL,
    "pricePrediction" TEXT NOT NULL,
    "short_term_timeframe" TEXT NOT NULL,
    "short_term_trend" TEXT NOT NULL,
    "short_term_open" DOUBLE PRECISION NOT NULL,
    "short_term_close" DOUBLE PRECISION NOT NULL,
    "short_term_high" DOUBLE PRECISION NOT NULL,
    "short_term_low" DOUBLE PRECISION NOT NULL,
    "short_term_sentiment_score" DOUBLE PRECISION NOT NULL,
    "short_term_sentiment_category" TEXT NOT NULL,
    "short_term_sentiment_reasons" TEXT NOT NULL,
    "long_term_timeframe" TEXT NOT NULL,
    "long_term_trend" TEXT NOT NULL,
    "long_term_open" DOUBLE PRECISION NOT NULL,
    "long_term_close" DOUBLE PRECISION NOT NULL,
    "long_term_high" DOUBLE PRECISION NOT NULL,
    "long_term_low" DOUBLE PRECISION NOT NULL,
    "long_term_sentiment_score" DOUBLE PRECISION NOT NULL,
    "long_term_sentiment_category" TEXT NOT NULL,
    "long_term_sentiment_reasons" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "predictions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "predictions" ADD CONSTRAINT "predictions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
