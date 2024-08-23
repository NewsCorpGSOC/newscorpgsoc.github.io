import os
import requests

# GitHub API token with repo access from environment variable
GITHUB_TOKEN = os.getenv('ACTIONS_PAT')
REPO_OWNER = 'NewsCorpGSOC'
REPO_NAME = 'newscorpgsoc.github.io'

# Headers for authentication
headers = {
    'Authorization': f'token {GITHUB_TOKEN}',
    'Accept': 'application/vnd.github.v3+json'
}

# Function to get deployments
def get_deployments():
    url = f'https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/deployments'
    response = requests.get(url, headers=headers)
    response.raise_for_status()  # Raise an error for bad status codes
    return response.json()

# Function to delete a deployment
def delete_deployment(deployment_id):
    url = f'https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/deployments/{deployment_id}'
    response = requests.delete(url, headers=headers)
    if response.status_code == 204:
        print(f"Deleted deployment {deployment_id}")
    else:
        print(f"Failed to delete deployment {deployment_id}: {response.status_code}")

# Main function to prune deployments
def prune_deployments():
    deployments = get_deployments()
    for deployment in deployments:
        # Ensure deployment is a dictionary before accessing 'description'
        if isinstance(deployment, dict):
            description = deployment.get('description', '')
            if "Routine update" in description:
                delete_deployment(deployment['id'])

if __name__ == "__main__":
    prune_deployments()
