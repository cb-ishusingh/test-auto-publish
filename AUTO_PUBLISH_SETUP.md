# Auto Publish Workflow Setup Guide

This guide explains how to set up the automatic npm publishing workflow with proper role-controlled permissions.

## Overview

The repository includes two publishing workflows:

### 1. Feature Branch Publishing (`publish-wrappers.yml`)
Automatically publishes packages to npm when their `package.json` versions are updated in the following directories:
- `chargebee-js-react/package.json`
- `chargebee-js-vue/package.json` 
- `chargebee-js-angular/projects/chargebee-js-angular-wrapper/package.json`

### 2. Release Branch Publishing (`release-branch-publish.yml`)
Publishes packages when pushing to release branches with flexible versioning:
- Triggers on `release/*` branches (e.g., `release/v1.2.3`, `release/2.0.0`)
- Uses package.json versions for publishing (no strict version matching required)
- Provides comprehensive release summary

## Required Setup

### 1. GitHub Environment Setup

Create two GitHub environments for different publishing strategies:

#### Environment 1: `npm-publish` (Feature Branch Publishing)
Create a GitHub environment called `npm-publish` with the following settings:

1. Go to your repository settings
2. Navigate to "Environments" 
3. Click "New environment"
4. Name it `npm-publish`
5. Configure the following:

#### Environment Protection Rules
- **Required reviewers**: Add team members who should approve npm publishes
- **Wait timer**: Optional, set to 0 minutes for immediate publishing
- **Deployment branches**: Restrict to `main` and `master` branches only

#### Environment Secrets
Add the following secret:
- `NPM_TOKEN`: Your npm authentication token

#### Environment 2: `npm-publish-release` (Release Branch Publishing)
Create a GitHub environment called `npm-publish-release` with stricter settings:

1. Go to your repository settings
2. Navigate to "Environments" 
3. Click "New environment"
4. Name it `npm-publish-release`
5. Configure the following:

##### Environment Protection Rules
- **Required reviewers**: Add senior team members who should approve releases
- **Wait timer**: Set to 5-10 minutes for release validation
- **Deployment branches**: Restrict to `release/*` branches only

##### Environment Secrets
Add the following secret:
- `NPM_TOKEN`: Your npm authentication token (can be same as above)

### 2. NPM Token Setup

#### Create NPM Token
1. Log in to [npmjs.com](https://www.npmjs.com)
2. Go to "Access Tokens" in your account settings
3. Click "Generate New Token"
4. Select "Automation" token type for CI/CD
5. Copy the generated token

#### Configure Token Permissions
The token needs permissions to:
- Publish packages under `@chargebee` scope
- Read package information
- Manage package versions

### 3. Repository Secrets

Add the following repository secret:
- `NPM_TOKEN`: The npm authentication token from step 2

## Workflow Features

### Role-Controlled Permissions
- **Environment Protection**: Requires approval from designated reviewers
- **Branch Protection**: Only runs on `main` and `master` branches
- **Scoped Permissions**: Limited to `contents: read`, `packages: write`, and `id-token: write`

### Smart Change Detection
- Only publishes packages whose `package.json` files have changed
- Runs separate jobs for each package to avoid conflicts
- Provides clear output about which packages were published

### Build Process
Each package follows its specific build process:
- **React**: Uses `npm run build` (rollup)
- **Vue**: Uses `npm run build` (vite)
- **Angular**: Uses `npm run build` (ng build)

## Usage

### Method 1: Feature Branch Publishing (Quick Releases)

1. Update the version in the appropriate `package.json` file:
   ```bash
   # For React
   cd chargebee-js-react
   npm version patch  # or minor, major
   
   # For Vue  
   cd chargebee-js-vue
   npm version patch
   
   # For Angular
   cd chargebee-js-angular/projects/chargebee-js-angular-wrapper
   npm version patch
   ```

2. Commit and push the changes:
   ```bash
   git add .
   git commit -m "chore: bump version to X.X.X"
   git push origin feat/CHKOUTENGG-53108
   ```

3. The workflow will automatically:
   - Detect the package.json change
   - Build the package
   - Request approval (if environment protection is enabled)
   - Publish to npm

### Method 2: Release Branch Publishing (Controlled Releases)

1. Create a proper release branch:
   ```bash
   git checkout -b release/v1.2.3
   # OR
   git checkout -b version/v1.2.3
   # OR
   git checkout -b update/wrapper-versions-v1.2.3
   ```

2. Update package.json versions to match the release:
   ```bash
   # For React
   cd chargebee-js-react
   npm version 1.2.3
   
   # For Vue  
   cd chargebee-js-vue
   npm version 1.2.3
   
   # For Angular
   cd chargebee-js-angular/projects/chargebee-js-angular-wrapper
   npm version 1.2.3
   ```

3. Commit and push the release branch:
   ```bash
   git add .
   git commit -m "chore: release v1.2.3"
   git push origin release/v1.2.3
   ```

4. The release workflow will:
   - Extract version from branch name (`release/v1.2.3` → `1.2.3`)
   - Display both release branch version and package.json versions
   - Build and publish packages using package.json versions
   - Provide comprehensive release summary

5. After successful publishing:
   ```bash
   # Merge to main
   git checkout main
   git merge release/v1.2.3
   
   # Create and push tag
   git tag v1.2.3
   git push origin v1.2.3
   
   # Clean up release branch
   git branch -d release/v1.2.3
   git push origin --delete release/v1.2.3
   ```

### Manual Approval Process

If environment protection is enabled:
1. Go to the "Actions" tab in GitHub
2. Find the running workflow
3. Click on the job that needs approval
4. Click "Review deployments"
5. Approve or reject the deployment

## Security Considerations

### Token Security
- Use "Automation" tokens, not "Publish" tokens for CI/CD
- Regularly rotate tokens
- Use environment-specific tokens when possible

### Access Control
- Limit environment access to trusted team members
- Use branch protection rules
- Monitor workflow runs for unauthorized access

### Package Scope
- All packages are published under `@chargebee` scope
- Requires proper npm organization permissions

## Troubleshooting

### Common Issues

1. **Permission Denied**
   - Check if `NPM_TOKEN` secret is correctly set
   - Verify token has publish permissions for `@chargebee` scope
   - Ensure token hasn't expired

2. **Build Failures**
   - Check if all dependencies are properly installed
   - Verify build scripts work locally
   - Review build logs for specific errors

3. **Environment Protection Issues**
   - Ensure reviewers are properly configured
   - Check if environment protection rules are too restrictive
   - Verify branch restrictions match your workflow

### Debugging Steps

1. Check workflow logs in GitHub Actions
2. Test builds locally before pushing
3. Verify npm token permissions
4. Review environment configuration

## Monitoring

### Workflow Notifications
- Monitor GitHub Actions for workflow status
- Set up notifications for failed deployments
- Track package version updates

### Package Monitoring
- Monitor npm package downloads
- Track version history
- Set up alerts for failed publishes

## Best Practices

1. **Version Management**
   - Use semantic versioning
   - Update CHANGELOG.md with each release
   - Tag releases in Git

2. **Testing**
   - Test packages locally before publishing
   - Use pre-release versions for testing
   - Validate package contents

3. **Documentation**
   - Keep README files updated
   - Document breaking changes
   - Provide migration guides

4. **Security**
   - Regularly audit dependencies
   - Use automated security scanning
   - Monitor for vulnerabilities
