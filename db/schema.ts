import { pgTable, text, timestamp, boolean, pgEnum, uuid, jsonb } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role_enum", ["recruiter", "applicant"]);

export const personalityTraitEnum = pgEnum("personality_trait_enum", [
  "extraversion",
  "agreeableness",
  "conscientiousness",
  "neuroticism",
  "openness",
]); // Expand as needed

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: roleEnum("role").notNull(),
  org: text("org"), // New: optional, but required for recruiters via form
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});

// New: Tests table
export const tests = pgTable("tests", {
  id: uuid("id").defaultRandom().primaryKey(),
  recruiterId: text("recruiter_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  traits: personalityTraitEnum("traits").array().notNull(),
  questions: jsonb("questions").notNull(), // e.g., [{text: "Question 1", type: "likert", options: ["1","2","3","4","5"]}, ...]
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

// New: Submissions table
export const submissions = pgTable("submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  testId: uuid("test_id")
    .notNull()
    .references(() => tests.id, { onDelete: "cascade" }),
  applicantId: text("applicant_id") // Nullable for guests initially
    .references(() => user.id, { onDelete: "set null" }),
  guestId: uuid("guest_id"), // For temp guest submissions
  answers: jsonb("answers").notNull(), // e.g., {q1: "3", q2: "Agree", ...}
  submittedAt: timestamp("submitted_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const schema = { user, session, account, verification, tests, submissions };

/* note! when adding a new content (ie. column or table) to the schema.ts, remember to type "npx drizzle-kit push" to push the new content to the neon db. */