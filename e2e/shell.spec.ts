import { test, expect } from "@playwright/test";

const GREETING = /I'm Matthew/i;

test("boot → open Ask Matthew → minimize → restore via taskbar", async ({
  page,
}) => {
  await page.goto("/");

  // Desktop icon (waits out the boot overlay before it's clickable).
  const icon = page.getByRole("button", { name: "Open Ask_Matthew" });
  await expect(icon).toBeVisible({ timeout: 15_000 });
  await icon.click();

  // Window opened — chat greeting is visible.
  await expect(page.getByText(GREETING)).toBeVisible();

  // Minimize hides the window.
  await page.getByRole("button", { name: "Minimize", exact: true }).click();
  await expect(page.getByText(GREETING)).toBeHidden();

  // Restore from the taskbar task button (exact, to not match "Open Ask_Matthew").
  await page.getByRole("button", { name: "Ask_Matthew", exact: true }).click();
  await expect(page.getByText(GREETING)).toBeVisible();
});
