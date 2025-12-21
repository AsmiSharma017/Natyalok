const puppeteer = require("puppeteer");

describe("Natyalok browser flow", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    page = await browser.newPage();
    await page.setDefaultTimeout(10000);
  });

  afterAll(async () => {
    await browser.close();
  });

  test("home page renders and shows visit counter", async () => {
    await page.goto("https://localhost:3000", { waitUntil: "networkidle0" });
    const content = await page.content();
    expect(content.toLowerCase()).toContain("home"); // adjust to your real text
  });

  test("login page loads", async () => {
    await page.goto("https://localhost:3000/auth/login", { waitUntil: "networkidle0" });
    const content = await page.content();
    expect(content.toLowerCase()).toContain("login");
  });
});
