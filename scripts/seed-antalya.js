const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const hotels = [
  "Aria Resort & Spa Hotel",
  "Q Premium Resort Hotel",
  "Granada Luxury Red Alanya Ok",
  "Granada Luxury Okurcalar Alanya Ok 2 Femije falas",
  "Granada Luxury Beach Alanya Ok 2 Femije falas",
  "Granada Luxury Belek Belek Ok 2 Femije falas",
  "Ethno Belek Hotel Belek Ok 2 Femije falas ne kerkese",
  "Maxx Royal Kemer Resort Kemer Ok",
  "Maxx Royal Belek Golf Resort Belek Ok",
  "Voyage Belek Golf & Spa Belek Ok",
  "Voyage Sorgun Hotel Sorgun Ok",
  "Voyage Kundu Lara Ok",
  "Kremlin Palace Lara Ok 2 Femije falas",
  "Selectum Luxury Resort Belek Belek Ok",
  "Selectum Family Resort Belek Belek Ok",
  "Selectum Family Resort Side Side Ok 2 Femije falas",
  "Selectum Family Comfort Side Side Ok 2 Femije falas",
  "Selectum Colors Side Side Ok 2 Femije falas",
  "Selectum Noa Belek Ok 2 Femije falas",
  "Asteria Family Resort Belek Belek Ok 2 Femije falas",
  "Asteria Family Resort Side Side Ok 2 Femije falas",
  "Asteria Collection Side Side Ok 2 Femije falas",
  "Asteria Bloom Side Side Ok",
  "Prestige Alanya Alanya Ok 2 Femije falas",
  "The Norm Oriental Kemer",
  "The X Belek",
  "SY Hotel Belek",
  "Sirene Belek Hotel",
  "Kempinski The Dome",
  "Ela Excellence Resort Belek",
  "Regnum Carya Golf & Spa Resort",
  "Regnum The Crown",
  "Titanic Deluxe Golf Belek",
  "Cullinan Belek Belek",
  "Gloria Serenity Resort Belek",
  "Gloria Golf Resort Belek",
  "Gloria Verde Resort Belek",
  "Siu Collection Kemer",
  "Aydinbey Queen Palace Belek",
  "Alarcha Hotels & Resorts Side",
  "Belek Beach Belek",
  "Side Aluna Side",
  "Ducale Lara",
  "Rai Premium Tekirova Kemer",
  "Bergiz Hotels & Resort Kemer",
  "Dobedan World Palace Kemer",
  "Juju Premier Palace Hotel",
  "Pirate's Beach Club Kemer",
  "Karmir Resort & Spa Kemer",
  "Club Phaselis"
];

const placeholderImage = "/uploads/placeholder.svg";
const placeholderDrive = "https://drive.google.com/";

async function main() {
  const existing = await prisma.hotel.findMany({
    where: { destination: "ANTALYA" },
    select: { name: true }
  });
  const existingNames = new Set(existing.map((item) => item.name));

  const data = hotels
    .filter((name) => !existingNames.has(name))
    .map((name) => ({
      name,
      destination: "ANTALYA",
      driveUrl: placeholderDrive,
      coverImageUrl: placeholderImage
    }));

  if (data.length === 0) {
    console.log("No new hotels to add.");
    return;
  }

  await prisma.hotel.createMany({ data });
  console.log(`Inserted ${data.length} hotels.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
