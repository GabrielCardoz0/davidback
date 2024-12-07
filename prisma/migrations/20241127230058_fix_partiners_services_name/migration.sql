/*
  Warnings:

  - You are about to drop the `partiners_services` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_fk1";

-- DropForeignKey
ALTER TABLE "partiners_services" DROP CONSTRAINT "partiners_services_fk1";

-- DropTable
DROP TABLE "partiners_services";

-- CreateTable
CREATE TABLE "partners_services" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "partner_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "partners_services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "partners_services" ADD CONSTRAINT "partners_services_fk1" FOREIGN KEY ("partner_id") REFERENCES "partners"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_fk1" FOREIGN KEY ("service_id") REFERENCES "partners_services"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
