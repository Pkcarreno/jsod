# Changelog

## [1.7.2](https://github.com/Pkcarreno/jsod/compare/v1.7.1...v1.7.2) (2025-01-10)


### Bug Fixes

* **store:** default settings ([334305c](https://github.com/Pkcarreno/jsod/commit/334305c885e129497d322d399a20dfe8acb410d3))

## [1.7.1](https://github.com/Pkcarreno/jsod/compare/v1.7.0...v1.7.1) (2025-01-08)


### Bug Fixes

* action button styles ([5ec8d49](https://github.com/Pkcarreno/jsod/commit/5ec8d49f5e6cf64ad236d8451babdafd4af3852d))
* add placeholder setting ([e5aa8df](https://github.com/Pkcarreno/jsod/commit/e5aa8df821fb18f52161c0d5ef5a0abf7bcdc6ca))
* animate action button ([c07a1a0](https://github.com/Pkcarreno/jsod/commit/c07a1a0a5365602af76253ba5344a15c97bee57a))
* implement placeholder on editor with a 'how to use' guide ([0ff7c34](https://github.com/Pkcarreno/jsod/commit/0ff7c34a806ac8a9c6f76520d0847b7f82d4970d))
* improve action button animation & add execution layer provider ([c5a9826](https://github.com/Pkcarreno/jsod/commit/c5a9826b19a13cdc5d34663cde583088b1b2f9f1))
* layout button styles ([d946457](https://github.com/Pkcarreno/jsod/commit/d946457f692ffedbc997caf2fb8813c4208e21bb))
* prevent multiple executions ([71a9c3f](https://github.com/Pkcarreno/jsod/commit/71a9c3f6a4f848a4184e96ef4f51f746228eef30))

## [1.7.0](https://github.com/Pkcarreno/jsod/compare/v1.6.0...v1.7.0) (2025-01-01)


### Features

* change autorun modifier location ([b09375d](https://github.com/Pkcarreno/jsod/commit/b09375ded29d79d1d1755e2e5a7d8d8a96510ca3))
* improve script details section ([4a2bbab](https://github.com/Pkcarreno/jsod/commit/4a2bbab52f9a829b86ddb3ce82f31ea6ab415311))
* **settings:** make autorun setting true by default ([99b5301](https://github.com/Pkcarreno/jsod/commit/99b530178eddc220fa2096995e72e2edb5429f0a))
* use react document metadata instead of react-helmet-async ([6c2c3fc](https://github.com/Pkcarreno/jsod/commit/6c2c3fc6e6a8de1647cda5cd60c5f7904d351f75))
* **workflow:** rework desktop footer and on panels collapse action buttons location ([47514fb](https://github.com/Pkcarreno/jsod/commit/47514fb780c260cd8dd960041eb8e9d49c45742c))


### Bug Fixes

* **config:** workaround to codemirror 'unrecognized extension value in' ([d0dde9d](https://github.com/Pkcarreno/jsod/commit/d0dde9df75d7d1acf1b6c5876c15927d2369930d))
* **deps:** remove unused component and related: tabs ([2043a2d](https://github.com/Pkcarreno/jsod/commit/2043a2d6fd5a94c8475cb9413bc402356e420f7d))
* hide layout button on mobile screen size ([f026faf](https://github.com/Pkcarreno/jsod/commit/f026faf9e557223a1f97a157fc18dd06c967b7f8))
* **types:** upgrade to react 19 types ([fb1e1cc](https://github.com/Pkcarreno/jsod/commit/fb1e1cceb3d058c3c846dc107d9545be0b614e5b))
* **vite:** disable basic ssl in order to run dev enviroment ([245dc9c](https://github.com/Pkcarreno/jsod/commit/245dc9c8ec07ddfc41eac5ed5857f1d6353b8828))
* **workflow:** remove first time dialog and place about content on FAQ ([5e7226a](https://github.com/Pkcarreno/jsod/commit/5e7226a0ffb2c50d34f7aa2cf7f7710a455d4c29))

## [1.6.0](https://github.com/Pkcarreno/jsod/compare/v1.5.0...v1.6.0) (2024-11-02)


### Features

* add helmet & script title and description ([318eb2c](https://github.com/Pkcarreno/jsod/commit/318eb2c7b713ae9ca1d3ea1296617f0c77511453))


### Bug Fixes

* **engine:** increase memory limit & max stack size in quickjs runtime ([faf64a0](https://github.com/Pkcarreno/jsod/commit/faf64a0ff9d5528076264a5c50cec7453513deec))
* improve clickability of untrusted mode sign ([7f5d322](https://github.com/Pkcarreno/jsod/commit/7f5d322747187391dc1c860949bfbcae32a979bd))
* **meta:** improve metatags ([0b7d36d](https://github.com/Pkcarreno/jsod/commit/0b7d36dc384358984de9ded69916aa1cccd6274a))

## [1.5.0](https://github.com/Pkcarreno/jsod/compare/v1.4.0...v1.5.0) (2024-10-12)


### Features

* **editor:** vim motions ([1ed8e1d](https://github.com/Pkcarreno/jsod/commit/1ed8e1dcff5ce8307f1c1d44b6d4efa5cb5d334e))
* **log:** add debug mode ([c3f1765](https://github.com/Pkcarreno/jsod/commit/c3f1765c2962a58e1b2519e7fdc45e57a14e3929))
* **output:** rework output workflow ([c2de00b](https://github.com/Pkcarreno/jsod/commit/c2de00b43c8f00c510bdf31b693e1c70c67cce68))


### Bug Fixes

* **engine:** insert loop threshold in runtime ([ebfeec8](https://github.com/Pkcarreno/jsod/commit/ebfeec8aaa0748e55d5b651db6c2d47b5275ceff))
* **settings:** increase loop threshold interval ([b04e18d](https://github.com/Pkcarreno/jsod/commit/b04e18d8da5346b00ddb98412850a87e34662386))
* **settings:** increase runtime timeout interval ([05fcaef](https://github.com/Pkcarreno/jsod/commit/05fcaeff7b5e49a05e8cfd02f0a99dc148edd44d))
* **settings:** update loop threshold defaults ([798d1c9](https://github.com/Pkcarreno/jsod/commit/798d1c97a7bc7b25e7e475084688eb41037562fe))
* **ui:** tab inactive illegible on dark mode ([c1c9230](https://github.com/Pkcarreno/jsod/commit/c1c9230b4cd5bcb34057acfc1a19ab727d085c15))

## [1.4.0](https://github.com/Pkcarreno/jsod/compare/v1.3.4...v1.4.0) (2024-10-06)


### Features

* add embed option on share menu ([f47885c](https://github.com/Pkcarreno/jsod/commit/f47885c4339f5ca267f3350ff12f38bcfa2001b0))
* **embeded:** make app embedable ([00258f0](https://github.com/Pkcarreno/jsod/commit/00258f0a8fe507296ed184c47074f1852d5bdaf8))


### Bug Fixes

* **output:** improve render value behavior ([81e6e13](https://github.com/Pkcarreno/jsod/commit/81e6e137640ed3b0c374cffbf31deee3162d9718))
* **ui:** make dialog scrollable ([02f1d8e](https://github.com/Pkcarreno/jsod/commit/02f1d8e7274e8f85663c44b25a5a9233e8b2a5f2))

## [1.3.4](https://github.com/Pkcarreno/jsod/compare/v1.3.3...v1.3.4) (2024-09-05)


### Bug Fixes

* modules incompatibility ([c5a13a2](https://github.com/Pkcarreno/jsod/commit/c5a13a2d54f3a92e6389aa45f30189d838fd0613))

## [1.3.3](https://github.com/Pkcarreno/jsod/compare/v1.3.2...v1.3.3) (2024-08-06)


### Bug Fixes

* increase workbox maximum file size to cache on buildtime ([ac8f178](https://github.com/Pkcarreno/jsod/commit/ac8f17861cdeee9f27906d2ef6ed7e749c15bb18))

## [1.3.2](https://github.com/Pkcarreno/jsod/compare/v1.3.1...v1.3.2) (2024-07-16)


### Bug Fixes

* **sonner:** add important modifier to button styles ([150108a](https://github.com/Pkcarreno/jsod/commit/150108ab7331049a9bd1640d7004ec9050f2ce3b))

## [1.3.1](https://github.com/Pkcarreno/jsod/compare/v1.3.0...v1.3.1) (2024-07-08)


### Bug Fixes

* issue at resolving packages ([ab184d1](https://github.com/Pkcarreno/jsod/commit/ab184d1322cac3c41c5f2be5b7d481e8f9e7c953))

## [1.3.0](https://github.com/Pkcarreno/jsod/compare/v1.2.1...v1.3.0) (2024-07-07)


### Features

* expose globals to codemirror eslint ([78661f8](https://github.com/Pkcarreno/jsod/commit/78661f8badf01e401bb4e61aa230ab0c4e3b2e47))


### Bug Fixes

* codemirror eslint incompatible type ([e2a8138](https://github.com/Pkcarreno/jsod/commit/e2a8138d031cec0948d620925459465d283618ad))

## [1.2.1](https://github.com/Pkcarreno/jsod/compare/v1.2.0...v1.2.1) (2024-06-29)


### Bug Fixes

* handle long output ([6b57469](https://github.com/Pkcarreno/jsod/commit/6b57469d5cdfd3134298b4ad14c2b336a595d7d4))
* tweak scrollbar on chromium based browsers ([3e4d255](https://github.com/Pkcarreno/jsod/commit/3e4d255675b196742698ed42678bc51e9b15915a))

## [1.2.0](https://github.com/Pkcarreno/jsod/compare/v1.1.0...v1.2.0) (2024-06-08)


### Features

* show badge on bottom bar in mobile view ([02dcefd](https://github.com/Pkcarreno/jsod/commit/02dcefdf5c84614bd1585b80223b02a108840cf5))
* shows repeated log counter ([bea17ec](https://github.com/Pkcarreno/jsod/commit/bea17ec675181aab5480b13a29ac526618359331))

## [1.1.0](https://github.com/Pkcarreno/jsod/compare/v1.0.2...v1.1.0) (2024-06-05)


### Features

* **pwa:** prompt offline ready and new update ([d15a49f](https://github.com/Pkcarreno/jsod/commit/d15a49f6380b3a4226c725c28f56dfc8c43e90e5))


### Bug Fixes

* improve app icon ([6ecd3f1](https://github.com/Pkcarreno/jsod/commit/6ecd3f13723ce6adbe92a327b8a2766759ba8d1a))
* improve url compatibility ([9b2a41a](https://github.com/Pkcarreno/jsod/commit/9b2a41ad6818c9ba9c460385bed7703b277d7bb0))

## [1.0.2](https://github.com/Pkcarreno/jsod/compare/v1.0.1...v1.0.2) (2024-06-03)


### Bug Fixes

* add screenshots to manifest ([4e8cf1f](https://github.com/Pkcarreno/jsod/commit/4e8cf1f01bd877a7c7d98304c5e1c992a728c4d2))
* add wasm to files to be cached ([d4cdfbd](https://github.com/Pkcarreno/jsod/commit/d4cdfbdb1af4ce3f77e29749c6c7022086eb2a76))
* path to icons ([b769360](https://github.com/Pkcarreno/jsod/commit/b769360aa96a2704f28bff0899c2d39d82738df3))
* shared link refresh on time ([d609569](https://github.com/Pkcarreno/jsod/commit/d609569a8216c60108a2d286b9f0bccb458fcce2))

## [1.0.1](https://github.com/Pkcarreno/jsod/compare/v1.0.0...v1.0.1) (2024-06-02)


### Bug Fixes

* limited fonts to be exported ([de55270](https://github.com/Pkcarreno/jsod/commit/de55270c508a7f94251f86b7425bfdcd73fd13eb))
* resolve worker format ([107cd58](https://github.com/Pkcarreno/jsod/commit/107cd586e5853844a973ff8b9e0ccbcdb319d8ca))

## 1.0.0 (2024-06-02)


### Features

* first commit ([1b32fd3](https://github.com/Pkcarreno/jsod/commit/1b32fd32fa605e9d5b342e40d07083a591952350))
