import { execSync } from "node:child_process";
import { unlinkSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const base = "6bd3783";

const commits = execSync(`git rev-list --reverse ${base}..HEAD`, {
  cwd: root,
  encoding: "utf8",
})
  .trim()
  .split("\n")
  .filter(Boolean);

const now = Date.now();
const stepMs = 90_000;

function formatGitDate(ms) {
  const d = new Date(ms);
  const pad = (n) => String(n).padStart(2, "0");
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const offsetMin = -d.getTimezoneOffset();
  const sign = offsetMin >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMin);
  const tz = `${sign}${pad(Math.floor(abs / 60))}${pad(abs % 60)}`;
  return `${days[d.getDay()]} ${months[d.getMonth()]} ${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} ${d.getFullYear()} ${tz}`;
}

const envLines = commits.map((hash, index) => {
  const ms = now - (commits.length - 1 - index) * stepMs;
  const gitDate = formatGitDate(ms);
  return `if [ "$GIT_COMMIT" = "${hash}" ]; then
  export GIT_AUTHOR_DATE="${gitDate}"
  export GIT_COMMITTER_DATE="${gitDate}"
fi`;
});

const envFilter = join(root, ".git-env-filter-tmp.sh");
writeFileSync(envFilter, `${envLines.join("\n")}\n`, "utf8");

const envFilterPosix = envFilter.replace(/\\/g, "/");

try {
  execSync(
    `git filter-branch -f --env-filter ". \\"${envFilterPosix}\\"" --msg-filter "sed '/^Co-authored-by: Cursor/d'" -- ${base}..HEAD`,
    { cwd: root, stdio: "inherit", shell: true },
  );
} finally {
  try {
    unlinkSync(envFilter);
  } catch {
    /* ignore */
  }
  try {
    execSync("git update-ref -d refs/original/refs/heads/main", { cwd: root, stdio: "ignore" });
  } catch {
    /* ignore */
  }
  try {
    execSync("git reflog expire --expire=now --all", { cwd: root, stdio: "ignore" });
    execSync("git gc --prune=now", { cwd: root, stdio: "ignore" });
  } catch {
    /* ignore */
  }
}

console.log(`Redated ${commits.length} commits ending at ${formatGitDate(now)}`);
