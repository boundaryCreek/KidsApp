-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('VENUE', 'ORGANIZATION', 'FACILITY', 'OUTDOOR', 'ONLINE');

-- CreateEnum
CREATE TYPE "AccessibilityFeature" AS ENUM ('WHEELCHAIR_ACCESSIBLE', 'STROLLER_FRIENDLY', 'SENSORY_FRIENDLY', 'ASL_INTERPRETER_AVAILABLE', 'OTHER');

-- CreateEnum
CREATE TYPE "ParkingType" AS ENUM ('FREE', 'PAID', 'STREET', 'NONE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'PARENT', 'ORGANIZER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "cities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_lists" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activity_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location_lists" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "location_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "name" TEXT,
    "displayName" TEXT,
    "avatarUrl" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "preferredAgeGroupIds" TEXT[],
    "preferredLocation" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "time" TEXT,
    "costMin" DOUBLE PRECISION,
    "costMax" DOUBLE PRECISION,
    "costDisplay" TEXT,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "recurrence" JSONB,
    "recurrenceFrequency" TEXT,
    "recurrenceInterval" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ageGroupId" TEXT NOT NULL,
    "locationId" TEXT,
    "favoriteCount" INTEGER DEFAULT 0,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "LocationType" NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "imageUrl" TEXT,
    "amenities" TEXT[],
    "capacity" INTEGER,
    "accessibility" "AccessibilityFeature"[],
    "parking" "ParkingType",
    "publicTransport" TEXT,
    "operatingHours" JSONB,
    "socialMedia" JSONB,
    "rating" DOUBLE PRECISION,
    "reviewCount" INTEGER DEFAULT 0,
    "averageRating" DOUBLE PRECISION DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organizationId" TEXT NOT NULL,
    "cityId" TEXT,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" TEXT,
    "comment" TEXT,
    "helpfulCount" INTEGER NOT NULL DEFAULT 0,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "locationId" TEXT,
    "activityId" TEXT,
    "eventId" TEXT,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT,
    "title" TEXT,
    "description" TEXT,
    "cancelled" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "age_groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "minAge" INTEGER,
    "maxAge" INTEGER,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "age_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "imageUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LocationListCity" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ActivityListCity" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ActivityListCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ActivityListAgeGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ActivityCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ActivityListActivity" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LocationListLocation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LocationAgeGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LocationListAgeGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LocationCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LocationListCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "cities_slug_key" ON "cities"("slug");

-- CreateIndex
CREATE INDEX "cities_slug_idx" ON "cities"("slug");

-- CreateIndex
CREATE INDEX "cities_name_idx" ON "cities"("name");

-- CreateIndex
CREATE INDEX "cities_latitude_longitude_idx" ON "cities"("latitude", "longitude");

-- CreateIndex
CREATE UNIQUE INDEX "activity_lists_slug_key" ON "activity_lists"("slug");

-- CreateIndex
CREATE INDEX "activity_lists_slug_idx" ON "activity_lists"("slug");

-- CreateIndex
CREATE INDEX "activity_lists_featured_sortOrder_idx" ON "activity_lists"("featured", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "location_lists_slug_key" ON "location_lists"("slug");

-- CreateIndex
CREATE INDEX "location_lists_slug_idx" ON "location_lists"("slug");

-- CreateIndex
CREATE INDEX "location_lists_featured_sortOrder_idx" ON "location_lists"("featured", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "favorites_userId_idx" ON "favorites"("userId");

-- CreateIndex
CREATE INDEX "favorites_activityId_idx" ON "favorites"("activityId");

-- CreateIndex
CREATE INDEX "favorites_createdAt_idx" ON "favorites"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_userId_activityId_key" ON "favorites"("userId", "activityId");

-- CreateIndex
CREATE UNIQUE INDEX "activities_slug_key" ON "activities"("slug");

-- CreateIndex
CREATE INDEX "activities_slug_idx" ON "activities"("slug");

-- CreateIndex
CREATE INDEX "activities_title_idx" ON "activities"("title");

-- CreateIndex
CREATE INDEX "activities_ageGroupId_idx" ON "activities"("ageGroupId");

-- CreateIndex
CREATE INDEX "activities_locationId_idx" ON "activities"("locationId");

-- CreateIndex
CREATE INDEX "activities_isFree_featured_idx" ON "activities"("isFree", "featured");

-- CreateIndex
CREATE UNIQUE INDEX "locations_slug_key" ON "locations"("slug");

-- CreateIndex
CREATE INDEX "locations_slug_idx" ON "locations"("slug");

-- CreateIndex
CREATE INDEX "locations_type_idx" ON "locations"("type");

-- CreateIndex
CREATE INDEX "locations_organizationId_idx" ON "locations"("organizationId");

-- CreateIndex
CREATE INDEX "locations_cityId_idx" ON "locations"("cityId");

-- CreateIndex
CREATE INDEX "locations_latitude_longitude_idx" ON "locations"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "reviews_userId_idx" ON "reviews"("userId");

-- CreateIndex
CREATE INDEX "reviews_locationId_idx" ON "reviews"("locationId");

-- CreateIndex
CREATE INDEX "reviews_activityId_idx" ON "reviews"("activityId");

-- CreateIndex
CREATE INDEX "reviews_eventId_idx" ON "reviews"("eventId");

-- CreateIndex
CREATE INDEX "reviews_rating_idx" ON "reviews"("rating");

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");

-- CreateIndex
CREATE INDEX "events_date_idx" ON "events"("date");

-- CreateIndex
CREATE INDEX "events_activityId_date_idx" ON "events"("activityId", "date");

-- CreateIndex
CREATE INDEX "events_slug_idx" ON "events"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "age_groups_name_key" ON "age_groups"("name");

-- CreateIndex
CREATE UNIQUE INDEX "age_groups_slug_key" ON "age_groups"("slug");

-- CreateIndex
CREATE INDEX "age_groups_minAge_maxAge_idx" ON "age_groups"("minAge", "maxAge");

-- CreateIndex
CREATE INDEX "age_groups_slug_idx" ON "age_groups"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "categories_slug_idx" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_slug_key" ON "organizations"("slug");

-- CreateIndex
CREATE INDEX "organizations_slug_idx" ON "organizations"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_LocationListCity_AB_unique" ON "_LocationListCity"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationListCity_B_index" ON "_LocationListCity"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityListCity_AB_unique" ON "_ActivityListCity"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityListCity_B_index" ON "_ActivityListCity"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityListCategory_AB_unique" ON "_ActivityListCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityListCategory_B_index" ON "_ActivityListCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityListAgeGroup_AB_unique" ON "_ActivityListAgeGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityListAgeGroup_B_index" ON "_ActivityListAgeGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityCategory_AB_unique" ON "_ActivityCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityCategory_B_index" ON "_ActivityCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityListActivity_AB_unique" ON "_ActivityListActivity"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityListActivity_B_index" ON "_ActivityListActivity"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LocationListLocation_AB_unique" ON "_LocationListLocation"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationListLocation_B_index" ON "_LocationListLocation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LocationAgeGroup_AB_unique" ON "_LocationAgeGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationAgeGroup_B_index" ON "_LocationAgeGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LocationListAgeGroup_AB_unique" ON "_LocationListAgeGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationListAgeGroup_B_index" ON "_LocationListAgeGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LocationCategory_AB_unique" ON "_LocationCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationCategory_B_index" ON "_LocationCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LocationListCategory_AB_unique" ON "_LocationListCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationListCategory_B_index" ON "_LocationListCategory"("B");

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_ageGroupId_fkey" FOREIGN KEY ("ageGroupId") REFERENCES "age_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationListCity" ADD CONSTRAINT "_LocationListCity_A_fkey" FOREIGN KEY ("A") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationListCity" ADD CONSTRAINT "_LocationListCity_B_fkey" FOREIGN KEY ("B") REFERENCES "location_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityListCity" ADD CONSTRAINT "_ActivityListCity_A_fkey" FOREIGN KEY ("A") REFERENCES "activity_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityListCity" ADD CONSTRAINT "_ActivityListCity_B_fkey" FOREIGN KEY ("B") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityListCategory" ADD CONSTRAINT "_ActivityListCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "activity_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityListCategory" ADD CONSTRAINT "_ActivityListCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityListAgeGroup" ADD CONSTRAINT "_ActivityListAgeGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "activity_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityListAgeGroup" ADD CONSTRAINT "_ActivityListAgeGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "age_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityCategory" ADD CONSTRAINT "_ActivityCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityCategory" ADD CONSTRAINT "_ActivityCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityListActivity" ADD CONSTRAINT "_ActivityListActivity_A_fkey" FOREIGN KEY ("A") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityListActivity" ADD CONSTRAINT "_ActivityListActivity_B_fkey" FOREIGN KEY ("B") REFERENCES "activity_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationListLocation" ADD CONSTRAINT "_LocationListLocation_A_fkey" FOREIGN KEY ("A") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationListLocation" ADD CONSTRAINT "_LocationListLocation_B_fkey" FOREIGN KEY ("B") REFERENCES "location_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationAgeGroup" ADD CONSTRAINT "_LocationAgeGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "age_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationAgeGroup" ADD CONSTRAINT "_LocationAgeGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationListAgeGroup" ADD CONSTRAINT "_LocationListAgeGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "age_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationListAgeGroup" ADD CONSTRAINT "_LocationListAgeGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "location_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationCategory" ADD CONSTRAINT "_LocationCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationCategory" ADD CONSTRAINT "_LocationCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationListCategory" ADD CONSTRAINT "_LocationListCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationListCategory" ADD CONSTRAINT "_LocationListCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "location_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
