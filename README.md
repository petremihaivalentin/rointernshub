# Introduction
A collection of common Microsoft internal portals.

Hosted on Azure and published to https://aka.ms/mssites.

Formerly hosted on SiteBox, first as http://how then http://sites (now redirected to the new site).

# Getting Started
The site runs on node.js, using the Express framework and Pug for templating.

[Visual Studio Code](https://code.visualstudio.com/) is the recommended editor. 

To run, just navigate to the folder, run `npm install` and `npm run`. The site should be reachable at http://localhost:3000.

# Branches
The following branches are automatically deployed upon pull request completion:

|Branch  |                 URL                        |
|--------|--------------------------------------------|
|master  |<https://mssites.azurewebsites.net>         |
|release |<https://mssites-release.azurewebsites.net> |

# Contribute
Help maintain the list of sites in [sites.json](/routes/config/sites.json).

Pull requests should be made to the release branch.

Join on [Microsoft Teams](https://teams.microsoft.com/l/team/19:f6fde02a406b47fab19b7abf7aa9154e@thread.skype/), team name MS Sites.