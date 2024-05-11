-- CreateEnum
CREATE TYPE "CredType" AS ENUM ('USERNAME_PASSWORD');

-- CreateTable
CREATE TABLE "Cred" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "CredType" NOT NULL,
    "cred" JSONB NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cred_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cred" ADD CONSTRAINT "Cred_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
