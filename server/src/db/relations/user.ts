import { relations } from "drizzle-orm";
import { user } from "../schema/auth.js";
import { meetingParticipants } from "../schema/meeting.js";

export const userRelations = relations(user, ({ many }) => ({
  meetingParticipants: many(meetingParticipants)
}))