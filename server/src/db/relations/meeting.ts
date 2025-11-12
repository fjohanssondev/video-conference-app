import { relations } from "drizzle-orm";
import { meetingParticipants, meetings } from "../schema/meeting.js";
import { user } from "../schema/auth.js";

export const meetingRelations = relations(meetings, ({ one, many }) => ({
  creator: one(user, {
    fields: [meetings.hostId],
    references: [user.id]
  }),
  participants: many(meetingParticipants)
}))