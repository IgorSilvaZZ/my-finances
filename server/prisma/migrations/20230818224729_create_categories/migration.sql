-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "historicId" TEXT,
    CONSTRAINT "Category_historicId_fkey" FOREIGN KEY ("historicId") REFERENCES "Historic" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
