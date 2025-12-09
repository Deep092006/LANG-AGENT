import { z } from "zod";

export const Reflection = z.object({
  missing: z.string().describe("Critique of what is missing."),
  superfluous: z.string().describe("Critique of what is superfluous.")
});

export const AnswerQuestion = z.object({
  answer: z.string().describe("~250 word detailed answer to the question."),
  search_queries: z.array(z.string()).describe("1-3 search queries for improving the answer."),
  reflection: Reflection
});

export const ReviseAnswer = AnswerQuestion.extend({
  references: z.array(z.string()).describe("Citations motivating your updated answer.")
});
