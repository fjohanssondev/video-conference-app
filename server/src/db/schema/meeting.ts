import { boolean, date, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { user } from "./auth.js";
import { nanoid } from "nanoid";

export const meetings = pgTable("meetings", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  title: text("title").notNull(),
  roomName: text("room_name").notNull().unique(),
  status: text("status", { 
    enum: ["scheduled", "active", "ended"] 
  }).notNull().default("scheduled"),
  isPublic: boolean("is_public").default(false).notNull(),
  requiresApproval: boolean("requires_approval").default(false).notNull(),
  meetingToken: text("meeting_token")
    .notNull()
    .unique()
    .$defaultFn(() => nanoid(10)),
  hostId: text("host_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
  scheduledStartAt: timestamp("scheduled_start_at").notNull(),
  scheduledEndAt: timestamp("scheduled_end_at").notNull(),
  startedAt: timestamp("started_at"),
  endedAt: timestamp("ended_at")
})

export const meetingParticipants = pgTable("meeting_participants", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  meetingId: text("meeting_id").notNull().references(() => meetings.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  livekitParticipantId: text("livekit_participant_id"),
  livekitIdentity: text("livekit_identity").notNull(),
  displayName: text("display_name").notNull(),
  isGuest: boolean("is_guest").default(false).notNull(),
  isAudioEnabled: boolean("is_audio_enabled").default(true),
  isVideoEnabled: boolean("is_video_enabled").default(true),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
  leftAt: timestamp("left_at")
})

export const meetingInvitations = pgTable("meeting_invitations", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  meetingId: text("meeting_id").notNull().references(() => meetings.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  status: text("status", {
    enum: ["pending", "accepted", "declined"]
  }).notNull().default("pending"),
  invitedAt: timestamp("invited_at").notNull().defaultNow(),
  respondedAt: timestamp("responded_at"),
})