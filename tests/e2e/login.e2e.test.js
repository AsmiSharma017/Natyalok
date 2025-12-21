// tests/e2e/login.e2e.test.js
const puppeteer = require("puppeteer");

describe("Natyalok login flow", () => {
  let browser;
  let page;

  // Unique email so registration succeeds every run
  const email = `uiuser+${Date.now()}@example.com`;
  const password = "Password123";

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // set to false if you want to see the browser
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    page = await browser.newPage();
    await page.setDefaultTimeout(20000);
  });

  afterAll(async () => {
    await browser.close();
  });

  test("user can open login page", async () => {
    await page.goto("https://localhost:3000/auth/login", {
      waitUntil: "networkidle0",
    });
    const content = await page.content();
    expect(content.toLowerCase()).toContain("login");
  });

  test(
    "user can register then login",
    async () => {
      // === REGISTER (with navigation) ===
      await page.goto("https://localhost:3000/auth/register", {
        waitUntil: "networkidle0",
      });

      await page.waitForSelector('input[name="name"]');
      await page.type('input[name="name"]', "UI User");
      await page.type('input[name="email"]', email);
      await page.type('input[name="password"]', password);

      await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
      ]);

      const afterRegisterUrl = page.url();
      // Just ensure we didn't stay on the same form URL
      expect(afterRegisterUrl).not.toContain("/auth/register");

      // === LOGIN (no navigation wait) ===
      await page.goto("https://localhost:3000/auth/login", {
        waitUntil: "networkidle0",
      });

      await page.waitForSelector('input[name="email"]');
      await page.waitForSelector('input[name="password"]');

      await page.type('input[name="email"]', email);
      await page.type('input[name="password"]', password);

      // Click login but don't wait for navigation
      await page.click('button[type="submit"]');

      // Simple 2s delay so the server/DOM can react
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const afterLoginUrl = page.url();
      const html = await page.content();

      // Basic sanity: no obvious error text, and we are not stuck on the login URL forever
      expect(html.toLowerCase()).not.toContain("invalid credentials");
      expect(afterLoginUrl).not.toBe("https://localhost:3000/auth/login");
      // If your controller redirects users to /movies, you can also do:
      // expect(afterLoginUrl).toContain("/movies");
    },
    30000
  );
});
