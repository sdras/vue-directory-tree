# Vue Core Directory Visualization

Shows the whole vue repo directory structure, with only the relevant pieces shown initially. Any files that we have more info on have a note (exposed on hover). All notes and open directories are in the Vuex store.

![demo-image](https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/vue-directory.png)

When I first created this, I wrote this [bit of code](https://gist.github.com/sdras/f5665c5bcd98b48b4a3a9aed1312fd37) to create the tree.

After it was done, I thought it might be best for everyone to create a CLI tool to generate this kind of documentation. You can find this project and use it here: [Project-Explorer](https://github.com/sdras/project-explorer)

```
yarn
yarn serve
```
