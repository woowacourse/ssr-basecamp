import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function getInitTemplate() {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  return fs.readFileSync(templatePath, "utf-8");
}
