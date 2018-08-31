import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //this lets us know which files to highlight
    opened: [
      'vue',
      '.github',
      'scripts',
      'src',
      'core',
      'instance',
      'dist',
      'platforms',
      'web',
      'compiler',
      'runtime'
    ],
    //this will show any comments that are relevant to a particular file
    comments: {
      'vue/.github/CONTRIBUTING.md': `Has a section about the source code structure, this a quick way to become familiarized with the project structure.`,
      'vue/package.json': `Most of the scripts are prefixed: there are dev scripts, build scripts, and test scripts. They watch the source code and build a dist file.`,
      'vue/dist/vue.js': `This file can be directly included in the browser, which is very useful when we're trying to triage issues that can be reproduced on JSFiddle.`,
      'vue/dist/vue.runtime.esm.js': `If you are trying to build a dev build of Vue inside a webpack project, one thing you can do is you can npm link Vue into that project and then you can use one of the dev scripts that watch and builds the vue.runtime.esm.js dist. Once the new file is written, it will automatically trigger webpack to update the build as well.`,
      'vue/scripts/config.js': `This is a file that's responsible for dynamically generating the roll-up config for producing a build. We're loading a bunch of roll-up plug-ins, these are the banner, and we load the alias.`,
      'vue/scripts/alias.js': `Instead of using Relative Paths, we use this file. Whenever you see an import statement like this, it's using this alias to link to the source compiler. Keep this in mind when you are reading the source code because these common aliases are defined here.`,
      'vue/src/platforms/web/entry-runtime-with-compiler.js': `This is the file where it all starts. Everything needs to be pure javascript before the compiler step because we can’t be assumptive- it needs to be able to run in both browser, and node.js, it cannot assume DOM or browser API. We’re directly importing the parts of vue that are purely platform agnostic, also, the config, some utils, we’re assembling the vue runtime for use in the browser. 
  <ul>
    <li>It’s also adding all the compilers.</li> 
    <li>We override the mount function on the vue prototype. We check to see if the render function is already defined and if the el argument is a selector, if not we check if it has it’s own template defined, otherwise get the outer HTML. If so, we try to extract the template string from the element inside the browser.</li>
    <li>It basically extracts the template that we are supposed to use and compiles the template into the render function. Now we can call mount.</li>
    <li>We’re importing from compiler/index.</li>
  </ul>`,
      'vue/src/platforms/web/runtime': `Here we can safely use any web DOM API that we want. For example, attrs.js you can see that we are setting attributes`,
      'vue/src/platforms/web/runtime/index.js': `This is only adding the runtime and basic mount is defined in the plain runtime. basic mount takes the element and immediately calls mount component. it assumes that the element has a mounting point and that the element has a render function defined. (see entry-with-runtime for more)`,
      'vue/src/platforms/web/entry-runtime.js': `This simply imports the runtime and builds it`,
      'vue/src/platforms/weex': `This does what you think it would- creates the weex implementation`,
      'vue/src/platforms': `Technically anything in platform would be able to target a new platform, you could fork vue and add another platfom (i.e. nativescript). v3 we would remove this step- people would not need to fork vue, they could just use vue as a dependency.`,
      'vue/src/compiler/index.js': `This is the part used to build the standalone compiler that's used in the browser. We're importing a bunch of things and exporting them in the entry here. This is essentially the API for the standalone Vue template compiler package. This is the starting point if you want to read the source code. Once you know where the entry points are, the import dependency relationships become clear.`,
      'vue/src/core/instance/index.js': `This is the 'this' object we work with inside components, we all know this part. This is where the Vue function is defined. We init a bunch of things here. We separate a bunch of concerns into mixins.`,
      'vue/src/core/instance/init.js': `This has the main flow of what an instance goes through, in initMixin
  <ul>
    <li>Here we call beforeCreate and created. It immediately calls vm.$mount if an element is given.</li> 
    <li>The chunks of code near the bottom are there for the edge case when we expose an object- export default Vue.extend etc. Vue.extend is called before Vue.use is called. So we want to make sure that any late-applied global mixins still get applied. (resolveConstructorOptions)</li>
    <li>initInternalComponent is an optimization: vm.$options is expensive, it’s very dynamic, it’s not monomorphic, this is a perf bottleneck. so any predefined component that doesn’t have these options gets on the fast path. We copy the necessary options that we know what exists.</li>
  </ul>`,
      'vue/src/core/instance/render.js': `This is called inside the lifecycle initialization of each component, on initRender. 
  <ul>
    <li>We expose two versions of the createElement function, they are curried- one is more optimized- it skips the normalization optimization we perform inside the compliation.</li>
    <li>We do this to see if they are all already in the vdom, and already flat because if they aren’t we have to take the arrays and flatten the nested arrays. So that can save a lot of time.</li>
    <li>This is a public createElement, so this is the 'h'. One of the reasons that render needs to accept the 'h' from its argument is that this 'h' is bound to this specific component.</li>
    <li>This is essentially a pre-bound createElement function that's always called  with the current vm as it's context.</li>
    <li>Like React, you need to always use this ‘h’ that's passed from the render function to ensure the vnode has a correct vm context when it's created. The vm context is important down the road when we’re trying to resolve slots and other things.</li>
    <li>Also exposes $attr and $listeners.</li>
    <li>On line 83, that’s where we are calling the user-provided render function here with a render proxy and our create element. This is the 'h' that we're passing. That's the 'this' that we find inside the render functions.</li>
    <li>The render proxy is defined instance/proxy, it uses the proxy API. If the environment does not support native proxies, this vm render proxy will just be vm itself. If the proxy is available, we pass a proxy of the vm instance itself and then try to detect access to properties that are not defined on the vm.</li>
    <li>That's why we are able to give user warnings, because we are passing in a vm render proxy here which detects access to unknown properties.</li>
    <li>We do some error-handing here too</li>
  </ul>`,
      'vue/src/core/instance/lifecycle.js': `Gives us the update, and destroy functions, and exports the mountComponent Function.
  <ul>
    <li>The call hook, and activateChildComponent are for <keep-alive>, etc.</li> 
    <li>updateChildComponent s called whenever a parent component is passing props/passing updated props to a child component. This is important: whenever a child component is being updated this function is called.</li> 
    <li>mountComponent mounts the component. This is called inside $mount(in web/runtime/index) we do some checks, then we call beforeMount hook.</li> 
    <li>updateComponent-  Is passed to autorun. It will be different during prod and dev. We track start and end timing. It will invoke the users render function and build the virtual dom tree. It will call the patch function, diff the trees, and apply the updates. Then this whole function is fed into a watcher. Whenever you update something, this updateComponent is called.</li>
    <li>updateComponent will be fed into a watcher. The watcher will call beforeUpdate any time the dependency changes and it’s notified to update.</li>
    <li>After the watcher is run for the first time we are considered to be mounted.</li>
  </ul>`,
      'vue/src/platforms/web/runtime/patch.js': `You should probably avoid touching this file. 
  <ul>
    <li>createPatchFunction our core patch algorithm- is platform agnostic.</li> 
    <li>modules: each module contains a bunch of hooks. We have create, update etc hooks for each update and will be applied to every vnode at the different phase of its lifecycle. You can think of a virtual dom module as a vue global mixin.</li>
    <li>web/runtime/nodeops: calls the real document.createElement and all the other DOM APIs. If you’re writing for weex or nativescript- this is where you would want to call to the target rendering platform.</li>
  </ul>`,
      'vue/src/core/vdom/modules/directives.js': `Directives are a virtual dom module. The directive module has three hooks, they’re injected into the patch function, they’re applied at every part of the lifecycle.`
    },
    //the whole directory structure for vue
    vuetree: {
      path: 'vue/',
      name: 'vue',
      type: 'folder',
      children: [
        { path: 'vue/.DS_Store', name: '.DS_Store', type: 'file' },
        { path: 'vue/.babelrc', name: '.babelrc', type: 'file' },
        {
          path: 'vue/.circleci',
          name: '.circleci',
          type: 'folder',
          children: [
            {
              path: 'vue/.circleci/config.yml',
              name: 'config.yml',
              type: 'file'
            }
          ]
        },
        { path: 'vue/.editorconfig', name: '.editorconfig', type: 'file' },
        { path: 'vue/.eslintignore', name: '.eslintignore', type: 'file' },
        { path: 'vue/.eslintrc', name: '.eslintrc', type: 'file' },
        { path: 'vue/.flowconfig', name: '.flowconfig', type: 'file' },
        {
          path: 'vue/.github',
          name: '.github',
          type: 'folder',
          children: [
            {
              path: 'vue/.github/CODE_OF_CONDUCT.md',
              name: 'CODE_OF_CONDUCT.md',
              type: 'file'
            },
            {
              path: 'vue/.github/COMMIT_CONVENTION.md',
              name: 'COMMIT_CONVENTION.md',
              type: 'file'
            },
            {
              path: 'vue/.github/CONTRIBUTING.md',
              name: 'CONTRIBUTING.md',
              type: 'file'
            },
            {
              path: 'vue/.github/ISSUE_TEMPLATE.md',
              name: 'ISSUE_TEMPLATE.md',
              type: 'file'
            },
            {
              path: 'vue/.github/PULL_REQUEST_TEMPLATE.md',
              name: 'PULL_REQUEST_TEMPLATE.md',
              type: 'file'
            }
          ]
        },
        { path: 'vue/.gitignore', name: '.gitignore', type: 'file' },
        { path: 'vue/BACKERS.md', name: 'BACKERS.md', type: 'file' },
        { path: 'vue/LICENSE', name: 'LICENSE', type: 'file' },
        { path: 'vue/README.md', name: 'README.md', type: 'file' },
        {
          path: 'vue/benchmarks',
          name: 'benchmarks',
          type: 'folder',
          children: [
            {
              path: 'vue/benchmarks/big-table',
              name: 'big-table',
              type: 'folder',
              children: [
                {
                  path: 'vue/benchmarks/big-table/demo.css',
                  name: 'demo.css',
                  type: 'file'
                },
                {
                  path: 'vue/benchmarks/big-table/index.html',
                  name: 'index.html',
                  type: 'file'
                },
                {
                  path: 'vue/benchmarks/big-table/style.css',
                  name: 'style.css',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/benchmarks/dbmon',
              name: 'dbmon',
              type: 'folder',
              children: [
                {
                  path: 'vue/benchmarks/dbmon/ENV.js',
                  name: 'ENV.js',
                  type: 'file'
                },
                {
                  path: 'vue/benchmarks/dbmon/app.js',
                  name: 'app.js',
                  type: 'file'
                },
                {
                  path: 'vue/benchmarks/dbmon/index.html',
                  name: 'index.html',
                  type: 'file'
                },
                {
                  path: 'vue/benchmarks/dbmon/lib',
                  name: 'lib',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/benchmarks/dbmon/lib/memory-stats.js',
                      name: 'memory-stats.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/benchmarks/dbmon/lib/monitor.js',
                      name: 'monitor.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/benchmarks/dbmon/lib/styles.css',
                      name: 'styles.css',
                      type: 'file'
                    }
                  ]
                }
              ]
            },
            {
              path: 'vue/benchmarks/reorder-list',
              name: 'reorder-list',
              type: 'folder',
              children: [
                {
                  path: 'vue/benchmarks/reorder-list/index.html',
                  name: 'index.html',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/benchmarks/ssr',
              name: 'ssr',
              type: 'folder',
              children: [
                {
                  path: 'vue/benchmarks/ssr/README.md',
                  name: 'README.md',
                  type: 'file'
                },
                {
                  path: 'vue/benchmarks/ssr/common.js',
                  name: 'common.js',
                  type: 'file'
                },
                {
                  path: 'vue/benchmarks/ssr/renderToStream.js',
                  name: 'renderToStream.js',
                  type: 'file'
                },
                {
                  path: 'vue/benchmarks/ssr/renderToString.js',
                  name: 'renderToString.js',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/benchmarks/svg',
              name: 'svg',
              type: 'folder',
              children: [
                {
                  path: 'vue/benchmarks/svg/index.html',
                  name: 'index.html',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/benchmarks/uptime',
              name: 'uptime',
              type: 'folder',
              children: [
                {
                  path: 'vue/benchmarks/uptime/index.html',
                  name: 'index.html',
                  type: 'file'
                }
              ]
            }
          ]
        },
        {
          path: 'vue/dist',
          name: 'dist',
          type: 'folder',
          children: [
            { path: 'vue/dist/README.md', name: 'README.md', type: 'file' },
            {
              path: 'vue/dist/vue.common.js',
              name: 'vue.common.js',
              type: 'file'
            },
            {
              path: 'vue/dist/vue.esm.browser.js',
              name: 'vue.esm.browser.js',
              type: 'file'
            },
            {
              path: 'vue/dist/vue.esm.js',
              name: 'vue.esm.js',
              type: 'file'
            },
            { path: 'vue/dist/vue.js', name: 'vue.js', type: 'file' },
            {
              path: 'vue/dist/vue.min.js',
              name: 'vue.min.js',
              type: 'file'
            },
            {
              path: 'vue/dist/vue.runtime.common.js',
              name: 'vue.runtime.common.js',
              type: 'file'
            },
            {
              path: 'vue/dist/vue.runtime.esm.js',
              name: 'vue.runtime.esm.js',
              type: 'file'
            },
            {
              path: 'vue/dist/vue.runtime.js',
              name: 'vue.runtime.js',
              type: 'file'
            },
            {
              path: 'vue/dist/vue.runtime.min.js',
              name: 'vue.runtime.min.js',
              type: 'file'
            }
          ]
        },
        {
          path: 'vue/examples',
          name: 'examples',
          type: 'folder',
          children: [
            {
              path: 'vue/examples/commits',
              name: 'commits',
              type: 'folder',
              children: [
                {
                  path: 'vue/examples/commits/app.js',
                  name: 'app.js',
                  type: 'file'
                },
                {
                  path: 'vue/examples/commits/index.html',
                  name: 'index.html',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/examples/elastic-header',
              name: 'elastic-header',
              type: 'folder',
              children: [
                {
                  path: 'vue/examples/elastic-header/index.html',
                  name: 'index.html',
                  type: 'file'
                },
                {
                  path: 'vue/examples/elastic-header/style.css',
                  name: 'style.css',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/examples/firebase',
              name: 'firebase',
              type: 'folder',
              children: [
                {
                  path: 'vue/examples/firebase/app.js',
                  name: 'app.js',
                  type: 'file'
                },
                {
                  path: 'vue/examples/firebase/index.html',
                  name: 'index.html',
                  type: 'file'
                },
                {
                  path: 'vue/examples/firebase/style.css',
                  name: 'style.css',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/examples/grid',
              name: 'grid',
              type: 'folder',
              children: [
                {
                  path: 'vue/examples/grid/grid.js',
                  name: 'grid.js',
                  type: 'file'
                },
                {
                  path: 'vue/examples/grid/index.html',
                  name: 'index.html',
                  type: 'file'
                },
                {
                  path: 'vue/examples/grid/style.css',
                  name: 'style.css',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/examples/markdown',
              name: 'markdown',
              type: 'folder',
              children: [
                {
                  path: 'vue/examples/markdown/index.html',
                  name: 'index.html',
                  type: 'file'
                },
                {
                  path: 'vue/examples/markdown/style.css',
                  name: 'style.css',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/examples/modal',
              name: 'modal',
              type: 'folder',
              children: [
                {
                  path: 'vue/examples/modal/index.html',
                  name: 'index.html',
                  type: 'file'
                },
                {
                  path: 'vue/examples/modal/style.css',
                  name: 'style.css',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/examples/move-animations',
              name: 'move-animations',
              type: 'folder',
              children: [
                {
                  path: 'vue/examples/move-animations/index.html',
                  name: 'index.html',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/examples/select2',
              name: 'select2',
              type: 'folder',
              children: [
                {
                  path: 'vue/examples/select2/index.html',
                  name: 'index.html',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/examples/svg',
              name: 'svg',
              type: 'folder',
              children: [
                {
                  path: 'vue/examples/svg/index.html',
                  name: 'index.html',
                  type: 'file'
                },
                {
                  path: 'vue/examples/svg/style.css',
                  name: 'style.css',
                  type: 'file'
                },
                {
                  path: 'vue/examples/svg/svg.js',
                  name: 'svg.js',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/examples/todomvc',
              name: 'todomvc',
              type: 'folder',
              children: [
                {
                  path: 'vue/examples/todomvc/app.js',
                  name: 'app.js',
                  type: 'file'
                },
                {
                  path: 'vue/examples/todomvc/index.html',
                  name: 'index.html',
                  type: 'file'
                },
                {
                  path: 'vue/examples/todomvc/readme.md',
                  name: 'readme.md',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/examples/tree',
              name: 'tree',
              type: 'folder',
              children: [
                {
                  path: 'vue/examples/tree/index.html',
                  name: 'index.html',
                  type: 'file'
                },
                {
                  path: 'vue/examples/tree/tree.js',
                  name: 'tree.js',
                  type: 'file'
                }
              ]
            }
          ]
        },
        {
          path: 'vue/flow',
          name: 'flow',
          type: 'folder',
          children: [
            {
              path: 'vue/flow/compiler.js',
              name: 'compiler.js',
              type: 'file'
            },
            {
              path: 'vue/flow/component.js',
              name: 'component.js',
              type: 'file'
            },
            {
              path: 'vue/flow/global-api.js',
              name: 'global-api.js',
              type: 'file'
            },
            {
              path: 'vue/flow/modules.js',
              name: 'modules.js',
              type: 'file'
            },
            {
              path: 'vue/flow/options.js',
              name: 'options.js',
              type: 'file'
            },
            { path: 'vue/flow/ssr.js', name: 'ssr.js', type: 'file' },
            { path: 'vue/flow/vnode.js', name: 'vnode.js', type: 'file' },
            { path: 'vue/flow/weex.js', name: 'weex.js', type: 'file' }
          ]
        },
        {
          path: 'vue/node_modules',
          name: 'node_modules',
          type: 'folder',
          children: [
            {
              path: 'vue/node_modules/directory-tree',
              name: 'directory-tree',
              type: 'folder',
              children: [
                {
                  path: 'vue/node_modules/directory-tree/.npmignore',
                  name: '.npmignore',
                  type: 'file'
                },
                {
                  path: 'vue/node_modules/directory-tree/.travis.yml',
                  name: '.travis.yml',
                  type: 'file'
                },
                {
                  path: 'vue/node_modules/directory-tree/README.md',
                  name: 'README.md',
                  type: 'file'
                },
                {
                  path: 'vue/node_modules/directory-tree/lib',
                  name: 'lib',
                  type: 'folder',
                  children: [
                    {
                      path:
                        'vue/node_modules/directory-tree/lib/directory-tree.js',
                      name: 'directory-tree.js',
                      type: 'file'
                    }
                  ]
                },
                {
                  path: 'vue/node_modules/directory-tree/package.json',
                  name: 'package.json',
                  type: 'file'
                }
              ]
            }
          ]
        },
        {
          path: 'vue/package-lock.json',
          name: 'package-lock.json',
          type: 'file'
        },
        { path: 'vue/package.json', name: 'package.json', type: 'file' },
        {
          path: 'vue/packages',
          name: 'packages',
          type: 'folder',
          children: [
            {
              path: 'vue/packages/vue-server-renderer',
              name: 'vue-server-renderer',
              type: 'folder',
              children: [
                {
                  path: 'vue/packages/vue-server-renderer/README.md',
                  name: 'README.md',
                  type: 'file'
                },
                {
                  path: 'vue/packages/vue-server-renderer/basic.js',
                  name: 'basic.js',
                  type: 'file'
                },
                {
                  path: 'vue/packages/vue-server-renderer/build.js',
                  name: 'build.js',
                  type: 'file'
                },
                {
                  path: 'vue/packages/vue-server-renderer/client-plugin.d.ts',
                  name: 'client-plugin.d.ts',
                  type: 'file'
                },
                {
                  path: 'vue/packages/vue-server-renderer/client-plugin.js',
                  name: 'client-plugin.js',
                  type: 'file'
                },
                {
                  path: 'vue/packages/vue-server-renderer/index.js',
                  name: 'index.js',
                  type: 'file'
                },
                {
                  path: 'vue/packages/vue-server-renderer/package.json',
                  name: 'package.json',
                  type: 'file'
                },
                {
                  path: 'vue/packages/vue-server-renderer/server-plugin.d.ts',
                  name: 'server-plugin.d.ts',
                  type: 'file'
                },
                {
                  path: 'vue/packages/vue-server-renderer/server-plugin.js',
                  name: 'server-plugin.js',
                  type: 'file'
                },
                {
                  path: 'vue/packages/vue-server-renderer/types',
                  name: 'types',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/packages/vue-server-renderer/types/index.d.ts',
                      name: 'index.d.ts',
                      type: 'file'
                    },
                    {
                      path:
                        'vue/packages/vue-server-renderer/types/plugin.d.ts',
                      name: 'plugin.d.ts',
                      type: 'file'
                    },
                    {
                      path:
                        'vue/packages/vue-server-renderer/types/tsconfig.json',
                      name: 'tsconfig.json',
                      type: 'file'
                    }
                  ]
                }
              ]
            },
            {
              path: 'vue/packages/vue-template-compiler',
              name: 'vue-template-compiler',
              type: 'folder',
              children: [
                {
                  path: 'vue/packages/vue-template-compiler/README.md',
                  name: 'README.md',
                  type: 'file'
                },
                {
                  path: 'vue/packages/vue-template-compiler/browser.js',
                  name: 'browser.js',
                  type: 'file'
                },
                {
                  path: 'vue/packages/vue-template-compiler/build.js',
                  name: 'build.js',
                  type: 'file'
                },
                {
                  path: 'vue/packages/vue-template-compiler/index.js',
                  name: 'index.js',
                  type: 'file'
                },
                {
                  path: 'vue/packages/vue-template-compiler/package.json',
                  name: 'package.json',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/packages/weex-template-compiler',
              name: 'weex-template-compiler',
              type: 'folder',
              children: [
                {
                  path: 'vue/packages/weex-template-compiler/README.md',
                  name: 'README.md',
                  type: 'file'
                },
                {
                  path: 'vue/packages/weex-template-compiler/build.js',
                  name: 'build.js',
                  type: 'file'
                },
                {
                  path: 'vue/packages/weex-template-compiler/index.js',
                  name: 'index.js',
                  type: 'file'
                },
                {
                  path: 'vue/packages/weex-template-compiler/package.json',
                  name: 'package.json',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/packages/weex-vue-framework',
              name: 'weex-vue-framework',
              type: 'folder',
              children: [
                {
                  path: 'vue/packages/weex-vue-framework/README.md',
                  name: 'README.md',
                  type: 'file'
                },
                {
                  path: 'vue/packages/weex-vue-framework/factory.js',
                  name: 'factory.js',
                  type: 'file'
                },
                {
                  path: 'vue/packages/weex-vue-framework/index.js',
                  name: 'index.js',
                  type: 'file'
                },
                {
                  path: 'vue/packages/weex-vue-framework/package.json',
                  name: 'package.json',
                  type: 'file'
                }
              ]
            }
          ]
        },
        {
          path: 'vue/scripts',
          name: 'scripts',
          type: 'folder',
          children: [
            { path: 'vue/scripts/alias.js', name: 'alias.js', type: 'file' },
            { path: 'vue/scripts/build.js', name: 'build.js', type: 'file' },
            {
              path: 'vue/scripts/config.js',
              name: 'config.js',
              type: 'file'
            },
            {
              path: 'vue/scripts/gen-release-note.js',
              name: 'gen-release-note.js',
              type: 'file'
            },
            {
              path: 'vue/scripts/get-weex-version.js',
              name: 'get-weex-version.js',
              type: 'file'
            },
            {
              path: 'vue/scripts/git-hooks',
              name: 'git-hooks',
              type: 'folder',
              children: [
                {
                  path: 'vue/scripts/git-hooks/commit-msg',
                  name: 'commit-msg',
                  type: 'file'
                },
                {
                  path: 'vue/scripts/git-hooks/pre-commit',
                  name: 'pre-commit',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/scripts/release-weex.sh',
              name: 'release-weex.sh',
              type: 'file'
            },
            {
              path: 'vue/scripts/release.sh',
              name: 'release.sh',
              type: 'file'
            },
            {
              path: 'vue/scripts/verify-commit-msg.js',
              name: 'verify-commit-msg.js',
              type: 'file'
            }
          ]
        },
        {
          path: 'vue/src',
          name: 'src',
          type: 'folder',
          children: [
            {
              path: 'vue/src/compiler',
              name: 'compiler',
              type: 'folder',
              children: [
                {
                  path: 'vue/src/compiler/codegen',
                  name: 'codegen',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/src/compiler/codegen/events.js',
                      name: 'events.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/compiler/codegen/index.js',
                      name: 'index.js',
                      type: 'file'
                    }
                  ]
                },
                {
                  path: 'vue/src/compiler/create-compiler.js',
                  name: 'create-compiler.js',
                  type: 'file'
                },
                {
                  path: 'vue/src/compiler/directives',
                  name: 'directives',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/src/compiler/directives/bind.js',
                      name: 'bind.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/compiler/directives/index.js',
                      name: 'index.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/compiler/directives/model.js',
                      name: 'model.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/compiler/directives/on.js',
                      name: 'on.js',
                      type: 'file'
                    }
                  ]
                },
                {
                  path: 'vue/src/compiler/error-detector.js',
                  name: 'error-detector.js',
                  type: 'file'
                },
                {
                  path: 'vue/src/compiler/helpers.js',
                  name: 'helpers.js',
                  type: 'file'
                },
                {
                  path: 'vue/src/compiler/index.js',
                  name: 'index.js',
                  type: 'file'
                },
                {
                  path: 'vue/src/compiler/optimizer.js',
                  name: 'optimizer.js',
                  type: 'file'
                },
                {
                  path: 'vue/src/compiler/parser',
                  name: 'parser',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/src/compiler/parser/entity-decoder.js',
                      name: 'entity-decoder.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/compiler/parser/filter-parser.js',
                      name: 'filter-parser.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/compiler/parser/html-parser.js',
                      name: 'html-parser.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/compiler/parser/index.js',
                      name: 'index.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/compiler/parser/text-parser.js',
                      name: 'text-parser.js',
                      type: 'file'
                    }
                  ]
                },
                {
                  path: 'vue/src/compiler/to-function.js',
                  name: 'to-function.js',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/src/core',
              name: 'core',
              type: 'folder',
              children: [
                {
                  path: 'vue/src/core/components',
                  name: 'components',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/src/core/components/index.js',
                      name: 'index.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/components/keep-alive.js',
                      name: 'keep-alive.js',
                      type: 'file'
                    }
                  ]
                },
                {
                  path: 'vue/src/core/config.js',
                  name: 'config.js',
                  type: 'file'
                },
                {
                  path: 'vue/src/core/global-api',
                  name: 'global-api',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/src/core/global-api/assets.js',
                      name: 'assets.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/global-api/extend.js',
                      name: 'extend.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/global-api/index.js',
                      name: 'index.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/global-api/mixin.js',
                      name: 'mixin.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/global-api/use.js',
                      name: 'use.js',
                      type: 'file'
                    }
                  ]
                },
                {
                  path: 'vue/src/core/index.js',
                  name: 'index.js',
                  type: 'file'
                },
                {
                  path: 'vue/src/core/instance',
                  name: 'instance',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/src/core/instance/events.js',
                      name: 'events.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/instance/index.js',
                      name: 'index.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/instance/init.js',
                      name: 'init.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/instance/inject.js',
                      name: 'inject.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/instance/lifecycle.js',
                      name: 'lifecycle.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/instance/proxy.js',
                      name: 'proxy.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/instance/render-helpers',
                      name: 'render-helpers',
                      type: 'folder',
                      children: [
                        {
                          path:
                            'vue/src/core/instance/render-helpers/bind-object-listeners.js',
                          name: 'bind-object-listeners.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/src/core/instance/render-helpers/bind-object-props.js',
                          name: 'bind-object-props.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/src/core/instance/render-helpers/check-keycodes.js',
                          name: 'check-keycodes.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/core/instance/render-helpers/index.js',
                          name: 'index.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/src/core/instance/render-helpers/render-list.js',
                          name: 'render-list.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/src/core/instance/render-helpers/render-slot.js',
                          name: 'render-slot.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/src/core/instance/render-helpers/render-static.js',
                          name: 'render-static.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/src/core/instance/render-helpers/resolve-filter.js',
                          name: 'resolve-filter.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/src/core/instance/render-helpers/resolve-slots.js',
                          name: 'resolve-slots.js',
                          type: 'file'
                        }
                      ]
                    },
                    {
                      path: 'vue/src/core/instance/render.js',
                      name: 'render.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/instance/state.js',
                      name: 'state.js',
                      type: 'file'
                    }
                  ]
                },
                {
                  path: 'vue/src/core/observer',
                  name: 'observer',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/src/core/observer/array.js',
                      name: 'array.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/observer/dep.js',
                      name: 'dep.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/observer/index.js',
                      name: 'index.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/observer/scheduler.js',
                      name: 'scheduler.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/observer/traverse.js',
                      name: 'traverse.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/observer/watcher.js',
                      name: 'watcher.js',
                      type: 'file'
                    }
                  ]
                },
                {
                  path: 'vue/src/core/util',
                  name: 'util',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/src/core/util/debug.js',
                      name: 'debug.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/util/env.js',
                      name: 'env.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/util/error.js',
                      name: 'error.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/util/index.js',
                      name: 'index.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/util/lang.js',
                      name: 'lang.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/util/next-tick.js',
                      name: 'next-tick.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/util/options.js',
                      name: 'options.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/util/perf.js',
                      name: 'perf.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/util/props.js',
                      name: 'props.js',
                      type: 'file'
                    }
                  ]
                },
                {
                  path: 'vue/src/core/vdom',
                  name: 'vdom',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/src/core/vdom/create-component.js',
                      name: 'create-component.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/vdom/create-element.js',
                      name: 'create-element.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/vdom/create-functional-component.js',
                      name: 'create-functional-component.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/vdom/helpers',
                      name: 'helpers',
                      type: 'folder',
                      children: [
                        {
                          path: 'vue/src/core/vdom/helpers/extract-props.js',
                          name: 'extract-props.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/src/core/vdom/helpers/get-first-component-child.js',
                          name: 'get-first-component-child.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/core/vdom/helpers/index.js',
                          name: 'index.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/src/core/vdom/helpers/is-async-placeholder.js',
                          name: 'is-async-placeholder.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/core/vdom/helpers/merge-hook.js',
                          name: 'merge-hook.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/src/core/vdom/helpers/normalize-children.js',
                          name: 'normalize-children.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/src/core/vdom/helpers/resolve-async-component.js',
                          name: 'resolve-async-component.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/core/vdom/helpers/update-listeners.js',
                          name: 'update-listeners.js',
                          type: 'file'
                        }
                      ]
                    },
                    {
                      path: 'vue/src/core/vdom/modules',
                      name: 'modules',
                      type: 'folder',
                      children: [
                        {
                          path: 'vue/src/core/vdom/modules/directives.js',
                          name: 'directives.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/core/vdom/modules/index.js',
                          name: 'index.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/core/vdom/modules/ref.js',
                          name: 'ref.js',
                          type: 'file'
                        }
                      ]
                    },
                    {
                      path: 'vue/src/core/vdom/patch.js',
                      name: 'patch.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/core/vdom/vnode.js',
                      name: 'vnode.js',
                      type: 'file'
                    }
                  ]
                }
              ]
            },
            {
              path: 'vue/src/platforms',
              name: 'platforms',
              type: 'folder',
              children: [
                {
                  path: 'vue/src/platforms/web',
                  name: 'web',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/src/platforms/web/compiler',
                      name: 'compiler',
                      type: 'folder',
                      children: [
                        {
                          path: 'vue/src/platforms/web/compiler/directives',
                          name: 'directives',
                          type: 'folder',
                          children: [
                            {
                              path:
                                'vue/src/platforms/web/compiler/directives/html.js',
                              name: 'html.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/compiler/directives/index.js',
                              name: 'index.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/compiler/directives/model.js',
                              name: 'model.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/compiler/directives/text.js',
                              name: 'text.js',
                              type: 'file'
                            }
                          ]
                        },
                        {
                          path: 'vue/src/platforms/web/compiler/index.js',
                          name: 'index.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/platforms/web/compiler/modules',
                          name: 'modules',
                          type: 'folder',
                          children: [
                            {
                              path:
                                'vue/src/platforms/web/compiler/modules/class.js',
                              name: 'class.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/compiler/modules/index.js',
                              name: 'index.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/compiler/modules/model.js',
                              name: 'model.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/compiler/modules/style.js',
                              name: 'style.js',
                              type: 'file'
                            }
                          ]
                        },
                        {
                          path: 'vue/src/platforms/web/compiler/options.js',
                          name: 'options.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/platforms/web/compiler/util.js',
                          name: 'util.js',
                          type: 'file'
                        }
                      ]
                    },
                    {
                      path: 'vue/src/platforms/web/entry-compiler.js',
                      name: 'entry-compiler.js',
                      type: 'file'
                    },
                    {
                      path:
                        'vue/src/platforms/web/entry-runtime-with-compiler.js',
                      name: 'entry-runtime-with-compiler.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/platforms/web/entry-runtime.js',
                      name: 'entry-runtime.js',
                      type: 'file'
                    },
                    {
                      path:
                        'vue/src/platforms/web/entry-server-basic-renderer.js',
                      name: 'entry-server-basic-renderer.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/platforms/web/entry-server-renderer.js',
                      name: 'entry-server-renderer.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/platforms/web/runtime',
                      name: 'runtime',
                      type: 'folder',
                      children: [
                        {
                          path: 'vue/src/platforms/web/runtime/class-util.js',
                          name: 'class-util.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/platforms/web/runtime/components',
                          name: 'components',
                          type: 'folder',
                          children: [
                            {
                              path:
                                'vue/src/platforms/web/runtime/components/index.js',
                              name: 'index.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/runtime/components/transition-group.js',
                              name: 'transition-group.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/runtime/components/transition.js',
                              name: 'transition.js',
                              type: 'file'
                            }
                          ]
                        },
                        {
                          path: 'vue/src/platforms/web/runtime/directives',
                          name: 'directives',
                          type: 'folder',
                          children: [
                            {
                              path:
                                'vue/src/platforms/web/runtime/directives/index.js',
                              name: 'index.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/runtime/directives/model.js',
                              name: 'model.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/runtime/directives/show.js',
                              name: 'show.js',
                              type: 'file'
                            }
                          ]
                        },
                        {
                          path: 'vue/src/platforms/web/runtime/index.js',
                          name: 'index.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/platforms/web/runtime/modules',
                          name: 'modules',
                          type: 'folder',
                          children: [
                            {
                              path:
                                'vue/src/platforms/web/runtime/modules/attrs.js',
                              name: 'attrs.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/runtime/modules/class.js',
                              name: 'class.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/runtime/modules/dom-props.js',
                              name: 'dom-props.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/runtime/modules/events.js',
                              name: 'events.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/runtime/modules/index.js',
                              name: 'index.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/runtime/modules/style.js',
                              name: 'style.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/runtime/modules/transition.js',
                              name: 'transition.js',
                              type: 'file'
                            }
                          ]
                        },
                        {
                          path: 'vue/src/platforms/web/runtime/node-ops.js',
                          name: 'node-ops.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/platforms/web/runtime/patch.js',
                          name: 'patch.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/src/platforms/web/runtime/transition-util.js',
                          name: 'transition-util.js',
                          type: 'file'
                        }
                      ]
                    },
                    {
                      path: 'vue/src/platforms/web/server',
                      name: 'server',
                      type: 'folder',
                      children: [
                        {
                          path: 'vue/src/platforms/web/server/compiler.js',
                          name: 'compiler.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/platforms/web/server/directives',
                          name: 'directives',
                          type: 'folder',
                          children: [
                            {
                              path:
                                'vue/src/platforms/web/server/directives/index.js',
                              name: 'index.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/server/directives/model.js',
                              name: 'model.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/server/directives/show.js',
                              name: 'show.js',
                              type: 'file'
                            }
                          ]
                        },
                        {
                          path: 'vue/src/platforms/web/server/modules',
                          name: 'modules',
                          type: 'folder',
                          children: [
                            {
                              path:
                                'vue/src/platforms/web/server/modules/attrs.js',
                              name: 'attrs.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/server/modules/class.js',
                              name: 'class.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/server/modules/dom-props.js',
                              name: 'dom-props.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/server/modules/index.js',
                              name: 'index.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/web/server/modules/style.js',
                              name: 'style.js',
                              type: 'file'
                            }
                          ]
                        },
                        {
                          path: 'vue/src/platforms/web/server/util.js',
                          name: 'util.js',
                          type: 'file'
                        }
                      ]
                    },
                    {
                      path: 'vue/src/platforms/web/util',
                      name: 'util',
                      type: 'folder',
                      children: [
                        {
                          path: 'vue/src/platforms/web/util/attrs.js',
                          name: 'attrs.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/platforms/web/util/class.js',
                          name: 'class.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/platforms/web/util/compat.js',
                          name: 'compat.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/platforms/web/util/element.js',
                          name: 'element.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/platforms/web/util/index.js',
                          name: 'index.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/platforms/web/util/style.js',
                          name: 'style.js',
                          type: 'file'
                        }
                      ]
                    }
                  ]
                },
                {
                  path: 'vue/src/platforms/weex',
                  name: 'weex',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/src/platforms/weex/compiler',
                      name: 'compiler',
                      type: 'folder',
                      children: [
                        {
                          path: 'vue/src/platforms/weex/compiler/directives',
                          name: 'directives',
                          type: 'folder',
                          children: [
                            {
                              path:
                                'vue/src/platforms/weex/compiler/directives/index.js',
                              name: 'index.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/weex/compiler/directives/model.js',
                              name: 'model.js',
                              type: 'file'
                            }
                          ]
                        },
                        {
                          path: 'vue/src/platforms/weex/compiler/index.js',
                          name: 'index.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/platforms/weex/compiler/modules',
                          name: 'modules',
                          type: 'folder',
                          children: [
                            {
                              path:
                                'vue/src/platforms/weex/compiler/modules/append.js',
                              name: 'append.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/weex/compiler/modules/class.js',
                              name: 'class.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/weex/compiler/modules/index.js',
                              name: 'index.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/weex/compiler/modules/props.js',
                              name: 'props.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/weex/compiler/modules/recycle-list',
                              name: 'recycle-list',
                              type: 'folder',
                              children: [
                                {
                                  path:
                                    'vue/src/platforms/weex/compiler/modules/recycle-list/component-root.js',
                                  name: 'component-root.js',
                                  type: 'file'
                                },
                                {
                                  path:
                                    'vue/src/platforms/weex/compiler/modules/recycle-list/component.js',
                                  name: 'component.js',
                                  type: 'file'
                                },
                                {
                                  path:
                                    'vue/src/platforms/weex/compiler/modules/recycle-list/index.js',
                                  name: 'index.js',
                                  type: 'file'
                                },
                                {
                                  path:
                                    'vue/src/platforms/weex/compiler/modules/recycle-list/recycle-list.js',
                                  name: 'recycle-list.js',
                                  type: 'file'
                                },
                                {
                                  path:
                                    'vue/src/platforms/weex/compiler/modules/recycle-list/text.js',
                                  name: 'text.js',
                                  type: 'file'
                                },
                                {
                                  path:
                                    'vue/src/platforms/weex/compiler/modules/recycle-list/v-bind.js',
                                  name: 'v-bind.js',
                                  type: 'file'
                                },
                                {
                                  path:
                                    'vue/src/platforms/weex/compiler/modules/recycle-list/v-for.js',
                                  name: 'v-for.js',
                                  type: 'file'
                                },
                                {
                                  path:
                                    'vue/src/platforms/weex/compiler/modules/recycle-list/v-if.js',
                                  name: 'v-if.js',
                                  type: 'file'
                                },
                                {
                                  path:
                                    'vue/src/platforms/weex/compiler/modules/recycle-list/v-on.js',
                                  name: 'v-on.js',
                                  type: 'file'
                                },
                                {
                                  path:
                                    'vue/src/platforms/weex/compiler/modules/recycle-list/v-once.js',
                                  name: 'v-once.js',
                                  type: 'file'
                                }
                              ]
                            },
                            {
                              path:
                                'vue/src/platforms/weex/compiler/modules/style.js',
                              name: 'style.js',
                              type: 'file'
                            }
                          ]
                        }
                      ]
                    },
                    {
                      path: 'vue/src/platforms/weex/entry-compiler.js',
                      name: 'entry-compiler.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/platforms/weex/entry-framework.js',
                      name: 'entry-framework.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/platforms/weex/entry-runtime-factory.js',
                      name: 'entry-runtime-factory.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/platforms/weex/runtime',
                      name: 'runtime',
                      type: 'folder',
                      children: [
                        {
                          path: 'vue/src/platforms/weex/runtime/components',
                          name: 'components',
                          type: 'folder',
                          children: [
                            {
                              path:
                                'vue/src/platforms/weex/runtime/components/index.js',
                              name: 'index.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/weex/runtime/components/richtext.js',
                              name: 'richtext.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/weex/runtime/components/transition-group.js',
                              name: 'transition-group.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/weex/runtime/components/transition.js',
                              name: 'transition.js',
                              type: 'file'
                            }
                          ]
                        },
                        {
                          path: 'vue/src/platforms/weex/runtime/directives',
                          name: 'directives',
                          type: 'folder',
                          children: [
                            {
                              path:
                                'vue/src/platforms/weex/runtime/directives/index.js',
                              name: 'index.js',
                              type: 'file'
                            }
                          ]
                        },
                        {
                          path: 'vue/src/platforms/weex/runtime/index.js',
                          name: 'index.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/platforms/weex/runtime/modules',
                          name: 'modules',
                          type: 'folder',
                          children: [
                            {
                              path:
                                'vue/src/platforms/weex/runtime/modules/attrs.js',
                              name: 'attrs.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/weex/runtime/modules/class.js',
                              name: 'class.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/weex/runtime/modules/events.js',
                              name: 'events.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/weex/runtime/modules/index.js',
                              name: 'index.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/weex/runtime/modules/style.js',
                              name: 'style.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/weex/runtime/modules/transition.js',
                              name: 'transition.js',
                              type: 'file'
                            }
                          ]
                        },
                        {
                          path: 'vue/src/platforms/weex/runtime/node-ops.js',
                          name: 'node-ops.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/platforms/weex/runtime/patch.js',
                          name: 'patch.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/platforms/weex/runtime/recycle-list',
                          name: 'recycle-list',
                          type: 'folder',
                          children: [
                            {
                              path:
                                'vue/src/platforms/weex/runtime/recycle-list/render-component-template.js',
                              name: 'render-component-template.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/src/platforms/weex/runtime/recycle-list/virtual-component.js',
                              name: 'virtual-component.js',
                              type: 'file'
                            }
                          ]
                        },
                        {
                          path: 'vue/src/platforms/weex/runtime/text-node.js',
                          name: 'text-node.js',
                          type: 'file'
                        }
                      ]
                    },
                    {
                      path: 'vue/src/platforms/weex/util',
                      name: 'util',
                      type: 'folder',
                      children: [
                        {
                          path: 'vue/src/platforms/weex/util/element.js',
                          name: 'element.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/platforms/weex/util/index.js',
                          name: 'index.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/src/platforms/weex/util/parser.js',
                          name: 'parser.js',
                          type: 'file'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              path: 'vue/src/server',
              name: 'server',
              type: 'folder',
              children: [
                {
                  path: 'vue/src/server/bundle-renderer',
                  name: 'bundle-renderer',
                  type: 'folder',
                  children: [
                    {
                      path:
                        'vue/src/server/bundle-renderer/create-bundle-renderer.js',
                      name: 'create-bundle-renderer.js',
                      type: 'file'
                    },
                    {
                      path:
                        'vue/src/server/bundle-renderer/create-bundle-runner.js',
                      name: 'create-bundle-runner.js',
                      type: 'file'
                    },
                    {
                      path:
                        'vue/src/server/bundle-renderer/source-map-support.js',
                      name: 'source-map-support.js',
                      type: 'file'
                    }
                  ]
                },
                {
                  path: 'vue/src/server/create-basic-renderer.js',
                  name: 'create-basic-renderer.js',
                  type: 'file'
                },
                {
                  path: 'vue/src/server/create-renderer.js',
                  name: 'create-renderer.js',
                  type: 'file'
                },
                {
                  path: 'vue/src/server/optimizing-compiler',
                  name: 'optimizing-compiler',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/src/server/optimizing-compiler/codegen.js',
                      name: 'codegen.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/server/optimizing-compiler/index.js',
                      name: 'index.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/server/optimizing-compiler/modules.js',
                      name: 'modules.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/server/optimizing-compiler/optimizer.js',
                      name: 'optimizer.js',
                      type: 'file'
                    },
                    {
                      path:
                        'vue/src/server/optimizing-compiler/runtime-helpers.js',
                      name: 'runtime-helpers.js',
                      type: 'file'
                    }
                  ]
                },
                {
                  path: 'vue/src/server/render-context.js',
                  name: 'render-context.js',
                  type: 'file'
                },
                {
                  path: 'vue/src/server/render-stream.js',
                  name: 'render-stream.js',
                  type: 'file'
                },
                {
                  path: 'vue/src/server/render.js',
                  name: 'render.js',
                  type: 'file'
                },
                {
                  path: 'vue/src/server/template-renderer',
                  name: 'template-renderer',
                  type: 'folder',
                  children: [
                    {
                      path:
                        'vue/src/server/template-renderer/create-async-file-mapper.js',
                      name: 'create-async-file-mapper.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/server/template-renderer/index.js',
                      name: 'index.js',
                      type: 'file'
                    },
                    {
                      path:
                        'vue/src/server/template-renderer/parse-template.js',
                      name: 'parse-template.js',
                      type: 'file'
                    },
                    {
                      path:
                        'vue/src/server/template-renderer/template-stream.js',
                      name: 'template-stream.js',
                      type: 'file'
                    }
                  ]
                },
                {
                  path: 'vue/src/server/util.js',
                  name: 'util.js',
                  type: 'file'
                },
                {
                  path: 'vue/src/server/webpack-plugin',
                  name: 'webpack-plugin',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/src/server/webpack-plugin/client.js',
                      name: 'client.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/server/webpack-plugin/server.js',
                      name: 'server.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/src/server/webpack-plugin/util.js',
                      name: 'util.js',
                      type: 'file'
                    }
                  ]
                },
                {
                  path: 'vue/src/server/write.js',
                  name: 'write.js',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/src/sfc',
              name: 'sfc',
              type: 'folder',
              children: [
                {
                  path: 'vue/src/sfc/parser.js',
                  name: 'parser.js',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/src/shared',
              name: 'shared',
              type: 'folder',
              children: [
                {
                  path: 'vue/src/shared/constants.js',
                  name: 'constants.js',
                  type: 'file'
                },
                {
                  path: 'vue/src/shared/util.js',
                  name: 'util.js',
                  type: 'file'
                }
              ]
            }
          ]
        },
        {
          path: 'vue/test',
          name: 'test',
          type: 'folder',
          children: [
            {
              path: 'vue/test/e2e',
              name: 'e2e',
              type: 'folder',
              children: [
                {
                  path: 'vue/test/e2e/.eslintrc',
                  name: '.eslintrc',
                  type: 'file'
                },
                {
                  path: 'vue/test/e2e/nightwatch.config.js',
                  name: 'nightwatch.config.js',
                  type: 'file'
                },
                {
                  path: 'vue/test/e2e/runner.js',
                  name: 'runner.js',
                  type: 'file'
                },
                {
                  path: 'vue/test/e2e/specs',
                  name: 'specs',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/test/e2e/specs/async-edge-cases.html',
                      name: 'async-edge-cases.html',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/e2e/specs/async-edge-cases.js',
                      name: 'async-edge-cases.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/e2e/specs/basic-ssr.html',
                      name: 'basic-ssr.html',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/e2e/specs/basic-ssr.js',
                      name: 'basic-ssr.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/e2e/specs/commits.js',
                      name: 'commits.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/e2e/specs/grid.js',
                      name: 'grid.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/e2e/specs/markdown.js',
                      name: 'markdown.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/e2e/specs/modal.js',
                      name: 'modal.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/e2e/specs/select2.js',
                      name: 'select2.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/e2e/specs/svg.js',
                      name: 'svg.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/e2e/specs/todomvc.js',
                      name: 'todomvc.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/e2e/specs/tree.js',
                      name: 'tree.js',
                      type: 'file'
                    }
                  ]
                }
              ]
            },
            {
              path: 'vue/test/helpers',
              name: 'helpers',
              type: 'folder',
              children: [
                {
                  path: 'vue/test/helpers/.eslintrc',
                  name: '.eslintrc',
                  type: 'file'
                },
                {
                  path: 'vue/test/helpers/classlist.js',
                  name: 'classlist.js',
                  type: 'file'
                },
                {
                  path: 'vue/test/helpers/test-object-option.js',
                  name: 'test-object-option.js',
                  type: 'file'
                },
                {
                  path: 'vue/test/helpers/to-equal.js',
                  name: 'to-equal.js',
                  type: 'file'
                },
                {
                  path: 'vue/test/helpers/to-have-been-warned.js',
                  name: 'to-have-been-warned.js',
                  type: 'file'
                },
                {
                  path: 'vue/test/helpers/trigger-event.js',
                  name: 'trigger-event.js',
                  type: 'file'
                },
                {
                  path: 'vue/test/helpers/vdom.js',
                  name: 'vdom.js',
                  type: 'file'
                },
                {
                  path: 'vue/test/helpers/wait-for-update.js',
                  name: 'wait-for-update.js',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/test/ssr',
              name: 'ssr',
              type: 'folder',
              children: [
                {
                  path: 'vue/test/ssr/.eslintrc',
                  name: '.eslintrc',
                  type: 'file'
                },
                {
                  path: 'vue/test/ssr/async-loader.js',
                  name: 'async-loader.js',
                  type: 'file'
                },
                {
                  path: 'vue/test/ssr/compile-with-webpack.js',
                  name: 'compile-with-webpack.js',
                  type: 'file'
                },
                {
                  path: 'vue/test/ssr/fixtures',
                  name: 'fixtures',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/test/ssr/fixtures/app.js',
                      name: 'app.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/ssr/fixtures/async-bar.js',
                      name: 'async-bar.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/ssr/fixtures/async-foo.js',
                      name: 'async-foo.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/ssr/fixtures/cache.js',
                      name: 'cache.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/ssr/fixtures/error.js',
                      name: 'error.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/ssr/fixtures/nested-cache.js',
                      name: 'nested-cache.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/ssr/fixtures/promise-rejection.js',
                      name: 'promise-rejection.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/ssr/fixtures/split.js',
                      name: 'split.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/ssr/fixtures/test.css',
                      name: 'test.css',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/ssr/fixtures/test.png',
                      name: 'test.png',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/ssr/fixtures/test.woff2',
                      name: 'test.woff2',
                      type: 'file'
                    }
                  ]
                },
                {
                  path: 'vue/test/ssr/jasmine.json',
                  name: 'jasmine.json',
                  type: 'file'
                },
                {
                  path: 'vue/test/ssr/ssr-basic-renderer.spec.js',
                  name: 'ssr-basic-renderer.spec.js',
                  type: 'file'
                },
                {
                  path: 'vue/test/ssr/ssr-bundle-render.spec.js',
                  name: 'ssr-bundle-render.spec.js',
                  type: 'file'
                },
                {
                  path: 'vue/test/ssr/ssr-stream.spec.js',
                  name: 'ssr-stream.spec.js',
                  type: 'file'
                },
                {
                  path: 'vue/test/ssr/ssr-string.spec.js',
                  name: 'ssr-string.spec.js',
                  type: 'file'
                },
                {
                  path: 'vue/test/ssr/ssr-template.spec.js',
                  name: 'ssr-template.spec.js',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/test/unit',
              name: 'unit',
              type: 'folder',
              children: [
                {
                  path: 'vue/test/unit/.eslintrc',
                  name: '.eslintrc',
                  type: 'file'
                },
                {
                  path: 'vue/test/unit/features',
                  name: 'features',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/test/unit/features/component',
                      name: 'component',
                      type: 'folder',
                      children: [
                        {
                          path:
                            'vue/test/unit/features/component/component-async.spec.js',
                          name: 'component-async.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/component/component-keep-alive.spec.js',
                          name: 'component-keep-alive.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/component/component-scoped-slot.spec.js',
                          name: 'component-scoped-slot.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/component/component-slot.spec.js',
                          name: 'component-slot.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/component/component.spec.js',
                          name: 'component.spec.js',
                          type: 'file'
                        }
                      ]
                    },
                    {
                      path: 'vue/test/unit/features/debug.spec.js',
                      name: 'debug.spec.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/unit/features/directives',
                      name: 'directives',
                      type: 'folder',
                      children: [
                        {
                          path:
                            'vue/test/unit/features/directives/bind.spec.js',
                          name: 'bind.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/directives/class.spec.js',
                          name: 'class.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/directives/cloak.spec.js',
                          name: 'cloak.spec.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/unit/features/directives/for.spec.js',
                          name: 'for.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/directives/html.spec.js',
                          name: 'html.spec.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/unit/features/directives/if.spec.js',
                          name: 'if.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/directives/model-checkbox.spec.js',
                          name: 'model-checkbox.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/directives/model-component.spec.js',
                          name: 'model-component.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/directives/model-dynamic.spec.js',
                          name: 'model-dynamic.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/directives/model-file.spec.js',
                          name: 'model-file.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/directives/model-parse.spec.js',
                          name: 'model-parse.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/directives/model-radio.spec.js',
                          name: 'model-radio.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/directives/model-select.spec.js',
                          name: 'model-select.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/directives/model-text.spec.js',
                          name: 'model-text.spec.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/unit/features/directives/on.spec.js',
                          name: 'on.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/directives/once.spec.js',
                          name: 'once.spec.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/unit/features/directives/pre.spec.js',
                          name: 'pre.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/directives/show.spec.js',
                          name: 'show.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/directives/static-style-parser.spec.js',
                          name: 'static-style-parser.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/directives/style.spec.js',
                          name: 'style.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/directives/text.spec.js',
                          name: 'text.spec.js',
                          type: 'file'
                        }
                      ]
                    },
                    {
                      path: 'vue/test/unit/features/error-handling.spec.js',
                      name: 'error-handling.spec.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/unit/features/filter',
                      name: 'filter',
                      type: 'folder',
                      children: [
                        {
                          path: 'vue/test/unit/features/filter/filter.spec.js',
                          name: 'filter.spec.js',
                          type: 'file'
                        }
                      ]
                    },
                    {
                      path: 'vue/test/unit/features/global-api',
                      name: 'global-api',
                      type: 'folder',
                      children: [
                        {
                          path:
                            'vue/test/unit/features/global-api/assets.spec.js',
                          name: 'assets.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/global-api/compile.spec.js',
                          name: 'compile.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/global-api/config.spec.js',
                          name: 'config.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/global-api/extend.spec.js',
                          name: 'extend.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/global-api/mixin.spec.js',
                          name: 'mixin.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/global-api/set-delete.spec.js',
                          name: 'set-delete.spec.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/unit/features/global-api/use.spec.js',
                          name: 'use.spec.js',
                          type: 'file'
                        }
                      ]
                    },
                    {
                      path: 'vue/test/unit/features/instance',
                      name: 'instance',
                      type: 'folder',
                      children: [
                        {
                          path: 'vue/test/unit/features/instance/init.spec.js',
                          name: 'init.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/instance/methods-data.spec.js',
                          name: 'methods-data.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/instance/methods-events.spec.js',
                          name: 'methods-events.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/instance/methods-lifecycle.spec.js',
                          name: 'methods-lifecycle.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/instance/properties.spec.js',
                          name: 'properties.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/instance/render-proxy.spec.js',
                          name: 'render-proxy.spec.js',
                          type: 'file'
                        }
                      ]
                    },
                    {
                      path: 'vue/test/unit/features/options',
                      name: 'options',
                      type: 'folder',
                      children: [
                        {
                          path:
                            'vue/test/unit/features/options/_scopeId.spec.js',
                          name: '_scopeId.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/options/comments.spec.js',
                          name: 'comments.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/options/components.spec.js',
                          name: 'components.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/options/computed.spec.js',
                          name: 'computed.spec.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/unit/features/options/data.spec.js',
                          name: 'data.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/options/delimiters.spec.js',
                          name: 'delimiters.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/options/directives.spec.js',
                          name: 'directives.spec.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/unit/features/options/el.spec.js',
                          name: 'el.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/options/errorCaptured.spec.js',
                          name: 'errorCaptured.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/options/extends.spec.js',
                          name: 'extends.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/options/functional.spec.js',
                          name: 'functional.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/options/inheritAttrs.spec.js',
                          name: 'inheritAttrs.spec.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/unit/features/options/inject.spec.js',
                          name: 'inject.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/options/lifecycle.spec.js',
                          name: 'lifecycle.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/options/methods.spec.js',
                          name: 'methods.spec.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/unit/features/options/mixins.spec.js',
                          name: 'mixins.spec.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/unit/features/options/name.spec.js',
                          name: 'name.spec.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/unit/features/options/parent.spec.js',
                          name: 'parent.spec.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/unit/features/options/props.spec.js',
                          name: 'props.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/options/propsData.spec.js',
                          name: 'propsData.spec.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/unit/features/options/render.spec.js',
                          name: 'render.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/options/renderError.spec.js',
                          name: 'renderError.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/options/template.spec.js',
                          name: 'template.spec.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/unit/features/options/watch.spec.js',
                          name: 'watch.spec.js',
                          type: 'file'
                        }
                      ]
                    },
                    {
                      path: 'vue/test/unit/features/ref.spec.js',
                      name: 'ref.spec.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/unit/features/transition',
                      name: 'transition',
                      type: 'folder',
                      children: [
                        {
                          path:
                            'vue/test/unit/features/transition/inject-styles.js',
                          name: 'inject-styles.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/transition/transition-group.spec.js',
                          name: 'transition-group.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/transition/transition-mode.spec.js',
                          name: 'transition-mode.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/features/transition/transition.spec.js',
                          name: 'transition.spec.js',
                          type: 'file'
                        }
                      ]
                    }
                  ]
                },
                {
                  path: 'vue/test/unit/index.js',
                  name: 'index.js',
                  type: 'file'
                },
                {
                  path: 'vue/test/unit/karma.base.config.js',
                  name: 'karma.base.config.js',
                  type: 'file'
                },
                {
                  path: 'vue/test/unit/karma.cover.config.js',
                  name: 'karma.cover.config.js',
                  type: 'file'
                },
                {
                  path: 'vue/test/unit/karma.dev.config.js',
                  name: 'karma.dev.config.js',
                  type: 'file'
                },
                {
                  path: 'vue/test/unit/karma.sauce.config.js',
                  name: 'karma.sauce.config.js',
                  type: 'file'
                },
                {
                  path: 'vue/test/unit/karma.unit.config.js',
                  name: 'karma.unit.config.js',
                  type: 'file'
                },
                {
                  path: 'vue/test/unit/modules',
                  name: 'modules',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/test/unit/modules/compiler',
                      name: 'compiler',
                      type: 'folder',
                      children: [
                        {
                          path:
                            'vue/test/unit/modules/compiler/codegen.spec.js',
                          name: 'codegen.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/modules/compiler/compiler-options.spec.js',
                          name: 'compiler-options.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/modules/compiler/optimizer.spec.js',
                          name: 'optimizer.spec.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/unit/modules/compiler/parser.spec.js',
                          name: 'parser.spec.js',
                          type: 'file'
                        }
                      ]
                    },
                    {
                      path: 'vue/test/unit/modules/observer',
                      name: 'observer',
                      type: 'folder',
                      children: [
                        {
                          path: 'vue/test/unit/modules/observer/dep.spec.js',
                          name: 'dep.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/modules/observer/observer.spec.js',
                          name: 'observer.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/modules/observer/scheduler.spec.js',
                          name: 'scheduler.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/modules/observer/watcher.spec.js',
                          name: 'watcher.spec.js',
                          type: 'file'
                        }
                      ]
                    },
                    {
                      path: 'vue/test/unit/modules/server-compiler',
                      name: 'server-compiler',
                      type: 'folder',
                      children: [
                        {
                          path:
                            'vue/test/unit/modules/server-compiler/optimizer.spec.js',
                          name: 'optimizer.spec.js',
                          type: 'file'
                        }
                      ]
                    },
                    {
                      path: 'vue/test/unit/modules/sfc',
                      name: 'sfc',
                      type: 'folder',
                      children: [
                        {
                          path: 'vue/test/unit/modules/sfc/sfc-parser.spec.js',
                          name: 'sfc-parser.spec.js',
                          type: 'file'
                        }
                      ]
                    },
                    {
                      path: 'vue/test/unit/modules/util',
                      name: 'util',
                      type: 'folder',
                      children: [
                        {
                          path: 'vue/test/unit/modules/util/next-tick.spec.js',
                          name: 'next-tick.spec.js',
                          type: 'file'
                        }
                      ]
                    },
                    {
                      path: 'vue/test/unit/modules/vdom',
                      name: 'vdom',
                      type: 'folder',
                      children: [
                        {
                          path:
                            'vue/test/unit/modules/vdom/create-component.spec.js',
                          name: 'create-component.spec.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/unit/modules/vdom/create-element.spec.js',
                          name: 'create-element.spec.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/unit/modules/vdom/modules',
                          name: 'modules',
                          type: 'folder',
                          children: [
                            {
                              path:
                                'vue/test/unit/modules/vdom/modules/attrs.spec.js',
                              name: 'attrs.spec.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/unit/modules/vdom/modules/class.spec.js',
                              name: 'class.spec.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/unit/modules/vdom/modules/directive.spec.js',
                              name: 'directive.spec.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/unit/modules/vdom/modules/dom-props.spec.js',
                              name: 'dom-props.spec.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/unit/modules/vdom/modules/events.spec.js',
                              name: 'events.spec.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/unit/modules/vdom/modules/style.spec.js',
                              name: 'style.spec.js',
                              type: 'file'
                            }
                          ]
                        },
                        {
                          path: 'vue/test/unit/modules/vdom/patch',
                          name: 'patch',
                          type: 'folder',
                          children: [
                            {
                              path:
                                'vue/test/unit/modules/vdom/patch/children.spec.js',
                              name: 'children.spec.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/unit/modules/vdom/patch/edge-cases.spec.js',
                              name: 'edge-cases.spec.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/unit/modules/vdom/patch/element.spec.js',
                              name: 'element.spec.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/unit/modules/vdom/patch/hooks.spec.js',
                              name: 'hooks.spec.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/unit/modules/vdom/patch/hydration.spec.js',
                              name: 'hydration.spec.js',
                              type: 'file'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              path: 'vue/test/weex',
              name: 'weex',
              type: 'folder',
              children: [
                {
                  path: 'vue/test/weex/.eslintrc',
                  name: '.eslintrc',
                  type: 'file'
                },
                {
                  path: 'vue/test/weex/cases',
                  name: 'cases',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/test/weex/cases/cases.spec.js',
                      name: 'cases.spec.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/weex/cases/event',
                      name: 'event',
                      type: 'folder',
                      children: [
                        {
                          path: 'vue/test/weex/cases/event/click.after.vdom.js',
                          name: 'click.after.vdom.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/weex/cases/event/click.before.vdom.js',
                          name: 'click.before.vdom.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/weex/cases/event/click.vue',
                          name: 'click.vue',
                          type: 'file'
                        }
                      ]
                    },
                    {
                      path: 'vue/test/weex/cases/recycle-list',
                      name: 'recycle-list',
                      type: 'folder',
                      children: [
                        {
                          path:
                            'vue/test/weex/cases/recycle-list/attrs.vdom.js',
                          name: 'attrs.vdom.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/weex/cases/recycle-list/attrs.vue',
                          name: 'attrs.vue',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/weex/cases/recycle-list/classname.vdom.js',
                          name: 'classname.vdom.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/weex/cases/recycle-list/classname.vue',
                          name: 'classname.vue',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/weex/cases/recycle-list/components',
                          name: 'components',
                          type: 'folder',
                          children: [
                            {
                              path:
                                'vue/test/weex/cases/recycle-list/components/banner.vue',
                              name: 'banner.vue',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/weex/cases/recycle-list/components/counter.vue',
                              name: 'counter.vue',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/weex/cases/recycle-list/components/editor.vue',
                              name: 'editor.vue',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/weex/cases/recycle-list/components/footer.vue',
                              name: 'footer.vue',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/weex/cases/recycle-list/components/lifecycle.vue',
                              name: 'lifecycle.vue',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/weex/cases/recycle-list/components/poster.vue',
                              name: 'poster.vue',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/weex/cases/recycle-list/components/stateful-lifecycle.vdom.js',
                              name: 'stateful-lifecycle.vdom.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/weex/cases/recycle-list/components/stateful-lifecycle.vue',
                              name: 'stateful-lifecycle.vue',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/weex/cases/recycle-list/components/stateful-v-model.vdom.js',
                              name: 'stateful-v-model.vdom.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/weex/cases/recycle-list/components/stateful-v-model.vue',
                              name: 'stateful-v-model.vue',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/weex/cases/recycle-list/components/stateful.vdom.js',
                              name: 'stateful.vdom.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/weex/cases/recycle-list/components/stateful.vue',
                              name: 'stateful.vue',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/weex/cases/recycle-list/components/stateless-multi-components.vdom.js',
                              name: 'stateless-multi-components.vdom.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/weex/cases/recycle-list/components/stateless-multi-components.vue',
                              name: 'stateless-multi-components.vue',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/weex/cases/recycle-list/components/stateless-with-props.vdom.js',
                              name: 'stateless-with-props.vdom.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/weex/cases/recycle-list/components/stateless-with-props.vue',
                              name: 'stateless-with-props.vue',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/weex/cases/recycle-list/components/stateless.vdom.js',
                              name: 'stateless.vdom.js',
                              type: 'file'
                            },
                            {
                              path:
                                'vue/test/weex/cases/recycle-list/components/stateless.vue',
                              name: 'stateless.vue',
                              type: 'file'
                            }
                          ]
                        },
                        {
                          path:
                            'vue/test/weex/cases/recycle-list/inline-style.vdom.js',
                          name: 'inline-style.vdom.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/weex/cases/recycle-list/inline-style.vue',
                          name: 'inline-style.vue',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/weex/cases/recycle-list/text-node.vdom.js',
                          name: 'text-node.vdom.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/weex/cases/recycle-list/text-node.vue',
                          name: 'text-node.vue',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/weex/cases/recycle-list/v-else-if.vdom.js',
                          name: 'v-else-if.vdom.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/weex/cases/recycle-list/v-else-if.vue',
                          name: 'v-else-if.vue',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/weex/cases/recycle-list/v-else.vdom.js',
                          name: 'v-else.vdom.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/weex/cases/recycle-list/v-else.vue',
                          name: 'v-else.vue',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/weex/cases/recycle-list/v-for-iterator.vdom.js',
                          name: 'v-for-iterator.vdom.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/weex/cases/recycle-list/v-for-iterator.vue',
                          name: 'v-for-iterator.vue',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/weex/cases/recycle-list/v-for.vdom.js',
                          name: 'v-for.vdom.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/weex/cases/recycle-list/v-for.vue',
                          name: 'v-for.vue',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/weex/cases/recycle-list/v-if.vdom.js',
                          name: 'v-if.vdom.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/weex/cases/recycle-list/v-if.vue',
                          name: 'v-if.vue',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/weex/cases/recycle-list/v-on-inline.vdom.js',
                          name: 'v-on-inline.vdom.js',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/weex/cases/recycle-list/v-on-inline.vue',
                          name: 'v-on-inline.vue',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/weex/cases/recycle-list/v-on.vdom.js',
                          name: 'v-on.vdom.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/weex/cases/recycle-list/v-on.vue',
                          name: 'v-on.vue',
                          type: 'file'
                        },
                        {
                          path:
                            'vue/test/weex/cases/recycle-list/v-once.vdom.js',
                          name: 'v-once.vdom.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/weex/cases/recycle-list/v-once.vue',
                          name: 'v-once.vue',
                          type: 'file'
                        }
                      ]
                    },
                    {
                      path: 'vue/test/weex/cases/render',
                      name: 'render',
                      type: 'folder',
                      children: [
                        {
                          path: 'vue/test/weex/cases/render/sample.vdom.js',
                          name: 'sample.vdom.js',
                          type: 'file'
                        },
                        {
                          path: 'vue/test/weex/cases/render/sample.vue',
                          name: 'sample.vue',
                          type: 'file'
                        }
                      ]
                    }
                  ]
                },
                {
                  path: 'vue/test/weex/compiler',
                  name: 'compiler',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/test/weex/compiler/append.spec.js',
                      name: 'append.spec.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/weex/compiler/class.spec.js',
                      name: 'class.spec.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/weex/compiler/compile.spec.js',
                      name: 'compile.spec.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/weex/compiler/parser.spec.js',
                      name: 'parser.spec.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/weex/compiler/props.spec.js',
                      name: 'props.spec.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/weex/compiler/style.spec.js',
                      name: 'style.spec.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/weex/compiler/v-model.spec.js',
                      name: 'v-model.spec.js',
                      type: 'file'
                    }
                  ]
                },
                {
                  path: 'vue/test/weex/helpers',
                  name: 'helpers',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/test/weex/helpers/index.js',
                      name: 'index.js',
                      type: 'file'
                    }
                  ]
                },
                {
                  path: 'vue/test/weex/jasmine.json',
                  name: 'jasmine.json',
                  type: 'file'
                },
                {
                  path: 'vue/test/weex/runtime',
                  name: 'runtime',
                  type: 'folder',
                  children: [
                    {
                      path: 'vue/test/weex/runtime/attrs.spec.js',
                      name: 'attrs.spec.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/weex/runtime/class.spec.js',
                      name: 'class.spec.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/weex/runtime/components',
                      name: 'components',
                      type: 'folder',
                      children: [
                        {
                          path:
                            'vue/test/weex/runtime/components/richtext.spec.js',
                          name: 'richtext.spec.js',
                          type: 'file'
                        }
                      ]
                    },
                    {
                      path: 'vue/test/weex/runtime/events.spec.js',
                      name: 'events.spec.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/weex/runtime/framework.spec.js',
                      name: 'framework.spec.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/weex/runtime/node.spec.js',
                      name: 'node.spec.js',
                      type: 'file'
                    },
                    {
                      path: 'vue/test/weex/runtime/style.spec.js',
                      name: 'style.spec.js',
                      type: 'file'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          path: 'vue/types',
          name: 'types',
          type: 'folder',
          children: [
            {
              path: 'vue/types/index.d.ts',
              name: 'index.d.ts',
              type: 'file'
            },
            {
              path: 'vue/types/options.d.ts',
              name: 'options.d.ts',
              type: 'file'
            },
            {
              path: 'vue/types/plugin.d.ts',
              name: 'plugin.d.ts',
              type: 'file'
            },
            {
              path: 'vue/types/test',
              name: 'test',
              type: 'folder',
              children: [
                {
                  path: 'vue/types/test/augmentation-test.ts',
                  name: 'augmentation-test.ts',
                  type: 'file'
                },
                {
                  path: 'vue/types/test/es-module.ts',
                  name: 'es-module.ts',
                  type: 'file'
                },
                {
                  path: 'vue/types/test/options-test.ts',
                  name: 'options-test.ts',
                  type: 'file'
                },
                {
                  path: 'vue/types/test/plugin-test.ts',
                  name: 'plugin-test.ts',
                  type: 'file'
                },
                {
                  path: 'vue/types/test/ssr-test.ts',
                  name: 'ssr-test.ts',
                  type: 'file'
                },
                {
                  path: 'vue/types/test/tsconfig.json',
                  name: 'tsconfig.json',
                  type: 'file'
                },
                {
                  path: 'vue/types/test/vue-test.ts',
                  name: 'vue-test.ts',
                  type: 'file'
                }
              ]
            },
            {
              path: 'vue/types/tsconfig.json',
              name: 'tsconfig.json',
              type: 'file'
            },
            {
              path: 'vue/types/typings.json',
              name: 'typings.json',
              type: 'file'
            },
            {
              path: 'vue/types/vnode.d.ts',
              name: 'vnode.d.ts',
              type: 'file'
            },
            { path: 'vue/types/vue.d.ts', name: 'vue.d.ts', type: 'file' }
          ]
        },
        { path: 'vue/yarn.lock', name: 'yarn.lock', type: 'file' }
      ]
    }
  },
  mutations: {
    toggleOpened(state, name) {
      if (state.opened.includes(name)) {
        state.opened = state.opened.filter(e => e !== name)
      } else {
        state.opened.push(name)
      }
    }
  },
  actions: {}
})
