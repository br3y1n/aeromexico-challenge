import fs from "fs";
import path from "path";

const filePath = path.join("json-db.json");

if (!fs.existsSync(filePath)) {
  const dbBase = {
    favorites: [],
  };

  fs.writeFileSync(filePath, JSON.stringify(dbBase, null, 2));
}
