# Vue Core Directory Visualization

🎋 Often when we're excited about contributing to a project, it takes a little while to understand the codebase even before we get started. It's estimated that developers spend 70% of their time reading code and only 30% writing. This project documents how Vue.js is set up with special notes taken from a Vue core meeting with Evan You. This should help guide people through the directory structure and give context to how and why things are set up the way that they are so that they can get set up to contribute as soon as possible.

Shows the whole Vue repo directory structure, with only the relevant pieces shown initially. Any files that we have more info on have a note (exposed on hover). All notes and open directories are in the Vuex store.

![demo-image](https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/vue-directory.png)

🎋 Demo site! [https://sdras.github.io/vue-directory-tree/](https://sdras.github.io/vue-directory-tree/)

When I first created this, I wrote this [bit of code](https://gist.github.com/sdras/f5665c5bcd98b48b4a3a9aed1312fd37) to create the tree.

🎋 After it was done, I thought it might be best for everyone to create a CLI tool to generate this kind of documentation. You can find this project and use it here: [Project-Explorer](https://github.com/sdras/project-explorer)

```
yarn
yarn serve
```
