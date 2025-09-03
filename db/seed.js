import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  // TODO
  // Clear table first
  //await db.query("DELETE FROM employees");

  console.log("Seeding employees...");

  // Clear table first (optional, but often useful)
  //await db.query("DELETE FROM employees;");

  for (let i = 0; i < 10; i++) {
    const name = faker.person.fullName();
    const birthday = faker.date.birthdate({ min: 18, max: 65, mode: "age" });

    const salary = faker.number.int({ min: 45000, max: 120000 });

    const employee = await createEmployee({ name, birthday, salary });
    console.log("Inserted:", employee);
  }
}
