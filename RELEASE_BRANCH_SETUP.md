# Release Branch Publishing Setup Guide

## 🚀 Release Branch Strategy with Role-Based Controls

Your repository already has the `release-branch-publish.yml` workflow configured for role-based publishing via release branches.

## 📋 Required Configuration

### 1. Create GitHub Environment: `npm-publish-release`

1. Go to your repository settings
2. Navigate to "Environments"
3. Click "New environment"
4. Name it: `npm-publish-release`

### 2. Configure Environment Protection Rules

#### Required Reviewers
- Add senior team members who should approve releases
- Recommended: 2-3 reviewers for production releases

#### Wait Timer
- Set to 5-10 minutes for release validation
- Allows time for final checks before publishing

#### Deployment Branches
- Restrict to `release/*` branches only
- This ensures the workflow only runs on release branches

### 3. Add Environment Secret

Add the following secret to the `npm-publish-release` environment:
- `NPM_TOKEN`: Your npm automation token

## 🔄 How It Works

### Release Process:

1. **Create Release Branch:**
   ```bash
   git checkout -b release/v1.2.3
   ```

2. **Update Package Versions:**
   ```bash
   # React
   cd chargebee-js-react
   npm version 1.2.3
   
   # Vue
   cd chargebee-js-vue
   npm version 1.2.3
   
   # Angular
   cd chargebee-js-angular/projects/chargebee-js-angular-wrapper
   npm version 1.2.3
   ```

3. **Push Release Branch:**
   ```bash
   git add .
   git commit -m "chore: release v1.2.3"
   git push origin release/v1.2.3
   ```

4. **Role-Based Approval:**
   - Workflow triggers automatically
   - Requires manual approval from designated reviewers
   - Reviewers can approve/reject in GitHub Actions

5. **Automatic Publishing:**
   - Extracts version from branch name
   - Displays both release branch and package.json versions
   - Builds and publishes packages using package.json versions
   - Provides comprehensive summary

## 🛡️ Security Features

### Role-Based Access Control:
- **Environment Protection**: Requires manual approval
- **Branch Restrictions**: Only `release/*` branches
- **Reviewer Requirements**: Designated team members must approve
- **Wait Timer**: Additional validation time

### Version Safety:
- **Version Validation**: Ensures consistency between branch and package.json
- **Registry Checks**: Prevents duplicate publishes
- **Build Verification**: Tests build process before publishing

## 📊 Workflow Summary

The workflow provides:
- ✅ Role-based approval process
- ✅ Release branch strategy
- ✅ Version validation
- ✅ Automatic publishing
- ✅ Comprehensive reporting
- ✅ Security controls

## 🎯 Next Steps

1. **Configure Environment**: Set up `npm-publish-release` environment
2. **Add Reviewers**: Assign team members as required reviewers
3. **Test Process**: Create a test release branch to verify setup
4. **Document Team**: Share process with your team

Your release branch strategy with role-based controls is ready to use!
