const fs = require("fs");
const { exec } = require("child_process");

const PATCH_DIR = "./patches";
const LOG_FILE = "./logs/output.txt";

// Ensure directories exist
if (!fs.existsSync(PATCH_DIR)) fs.mkdirSync(PATCH_DIR);
if (!fs.existsSync("./logs")) fs.mkdirSync("./logs");

console.log("🤖 ChatGPT Dev Agent is watching for patches...");

fs.watch(PATCH_DIR, (event, filename) => {
  if (!filename.endsWith(".patch")) return;

  const patchPath = `${PATCH_DIR}/${filename}`;
  console.log(`📥 New patch detected: ${filename}`);

  exec(`git apply "${patchPath}"`, (err, stdout, stderr) => {
    let log = `\n=== PATCH: ${filename} ===\n`;
    if (err) {
      log += `❌ PATCH FAILED:\n${stderr}`;
      console.error(log);
    } else {
      log += `✅ PATCH APPLIED SUCCESSFULLY\n${stdout}`;
      console.log(log);
    }

    exec("npx @11ty/eleventy --serve", (err, stdout, stderr) => {
      if (err) {
        log += `\n❌ BUILD ERROR:\n${stderr}`;
        console.error(stderr);
      } else {
        log += `\n✅ BUILD OUTPUT:\n${stdout}`;
        console.log(stdout);
      }

      fs.appendFileSync(LOG_FILE, log + "\n\n");
    });

    // Remove patch after applying
    fs.unlinkSync(patchPath);
  });
});
