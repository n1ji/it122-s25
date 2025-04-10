const username = 'n1ji';
const repo = 'it122-w25';

// Replace with your custom domain
const customDomain = 'https://audiophile.website/it122-s25';

// GitHub API URL to fetch the .gitmodules file
const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/.gitmodules`;

// Function to fetch and parse the .gitmodules file
async function fetchSubmodules() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Decode the .gitmodules file content (base64 encoded)
        const gitmodulesContent = atob(data.content);

        // Parse the .gitmodules file to extract submodule information
        const submodules = parseGitmodules(gitmodulesContent);

        const submoduleList = document.getElementById('submodule-list');

        submodules.forEach(submodule => {
            // Extract the repository name from the submodule URL
            const repoName = extractRepoName(submodule.url);

            // Construct the GitHub Pages URL using the custom domain
            const submoduleUrl = `${customDomain}/${repoName}/`;

            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = submoduleUrl;
            link.textContent = submodule.path;

            listItem.appendChild(link);
            submoduleList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching submodules:', error);
    }
}

// Function to parse the .gitmodules file
function parseGitmodules(content) {
    const submodules = [];
    const lines = content.split('\n');

    let currentSubmodule = {};

    lines.forEach(line => {
        if (line.startsWith('[submodule ')) {
            // Start of a new submodule
            if (currentSubmodule.path) {
                submodules.push(currentSubmodule);
            }
            currentSubmodule = {};
        } else if (line.trim().startsWith('path = ')) {
            currentSubmodule.path = line.split('=')[1].trim();
        } else if (line.trim().startsWith('url = ')) {
            currentSubmodule.url = line.split('=')[1].trim();
        }
    });

    // Push the last submodule
    if (currentSubmodule.path) {
        submodules.push(currentSubmodule);
    }

    return submodules;
}

// Function to extract the repository name from the Git URL
function extractRepoName(gitUrl) {
    const repoName = gitUrl.split('/').pop().replace('.git', '');
    return repoName;
}

// Call the function to fetch and display submodules
fetchSubmodules();