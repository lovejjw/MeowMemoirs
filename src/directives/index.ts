import type { App } from "vue";
import auth from "./modules/auth";
import waterMarker from "./modules/waterMarker";
import draggable from "./modules/draggable";
import debounce from "./modules/debounce";
import debounceInput from "./modules/debounceInput";
import throttle from "./modules/throttle";
import throttleInput from "./modules/throttleInput";
import adaptive from "./modules/adaptive";
import adaptiveTree from "./modules/adaptiveTree";
import copy from "./modules/copy";
import videoObserver from "./modules/videoObserver";
import slideIn from "./modules/slideIn";
import progressive from "./modules/progressive";

const directivesList: any = {
  auth,
  waterMarker,
  draggable,
  debounce,
  debounceInput,
  throttle,
  throttleInput,
  adaptive,
  adaptiveTree,
  copy,
  videoObserver,
  slideIn,
  progressive,
};

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      // 注册所有自定义指令
      app.directive(key, directivesList[key]);
    });
  },
};

export default directives;
