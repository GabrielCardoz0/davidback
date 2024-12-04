-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "cep" VARCHAR(30) NOT NULL,
    "street" VARCHAR(180) NOT NULL,
    "neighborhood" VARCHAR(180) NOT NULL,
    "city" VARCHAR(180) NOT NULL,
    "state" VARCHAR(10) NOT NULL,
    "number" VARCHAR(10) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT '2024-02-19'::date,
    "updated_at" DATE NOT NULL DEFAULT '2024-02-19'::date,

    CONSTRAINT "addresses_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colaborator_services" (
    "id" SERIAL NOT NULL,
    "colaborator_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    "frequency_id" INTEGER NOT NULL,

    CONSTRAINT "colaborator_services_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colaborators" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "cpf" VARCHAR(30) NOT NULL,
    "genre" VARCHAR(10) NOT NULL,
    "email" VARCHAR(220) NOT NULL,
    "tel" VARCHAR(120) NOT NULL,
    "birthday" VARCHAR(120) NOT NULL,
    "company_name" VARCHAR(120) NOT NULL,
    "registered" BOOLEAN NOT NULL DEFAULT false,
    "form_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,
    "created_at" DATE NOT NULL DEFAULT '2024-02-19'::date,
    "updated_at" DATE NOT NULL DEFAULT '2024-02-19'::date,

    CONSTRAINT "colaborators_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_services" (
    "id" SERIAL NOT NULL,
    "form_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,

    CONSTRAINT "form_services_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forms" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "identify" VARCHAR(220) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT '2024-02-19'::date,
    "updated_at" DATE NOT NULL DEFAULT '2024-02-19'::date,
    "is_deleted" BOOLEAN DEFAULT false,

    CONSTRAINT "forms_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "frequencies" (
    "id" SERIAL NOT NULL,
    "frequency" VARCHAR(120) NOT NULL,
    "service_id" INTEGER NOT NULL,
    "created_at" DATE NOT NULL DEFAULT '2024-02-19'::date,
    "updated_at" DATE NOT NULL DEFAULT '2024-02-19'::date,
    "value" INTEGER,

    CONSTRAINT "frequencies_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(180) NOT NULL,
    "base_price" REAL NOT NULL,
    "colaborator_percent" REAL NOT NULL,
    "colaborator_value" REAL NOT NULL,
    "repass_percent" REAL NOT NULL,
    "repass_value" REAL NOT NULL,
    "profit" REAL NOT NULL,
    "genre" VARCHAR(20) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT '2024-02-19'::date,
    "updated_at" DATE NOT NULL DEFAULT '2024-02-19'::date,
    "description" TEXT,

    CONSTRAINT "services_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "password" VARCHAR(180) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT '2024-02-19'::date,
    "updated_at" DATE NOT NULL DEFAULT '2024-02-19'::date,
    "name" VARCHAR(120),

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "colaborator_services" ADD CONSTRAINT "colaborator_services_fk0" FOREIGN KEY ("colaborator_id") REFERENCES "colaborators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "colaborator_services" ADD CONSTRAINT "colaborator_services_fk1" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "colaborator_services" ADD CONSTRAINT "colaborator_services_fk2" FOREIGN KEY ("frequency_id") REFERENCES "frequencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "colaborators" ADD CONSTRAINT "colaborators_fk0" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "colaborators" ADD CONSTRAINT "colaborators_fk1" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "form_services" ADD CONSTRAINT "form_services_fk0" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "form_services" ADD CONSTRAINT "form_services_fk1" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "frequencies" ADD CONSTRAINT "frequencies_fk0" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
