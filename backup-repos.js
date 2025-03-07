const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// File containing paths to repositories
const REPO_LIST_FILE = path.join(__dirname, "repositories.txt");

// Function to format the current date and time for commit messages
function getCommitMessage() {
    const now = new Date();
    return now.toISOString().replace(/[:T]/g, "-").split(".")[0];
}

// Function to run Git commands in a given directory
function runGitCommands(repoPath) {
    try {
        console.log(`\n🔹 Processing repository: ${repoPath}`);

        // Ensure the path exists
        if (!fs.existsSync(repoPath)) {
            console.error(`❌ Error: Path does not exist - ${repoPath}`);
            return;
        }

        // Change to repository directory
        process.chdir(repoPath);

        // Run Git commands
        execSync("git add .", { stdio: "inherit" });

        // Check if there are changes to commit
        const status = execSync("git status --porcelain").toString().trim();

        if (status) {
            const commitMsg = getCommitMessage();
            execSync(`git commit -m "${commitMsg}"`, { stdio: "inherit" });
            execSync("git push", { stdio: "inherit" });
            console.log(`✅ Successfully pushed changes for ${repoPath}`);
        } else {
            console.log(`⚠️ No changes to commit in ${repoPath}, skipping push.`);
        }

    } catch (error) {
        console.error(`❌ Error processing ${repoPath}: ${error.message}`);
    }
}

// Read the list of repositories from the file
function processRepositories() {
    try {
        const repoPaths = fs
            .readFileSync(REPO_LIST_FILE, "utf8")
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);

        if (repoPaths.length === 0) {
            console.error("❌ No repository paths found in the file.");
            return;
        }

        console.log(`📂 Found ${repoPaths.length} repositories to process.`);
        repoPaths.forEach(runGitCommands);
    } catch (error) {
        console.error(`❌ Error reading repository list: ${error.message}`);
    }
}

// Start processing repositories
processRepositories();
