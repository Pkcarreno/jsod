import BROWSER_RELEASE_SYNC from '@jitl/quickjs-ng-wasmfile-release-sync';
import RELEASE_SYNC_LOCATION from '@jitl/quickjs-ng-wasmfile-release-sync/wasm?url';
import {
  newQuickJSWASMModuleFromVariant,
  newVariant,
} from 'quickjs-emscripten-core';

const variant = newVariant(BROWSER_RELEASE_SYNC, {
  wasmLocation: RELEASE_SYNC_LOCATION,
});

export async function getQuickJS() {
  return await newQuickJSWASMModuleFromVariant(variant);
}
