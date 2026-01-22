const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const updates = new Map([
  ["Aria Resort & Spa Hotel", "Aria Resort & Spa Hotel"],
  ["Q Premium Resort Hotel", "Q Premium Resort Hotel"],
  ["Granada Luxury Red Alanya Ok", "Granada Luxury Red"],
  ["Granada Luxury Okurcalar Alanya Ok 2 Femije falas", "Granada Luxury Okurcalar"],
  ["Granada Luxury Beach Alanya Ok 2 Femije falas", "Granada Luxury Beach"],
  ["Granada Luxury Belek Belek Ok 2 Femije falas", "Granada Luxury Belek"],
  ["Ethno Belek Hotel Belek Ok 2 Femije falas ne kerkese", "Ethno Belek"],
  ["Maxx Royal Kemer Resort Kemer Ok", "Maxx Royal Kemer Resort"],
  ["Maxx Royal Belek Golf Resort Belek Ok", "Maxx Royal Belek Golf Resort"],
  ["Voyage Belek Golf & Spa Belek Ok", "Voyage Belek Golf & Spa"],
  ["Voyage Sorgun Hotel Sorgun Ok", "Voyage Sorgun"],
  ["Voyage Kundu Lara Ok", "Voyage Kundu Lara"],
  ["Kremlin Palace Lara Ok 2 Femije falas", "Kremlin Palace Lara"],
  ["Selectum Luxury Resort Belek Belek Ok", "Selectum Luxury Resort Belek"],
  ["Selectum Family Resort Belek Belek Ok", "Selectum Family Resort Belek"],
  ["Selectum Family Resort Side Side Ok 2 Femije falas", "Selectum Family Resort Side"],
  ["Selectum Family Comfort Side Side Ok 2 Femije falas", "Selectum Family Comfort Side"],
  ["Selectum Colors Side Side Ok 2 Femije falas", "Selectum Colors Side"],
  ["Selectum Noa Belek Ok 2 Femije falas", "Selectum Noa Belek"],
  ["Asteria Family Resort Belek Belek Ok 2 Femije falas", "Asteria Family Resort Belek"],
  ["Asteria Family Resort Side Side Ok 2 Femije falas", "Asteria Family Resort Side"],
  ["Asteria Collection Side Side Ok 2 Femije falas", "Asteria Collection Side"],
  ["Asteria Bloom Side Side Ok", "Asteria Bloom Side"],
  ["Prestige Alanya Alanya Ok 2 Femije falas", "Prestige Alanya"],
  ["The Norm Oriental Kemer", "The Norm Oriental Kemer"],
  ["The X Belek", "The X Belek"],
  ["SY Hotel Belek", "SY Hotel Belek"],
  ["Sirene Belek Hotel", "Sirene Belek Hotel"],
  ["Kempinski The Dome", "Kempinski The Dome"],
  ["Ela Excellence Resort Belek", "Ela Excellence Resort Belek"],
  ["Regnum Carya Golf & Spa Resort", "Regnum Carya Golf & Spa Resort"],
  ["Regnum The Crown", "Regnum The Crown"],
  ["Titanic Deluxe Golf Belek", "Titanic Deluxe Golf Belek"],
  ["Cullinan Belek Belek", "Cullinan Belek Belek"],
  ["Gloria Serenity Resort Belek", "Gloria Serenity Resort Belek"],
  ["Gloria Golf Resort Belek", "Gloria Golf Resort Belek"],
  ["Gloria Verde Resort Belek", "Gloria Verde Resort Belek"],
  ["Siu Collection Kemer", "Siu Collection Kemer"],
  ["Aydinbey Queen Palace Belek", "Aydinbey Queen Palace Belek"],
  ["Alarcha Hotels & Resorts Side", "Alarcha Hotels & Resorts Side"],
  ["Belek Beach Belek", "Belek Beach Belek"],
  ["Side Aluna Side", "Side Aluna Side"],
  ["Ducale Lara", "Ducale Lara"],
  ["Rai Premium Tekirova Kemer", "Rai Premium Tekirova Kemer"],
  ["Bergiz Hotels & Resort Kemer", "Bergiz Hotels & Resort Kemer"],
  ["Dobedan World Palace Kemer", "Dobedan World Palace Kemer"],
  ["Juju Premier Palace Hotel", "Juju Premier Palace Hotel"],
  ["Pirate's Beach Club Kemer", "Pirate's Beach Club Kemer"],
  ["Karmir Resort & Spa Kemer", "Karmir Resort & Spa Kemer"],
  ["Club Phaselis", "Club Phaselis"]
]);

async function main() {
  let updated = 0;
  for (const [oldName, newName] of updates.entries()) {
    if (oldName === newName) continue;
    const res = await prisma.hotel.updateMany({
      where: { name: oldName, destination: "ANTALYA" },
      data: { name: newName }
    });
    updated += res.count;
  }
  console.log(`Updated ${updated} hotels.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
