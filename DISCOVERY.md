# Sitemap Discovery Workflow Documentation

## Overview
This document contains instructions on how to run the sitemap discovery workflow in the `daikin-tucson` repository. The workflow is designed to automate the process of discovering URLs from the sitemap and generating an inventory of the discovered URLs.

## Manually Triggering the GitHub Actions Workflow
To manually trigger the sitemap discovery workflow, follow these steps:
1. Go to the `Actions` tab in the GitHub repository.
2. Locate the `Sitemap Discovery Workflow` from the list of workflows.
3. Click on the workflow to open its details.
4. Click on the `Run workflow` button. 
5. Optionally, select the branch you want to run the workflow against.
6. Click on the `Run workflow` button again to start the process.

## Downloading the Generated URL Inventory Artifacts
Once the workflow has completed, you can download the generated URL inventory artifacts:
1. Navigate back to the `Actions` tab in the repository.
2. Click on the `Sitemap Discovery Workflow` to view the list of workflow runs.
3. Select the most recent run to open its details.
4. Scroll down to the `Artifacts` section at the bottom of the page.
5. Find the artifact labeled `URL Inventory` (or the respective name given during workflow setup).
6. Click on the download icon to download the artifact in a `.zip` format.

## Notes
- Ensure that you have the necessary permissions to trigger workflows and download artifacts.
- The artifacts will be available for a limited time after the workflow run is completed.

By following these instructions, you can easily run the sitemap discovery workflow and access the generated inventory of URLs. 

---

*Document created on 2026-02-05 at 23:50:52 UTC*