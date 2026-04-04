import { test, expect } from "@playwright/test";

test("user can ask a question and see answer and sources", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Enter your question").fill("What does EC2 do?");
  await page.getByRole("button", { name: "Ask Question" }).click();

  await expect(page.getByRole("heading", { name: "Answer" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Sources" })).toBeVisible();
});

test("question form is visible and usable", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByLabel("Enter your question")).toBeVisible();
  await expect(page.getByRole("button", { name: "Ask Question" })).toBeVisible();
});