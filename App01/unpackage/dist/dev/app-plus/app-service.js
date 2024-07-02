if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$k = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v) => v.font_class === this.type);
        if (code) {
          return code.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-d31e1c47"], ["__file", "F:/SkinApp/App01/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  function obj2strClass(obj) {
    let classess = "";
    for (let key in obj) {
      const val = obj[key];
      if (val) {
        classess += `${key} `;
      }
    }
    return classess;
  }
  function obj2strStyle(obj) {
    let style = "";
    for (let key in obj) {
      const val = obj[key];
      style += `${key}:${val};`;
    }
    return style;
  }
  const _sfc_main$j = {
    name: "uni-easyinput",
    emits: ["click", "iconClick", "update:modelValue", "input", "focus", "blur", "confirm", "clear", "eyes", "change", "keyboardheightchange"],
    model: {
      prop: "modelValue",
      event: "update:modelValue"
    },
    options: {
      virtualHost: true
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      },
      formItem: {
        from: "uniFormItem",
        default: null
      }
    },
    props: {
      name: String,
      value: [Number, String],
      modelValue: [Number, String],
      type: {
        type: String,
        default: "text"
      },
      clearable: {
        type: Boolean,
        default: true
      },
      autoHeight: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: " "
      },
      placeholderStyle: String,
      focus: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      confirmType: {
        type: String,
        default: "done"
      },
      clearSize: {
        type: [Number, String],
        default: 24
      },
      inputBorder: {
        type: Boolean,
        default: true
      },
      prefixIcon: {
        type: String,
        default: ""
      },
      suffixIcon: {
        type: String,
        default: ""
      },
      trim: {
        type: [Boolean, String],
        default: false
      },
      cursorSpacing: {
        type: Number,
        default: 0
      },
      passwordIcon: {
        type: Boolean,
        default: true
      },
      primaryColor: {
        type: String,
        default: "#2979ff"
      },
      styles: {
        type: Object,
        default() {
          return {
            color: "#333",
            backgroundColor: "#fff",
            disableColor: "#F7F6F6",
            borderColor: "#e5e5e5"
          };
        }
      },
      errorMessage: {
        type: [String, Boolean],
        default: ""
      }
    },
    data() {
      return {
        focused: false,
        val: "",
        showMsg: "",
        border: false,
        isFirstBorder: false,
        showClearIcon: false,
        showPassword: false,
        focusShow: false,
        localMsg: "",
        isEnter: false
        // 用于判断当前是否是使用回车操作
      };
    },
    computed: {
      // 输入框内是否有值
      isVal() {
        const val = this.val;
        if (val || val === 0) {
          return true;
        }
        return false;
      },
      msg() {
        return this.localMsg || this.errorMessage;
      },
      // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，用户可以传入字符串数值
      inputMaxlength() {
        return Number(this.maxlength);
      },
      // 处理外层样式的style
      boxStyle() {
        return `color:${this.inputBorder && this.msg ? "#e43d33" : this.styles.color};`;
      },
      // input 内容的类和样式处理
      inputContentClass() {
        return obj2strClass({
          "is-input-border": this.inputBorder,
          "is-input-error-border": this.inputBorder && this.msg,
          "is-textarea": this.type === "textarea",
          "is-disabled": this.disabled,
          "is-focused": this.focusShow
        });
      },
      inputContentStyle() {
        const focusColor = this.focusShow ? this.primaryColor : this.styles.borderColor;
        const borderColor = this.inputBorder && this.msg ? "#dd524d" : focusColor;
        return obj2strStyle({
          "border-color": borderColor || "#e5e5e5",
          "background-color": this.disabled ? this.styles.disableColor : this.styles.backgroundColor
        });
      },
      // input右侧样式
      inputStyle() {
        const paddingRight = this.type === "password" || this.clearable || this.prefixIcon ? "" : "10px";
        return obj2strStyle({
          "padding-right": paddingRight,
          "padding-left": this.prefixIcon ? "" : "10px"
        });
      }
    },
    watch: {
      value(newVal) {
        this.val = newVal;
      },
      modelValue(newVal) {
        this.val = newVal;
      },
      focus(newVal) {
        this.$nextTick(() => {
          this.focused = this.focus;
          this.focusShow = this.focus;
        });
      }
    },
    created() {
      this.init();
      if (this.form && this.formItem) {
        this.$watch("formItem.errMsg", (newVal) => {
          this.localMsg = newVal;
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.focused = this.focus;
        this.focusShow = this.focus;
      });
    },
    methods: {
      /**
       * 初始化变量值
       */
      init() {
        if (this.value || this.value === 0) {
          this.val = this.value;
        } else if (this.modelValue || this.modelValue === 0 || this.modelValue === "") {
          this.val = this.modelValue;
        } else {
          this.val = null;
        }
      },
      /**
       * 点击图标时触发
       * @param {Object} type
       */
      onClickIcon(type) {
        this.$emit("iconClick", type);
      },
      /**
       * 显示隐藏内容，密码框时生效
       */
      onEyes() {
        this.showPassword = !this.showPassword;
        this.$emit("eyes", this.showPassword);
      },
      /**
       * 输入时触发
       * @param {Object} event
       */
      onInput(event) {
        let value = event.detail.value;
        if (this.trim) {
          if (typeof this.trim === "boolean" && this.trim) {
            value = this.trimStr(value);
          }
          if (typeof this.trim === "string") {
            value = this.trimStr(value, this.trim);
          }
        }
        if (this.errMsg)
          this.errMsg = "";
        this.val = value;
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
      },
      /**
       * 外部调用方法
       * 获取焦点时触发
       * @param {Object} event
       */
      onFocus() {
        this.$nextTick(() => {
          this.focused = true;
        });
        this.$emit("focus", null);
      },
      _Focus(event) {
        this.focusShow = true;
        this.$emit("focus", event);
      },
      /**
       * 外部调用方法
       * 失去焦点时触发
       * @param {Object} event
       */
      onBlur() {
        this.focused = false;
        this.$emit("focus", null);
      },
      _Blur(event) {
        event.detail.value;
        this.focusShow = false;
        this.$emit("blur", event);
        if (this.isEnter === false) {
          this.$emit("change", this.val);
        }
        if (this.form && this.formItem) {
          const { validateTrigger } = this.form;
          if (validateTrigger === "blur") {
            this.formItem.onFieldChange();
          }
        }
      },
      /**
       * 按下键盘的发送键
       * @param {Object} e
       */
      onConfirm(e) {
        this.$emit("confirm", this.val);
        this.isEnter = true;
        this.$emit("change", this.val);
        this.$nextTick(() => {
          this.isEnter = false;
        });
      },
      /**
       * 清理内容
       * @param {Object} event
       */
      onClear(event) {
        this.val = "";
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
        this.$emit("clear");
      },
      /**
       * 键盘高度发生变化的时候触发此事件
       * 兼容性：微信小程序2.7.0+、App 3.1.0+
       * @param {Object} event
       */
      onkeyboardheightchange(event) {
        this.$emit("keyboardheightchange", event);
      },
      /**
       * 去除空格
       */
      trimStr(str, pos = "both") {
        if (pos === "both") {
          return str.trim();
        } else if (pos === "left") {
          return str.trimLeft();
        } else if (pos === "right") {
          return str.trimRight();
        } else if (pos === "start") {
          return str.trimStart();
        } else if (pos === "end") {
          return str.trimEnd();
        } else if (pos === "all") {
          return str.replace(/\s+/g, "");
        } else if (pos === "none") {
          return str;
        }
        return str;
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_2);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-easyinput", { "uni-easyinput-error": $options.msg }]),
        style: vue.normalizeStyle($options.boxStyle)
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-easyinput__content", $options.inputContentClass]),
            style: vue.normalizeStyle($options.inputContentStyle)
          },
          [
            $props.prefixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
              key: 0,
              class: "content-clear-icon",
              type: $props.prefixIcon,
              color: "#c0c4cc",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.onClickIcon("prefix")),
              size: "22"
            }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true),
            $props.type === "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
              key: 1,
              class: vue.normalizeClass(["uni-easyinput__content-textarea", { "input-padding": $props.inputBorder }]),
              name: $props.name,
              value: $data.val,
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              disabled: $props.disabled,
              "placeholder-class": "uni-easyinput__placeholder-class",
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              autoHeight: $props.autoHeight,
              "cursor-spacing": $props.cursorSpacing,
              onInput: _cache[1] || (_cache[1] = (...args) => $options.onInput && $options.onInput(...args)),
              onBlur: _cache[2] || (_cache[2] = (...args) => $options._Blur && $options._Blur(...args)),
              onFocus: _cache[3] || (_cache[3] = (...args) => $options._Focus && $options._Focus(...args)),
              onConfirm: _cache[4] || (_cache[4] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[5] || (_cache[5] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 42, ["name", "value", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "autoHeight", "cursor-spacing"])) : (vue.openBlock(), vue.createElementBlock("input", {
              key: 2,
              type: $props.type === "password" ? "text" : $props.type,
              class: "uni-easyinput__content-input",
              style: vue.normalizeStyle($options.inputStyle),
              name: $props.name,
              value: $data.val,
              password: !$data.showPassword && $props.type === "password",
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              "placeholder-class": "uni-easyinput__placeholder-class",
              disabled: $props.disabled,
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              confirmType: $props.confirmType,
              "cursor-spacing": $props.cursorSpacing,
              onFocus: _cache[6] || (_cache[6] = (...args) => $options._Focus && $options._Focus(...args)),
              onBlur: _cache[7] || (_cache[7] = (...args) => $options._Blur && $options._Blur(...args)),
              onInput: _cache[8] || (_cache[8] = (...args) => $options.onInput && $options.onInput(...args)),
              onConfirm: _cache[9] || (_cache[9] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[10] || (_cache[10] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 44, ["type", "name", "value", "password", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "confirmType", "cursor-spacing"])),
            $props.type === "password" && $props.passwordIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 3 },
              [
                vue.createCommentVNode(" 开启密码时显示小眼睛 "),
                $options.isVal ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: $data.showPassword ? "eye-slash-filled" : "eye-filled",
                  size: 22,
                  color: $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onEyes
                }, null, 8, ["class", "type", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : $props.suffixIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 4 },
              [
                $props.suffixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: "content-clear-icon",
                  type: $props.suffixIcon,
                  color: "#c0c4cc",
                  onClick: _cache[11] || (_cache[11] = ($event) => $options.onClickIcon("suffix")),
                  size: "22"
                }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 5 },
              [
                $props.clearable && $options.isVal && !$props.disabled && $props.type !== "textarea" ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: "clear",
                  size: $props.clearSize,
                  color: $options.msg ? "#dd524d" : $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onClear
                }, null, 8, ["class", "size", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )),
            vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-09fd5285"], ["__file", "F:/SkinApp/App01/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation({
        ...options
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$i = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      },
      onceRender: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 生成样式数据
      stylesObject() {
        let styles = {
          ...this.styles,
          "transition-duration": this.duration / 1e3 + "s"
        };
        let transform = "";
        for (let i in styles) {
          let line = this.toLine(i);
          transform += line + ":" + styles[i] + ";";
        }
        return transform;
      },
      // 初始化动画条件
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i in obj) {
          try {
            if (typeof obj[i] === "object") {
              this.animation[i](...obj[i]);
            } else {
              this.animation[i](obj[i]);
            }
          } catch (e) {
            formatAppLog("error", "at uni_modules/uni-transition/components/uni-transition/uni-transition.vue:148", `方法 ${i} 不存在`);
          }
        }
        this.animation.step(config);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过度动画
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type2, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type2)[mode];
          } else {
            styles.transform += this.animationType(type2)[mode] + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildStyle(type, mode);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 1 : 0,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])), [
      [vue.vShow, $data.isShow]
    ]);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__file", "F:/SkinApp/App01/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$h = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: "center"
      },
      // maskClick
      isMaskClick: {
        type: Boolean,
        default: null
      },
      // TODO 2 个版本后废弃属性 ，使用 isMaskClick
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      }
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      /**
       * 监听遮罩是否可点击
       * @param {Object} val
       */
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: "top"
      };
    },
    computed: {
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible() {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      /**
       * 公用方法，遮罩层禁止点击
       */
      disableMask() {
        this.mkclick = false;
      },
      // TODO nvue 取消冒泡
      clear(e) {
        e.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          formatAppLog("error", "at uni_modules/uni-popup/components/uni-popup/uni-popup.vue:280", "缺少类型：", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      /**
       * 中间弹出样式处理
       */
      center(type) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      left(type) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      right(type) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$1);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
              key: "1",
              name: "mask",
              "mode-class": "fade",
              styles: $data.maskClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uni_transition, {
              key: "2",
              "mode-class": $data.ani,
              name: "content",
              styles: $data.transClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
                    style: vue.normalizeStyle({ backgroundColor: $options.bg }),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
          ],
          32
          /* HYDRATE_EVENTS */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-4dd3c44b"], ["__file", "F:/SkinApp/App01/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
  const _sfc_main$g = {
    data() {
      return {
        form: {
          username: "",
          sex: "男",
          age: "",
          birth: "出生年月",
          is_default: 0
        },
        form1: {
          info_id: "",
          username: "",
          sex: "男",
          age: ""
        },
        count: 0,
        image: true,
        isChecked: true,
        cmodel: "A",
        infoman: [],
        cload: "A",
        sl: true,
        mask: true,
        i2t: "i",
        swc: false,
        currenttime: "",
        year: "",
        Bttext: "创建用户",
        error: false,
        errormessgae: "",
        toB: false,
        camorpho: true,
        time1: null,
        time2: null
      };
    },
    onLoad() {
    },
    onShow() {
      uni.showTabBar();
      let current = /* @__PURE__ */ new Date();
      let year = current.getFullYear();
      this.year = year;
      let month = current.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      this.currenttime = year + "-" + month;
      this.Count();
      this.time1 = setInterval(() => {
        this.Count();
      }, 36e5);
      this.$device(function(result) {
        if (result == 2) {
          uni.showToast({
            icon: "error",
            title: "账号在异地登录",
            mask: true
          });
          setTimeout(() => {
            uni.reLaunch({
              url: "/pages/index/index"
            });
          }, 1e3);
        } else if (result == 4) {
          uni.navigateTo({
            url: "/pages/login/login"
          });
        } else
          ;
      });
      this.time2 = setInterval(() => {
        this.$device(function(result) {
          if (result == 2) {
            uni.showToast({
              icon: "error",
              title: "账号在异地登录",
              mask: true
            });
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/index/index"
              });
            }, 1e3);
          } else if (result == 4) {
            uni.navigateTo({
              url: "/pages/login/login"
            });
          } else
            ;
        });
      }, 36e5);
    },
    onHide() {
      clearInterval(this.time1);
      clearInterval(this.time2);
      this.time1 = null;
      this.time2 = null;
    },
    methods: {
      Count() {
        var that = this;
        uni.request({
          url: this.$BASE_URL + "/count",
          method: "GET",
          success: (res) => {
            const data = res.data;
            if (data.code = "200") {
              that.count = data.data;
              uni.setStorage({
                key: "count",
                data: data.data
              });
            } else {
              const count = uni.getStorageSync("count");
              if (count) {
                that.count = count.data;
              } else {
                uni.showToast({
                  title: data.msg,
                  icon: "error"
                });
              }
            }
          },
          fail: (error) => {
            const count = uni.getStorageSync("count");
            if (count) {
              that.count = count;
            } else {
              uni.showToast({
                title: "服务器或网络错误",
                icon: "none"
              });
            }
          }
        });
      },
      photostart() {
        if (this.isChecked) {
          this.image = false;
        }
      },
      photoend() {
        if (this.isChecked) {
          this.image = true;
        }
      },
      photo() {
        if (this.isChecked) {
          this.toB = false;
          this.camorpho = false;
          this.$refs.popup.open("bottom");
          this.getinfo();
        }
      },
      camera() {
        if (this.isChecked) {
          this.toB = false;
          this.camorpho = true;
          this.$refs.popup.open("bottom");
          this.getinfo();
        }
      },
      change(e) {
        if (e.show) {
          uni.hideTabBar();
        } else {
          setTimeout(() => {
            uni.showTabBar();
          }, 200);
        }
      },
      skipB() {
        if (this.toB) {
          this.cmodel = "B";
          this.mask = false;
        }
      },
      skipA() {
        this.cmodel = "A";
        this.mask = true;
        this.swc = false;
        this.form.sex = "男";
        this.form.username = "";
        this.form.birth = "出生年月";
        this.form.age = "";
        this.i2t = "i";
        this.error = false;
        this.errormessgae = "";
      },
      fc() {
        if (!this.sl) {
          this.sl = true;
          this.getinfo();
        }
      },
      getinfo() {
        const userData = uni.getStorageSync("user");
        if (userData) {
          var that = this;
          that.cload = "A";
          that.sl = true;
          uni.request({
            url: that.$BASE_URL + "/getinfo",
            header: { Authorization: "Bearer " + userData.access_token },
            method: "GET",
            success: (res) => {
              const data = res.data;
              if (res.statusCode == 401) {
                uni.request({
                  url: that.$BASE_URL + "/refresh",
                  header: { Authorization: "Bearer " + userData.refresh_token },
                  method: "GET",
                  success: (res2) => {
                    const data2 = res2.data;
                    if (res2.statusCode == 401) {
                      uni.showToast({
                        icon: "none",
                        title: "登录已过期"
                      });
                      that.$refs.popup.close();
                      uni.removeStorage({
                        key: "user"
                      });
                      uni.navigateTo({
                        url: "/pages/login/login"
                      });
                    } else if (data2.code == "200") {
                      uni.setStorageSync("user", data2.data);
                      uni.setStorage({
                        key: "user",
                        data: {
                          refresh_token: userData.refresh_token,
                          access_token: data2.data
                        }
                      });
                      setTimeout(() => {
                        that.getinfo();
                      }, 1e3);
                    }
                  },
                  fail: (err) => {
                    if (err.statusCode === 404) {
                      uni.showToast({
                        icon: "none",
                        title: "请求失败，找不到资源"
                      });
                    } else if (err.statusCode === 500) {
                      uni.showToast({
                        icon: "none",
                        title: "服务器内部错误，请稍后重试"
                      });
                    } else {
                      uni.showToast({
                        icon: "none",
                        title: "请求失败，请稍后重试"
                      });
                    }
                  }
                });
              } else if (data.code == "200") {
                that.infoman = data.data;
                setTimeout(() => {
                  if (that.infoman.length > 0) {
                    that.cload = "B";
                    that.toB = true;
                  } else {
                    that.sl = false;
                    uni.showToast({
                      icon: "none",
                      title: "请求失败，请稍后重试"
                    });
                  }
                }, 1e3);
              } else {
                uni.showToast({
                  icon: "error",
                  title: data.msg
                });
                that.sl = false;
                that.cload = "A";
              }
            },
            fail: (err) => {
              that.sl = false;
              that.cload = "A";
              if (err.statusCode === 404) {
                uni.showToast({
                  icon: "none",
                  title: "请求失败，找不到资源"
                });
              } else if (err.statusCode === 500) {
                uni.showToast({
                  icon: "none",
                  title: "服务器内部错误，请稍后重试"
                });
              } else {
                uni.showToast({
                  icon: "none",
                  title: "请求失败，请稍后重试"
                });
              }
            }
          });
        } else {
          uni.showToast({
            icon: "none",
            title: "未登录"
          });
          this.$refs.popup.close();
          uni.navigateTo({
            url: "/pages/login/login"
          });
        }
      },
      next(item, camorphoto, index2) {
        var that = this;
        if (camorphoto) {
          uni.chooseImage({
            count: 1,
            sourceType: ["camera"],
            success: (res) => {
              uni.saveImageToPhotosAlbum({
                filePath: res.tempFilePaths[0],
                success: (suc) => {
                  that.Image = suc.path;
                  that.skipA();
                  uni.showTabBar();
                  that.$refs.popup.close();
                  uni.navigateTo({
                    url: "/pages/detect/detect1?src=" + res.tempFilePaths[0] + "&form=" + JSON.stringify(item)
                  });
                },
                fail: (error) => {
                  uni.showToast({
                    title: "没有权限,保存失败",
                    icon: "error"
                  });
                }
              });
            },
            fail: (err) => {
              if (err.errMsg.includes("chooseImage:fail No Permission")) {
                uni.showToast({
                  title: "无权限,调用失败",
                  icon: "error"
                });
              }
            }
          });
        } else {
          uni.chooseImage({
            count: 1,
            sourceType: ["album"],
            success: (res) => {
              that.skipA();
              uni.showTabBar();
              that.$refs.popup.close();
              uni.navigateTo({
                url: "/pages/detect/detect1?src=" + res.tempFilePaths[0] + "&form=" + JSON.stringify(item)
              });
            },
            fail: (err) => {
              if (err.errMsg.includes("chooseImage:fail No Permission")) {
                uni.showToast({
                  title: "无权限,调用失败",
                  icon: "error"
                });
              }
            }
          });
        }
      },
      Binput(e) {
        const o = e;
        const inputRule = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
        this.$nextTick(function() {
          this.form.username = o.replace(inputRule, "");
          if (this.form.username) {
            this.i2t = "t";
          } else {
            this.i2t = "i";
          }
        });
      },
      Bfocus() {
        this.error = false;
        this.errormessgae = "";
      },
      switchchange: function(e) {
        if (e.detail.value) {
          this.swc = true;
          this.form.sex = "女";
        } else {
          this.swc = false;
          this.form.sex = "男";
        }
      },
      bindDateChange: function(e) {
        this.form.birth = e.detail.value;
        let parts = this.form.birth.split("-");
        let years = parseInt(parts[0]);
        this.form.age = this.year - years;
      },
      adduser() {
        if (this.form.username !== "" && this.form.age !== "") {
          const isExist = this.infoman.some((item) => item.username === this.form.username);
          if (isExist) {
            this.error = true;
            this.errormessgae = "该用户名已经存在，请使用其他用户名";
          } else {
            this.form1.age = this.form.age;
            this.form1.sex = this.form.sex;
            this.form1.username = this.form.username;
            this.Bttext = "创建中...";
            var that = this;
            const userData = uni.getStorageSync("user");
            if (userData) {
              uni.request({
                url: this.$BASE_URL + "/adduser",
                header: { Authorization: "Bearer " + userData.access_token },
                method: "POST",
                data: this.form,
                success: (res) => {
                  const data = res.data;
                  if (res.statusCode == 401) {
                    uni.request({
                      url: that.$BASE_URL + "/refresh",
                      header: { Authorization: "Bearer " + userData.refresh_token },
                      method: "GET",
                      success: (res2) => {
                        const data2 = res2.data;
                        if (res2.statusCode == 401) {
                          uni.showToast({
                            icon: "none",
                            title: "登录已过期"
                          });
                          that.skipA();
                          that.Bttext = "创建用户";
                          uni.removeStorage({
                            key: "user"
                          });
                          that.$refs.popup.close();
                          uni.navigateTo({
                            url: "/pages/login/login"
                          });
                        } else if (data2.code == "200") {
                          uni.setStorageSync("user", data2.data);
                          uni.setStorage({
                            key: "user",
                            data: {
                              refresh_token: userData.refresh_token,
                              access_token: data2.data
                            }
                          });
                          setTimeout(() => {
                            that.adduser();
                          }, 500);
                        }
                      },
                      fail: (err) => {
                        that.Bttext = "创建用户";
                        if (err.statusCode === 404) {
                          uni.showToast({
                            icon: "none",
                            title: "请求失败，找不到资源"
                          });
                        } else if (err.statusCode === 500) {
                          uni.showToast({
                            icon: "none",
                            title: "服务器内部错误，请稍后重试"
                          });
                        } else {
                          uni.showToast({
                            icon: "none",
                            title: "请求失败，请稍后重试"
                          });
                        }
                      }
                    });
                  } else if (data.code == "200") {
                    that.Bttext = "创建用户";
                    that.form1.info_id = data.data;
                    that.skipA();
                    uni.showTabBar();
                    that.$refs.popup.close();
                    if (that.camorpho) {
                      uni.chooseImage({
                        count: 1,
                        sourceType: ["camera"],
                        success: (res2) => {
                          uni.saveImageToPhotosAlbum({
                            filePath: res2.tempFilePaths[0],
                            success: (suc) => {
                              that.Image = suc.path;
                              uni.navigateTo({
                                url: "/pages/detect/detect1?src=" + res2.tempFilePaths[0] + "&form=" + JSON.stringify(that.form1)
                              });
                            },
                            fail: (error) => {
                              uni.showToast({
                                title: "没有权限,保存失败",
                                icon: "error"
                              });
                            }
                          });
                        },
                        fail: (err) => {
                          if (err.errMsg.includes("chooseImage:fail No Permission")) {
                            uni.showToast({
                              title: "无权限,调用失败",
                              icon: "error"
                            });
                          }
                        }
                      });
                    } else {
                      uni.chooseImage({
                        count: 1,
                        sourceType: ["album"],
                        success: (res2) => {
                          uni.navigateTo({
                            url: "/pages/detect/detect1?src=" + res2.tempFilePaths[0] + "&form=" + JSON.stringify(that.form1)
                          });
                        },
                        fail: (err) => {
                          if (err.errMsg.includes("chooseImage:fail No Permission")) {
                            uni.showToast({
                              title: "无权限,调用失败",
                              icon: "error"
                            });
                          }
                        }
                      });
                    }
                  } else {
                    uni.showToast({
                      icon: "error",
                      title: data.msg
                    });
                    that.Bttext = "创建用户";
                  }
                },
                fail: (err) => {
                  that.Bttext = "创建用户";
                  if (err.statusCode === 404) {
                    uni.showToast({
                      icon: "none",
                      title: "请求失败，找不到资源"
                    });
                  } else if (err.statusCode === 500) {
                    uni.showToast({
                      icon: "none",
                      title: "服务器内部错误，请稍后重试"
                    });
                  } else {
                    uni.showToast({
                      icon: "none",
                      title: "请求失败，请稍后重试"
                    });
                  }
                }
              });
            }
          }
        }
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_2);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_4);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_5);
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("view", { class: "bigtext" }, [
        vue.createElementVNode("text", {
          space: "ensp",
          id: "bigtext"
        }, "SkinCloud "),
        vue.createTextVNode("皮肤云 ")
      ]),
      vue.createElementVNode("view", { id: "indexname" }, " 肤 测 汇 "),
      vue.createElementVNode("text", {
        space: "ensp",
        id: "smalltext"
      }, "智 能 皮 肤 测 评 ，中 西 病 症 汇 集"),
      vue.createElementVNode("view", { class: "img" }, [
        vue.createElementVNode("image", {
          mode: "aspectFill",
          class: "logo",
          src: "/static/Logos.png"
        })
      ]),
      vue.createElementVNode("view", { class: "text-area" }, [
        vue.createElementVNode("text", { class: "count2" }, "*SkinCloud"),
        vue.createElementVNode("text", { class: "count1" }, "已提供了"),
        vue.createElementVNode(
          "text",
          { class: "count2" },
          vue.toDisplayString($data.count),
          1
          /* TEXT */
        ),
        vue.createElementVNode("text", { class: "count1" }, "人次AI测肤服务")
      ]),
      vue.createElementVNode("view", { class: "bt" }, [
        vue.createElementVNode("view", { class: "camera" }, [
          vue.createElementVNode(
            "button",
            {
              class: vue.normalizeClass($data.isChecked ? "camera-bt" : "nocamera-bt"),
              "hover-class": "camera-bt-click",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.camera && $options.camera(...args))
            },
            "拍照测评 ",
            2
            /* CLASS */
          )
        ]),
        vue.createElementVNode("view", { class: "photo" }, [
          vue.createVNode(_component_uni_icons, {
            type: $data.image ? "images" : "images-filled",
            class: "photo-bt",
            size: "36",
            color: $data.isChecked ? "#8366c8" : "#CCC",
            onTouchstart: $options.photostart,
            onTouchend: $options.photoend,
            onClick: $options.photo
          }, null, 8, ["type", "color", "onTouchstart", "onTouchend", "onClick"])
        ])
      ]),
      vue.createElementVNode("view", { class: "radius" }, [
        vue.createElementVNode("checkbox", {
          style: { "transform": "scale(0.8)" },
          checked: $data.isChecked,
          onClick: _cache[1] || (_cache[1] = ($event) => $data.isChecked = !$data.isChecked),
          color: "#ffffff",
          "border-color": "#8366c8",
          activeBorderColor: "#8366c8",
          activeBackgroundColor: "#8366c8"
        }, null, 8, ["checked"]),
        vue.createElementVNode("navigator", {
          url: "/pages/agreement/agreement",
          class: "navigator"
        }, "SkinCloud服务协议")
      ]),
      vue.createVNode(_component_uni_popup, {
        ref: "popup",
        onChange: $options.change,
        "is-mask-click": $data.mask ? true : false
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "info" }, [
            $data.cmodel === "A" ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
              vue.createElementVNode("view", { class: "infobar" }, [
                vue.createElementVNode("text", { style: { "font-size": "40rpx", "color": "#755cb5" } }, "请选择用户"),
                vue.createElementVNode("view", { class: "personadd" }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "personadd-filled",
                    size: "36",
                    color: $data.toB ? "#8366c8" : "#CCC",
                    onClick: $options.skipB
                  }, null, 8, ["color", "onClick"])
                ])
              ]),
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass($data.cload == "A" ? "infomanA" : "infomanB")
                },
                [
                  $data.cload == "A" ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "limg"
                  }, [
                    vue.createElementVNode("image", {
                      src: $data.sl ? "../../static/loading.gif" : "../../static/fail.png",
                      mode: "heightFix",
                      onClick: _cache[2] || (_cache[2] = (...args) => $options.fc && $options.fc(...args))
                    }, null, 8, ["src"])
                  ])) : $data.cload == "B" ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList($data.infoman, (item, index2) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "itemall",
                          onClick: ($event) => $options.next(item, $data.camorpho, index2)
                        }, [
                          vue.createElementVNode("view", { class: "itemu" }, [
                            vue.createElementVNode(
                              "view",
                              null,
                              vue.toDisplayString(item.username.substring(0, 1)),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.createElementVNode("view", { class: "itemui" }, [
                            vue.createElementVNode(
                              "view",
                              { class: "itemn" },
                              vue.toDisplayString(item.username),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode("view", { class: "as" }, [
                              vue.createElementVNode(
                                "view",
                                { class: "half-width" },
                                vue.toDisplayString(item.age),
                                1
                                /* TEXT */
                              ),
                              vue.createElementVNode("view", { class: "separator" }, "|"),
                              vue.createElementVNode(
                                "view",
                                { class: "half-width" },
                                vue.toDisplayString(item.sex),
                                1
                                /* TEXT */
                              )
                            ])
                          ])
                        ], 8, ["onClick"]);
                      }),
                      256
                      /* UNKEYED_FRAGMENT */
                    ))
                  ])) : vue.createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              )
            ])) : $data.cmodel === "B" ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
              vue.createElementVNode("view", { class: "infobara" }, [
                vue.createElementVNode("view", { class: "personback" }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "arrow-left",
                    size: "36",
                    color: "#8366c8",
                    onClick: $options.skipA
                  }, null, 8, ["onClick"]),
                  vue.createElementVNode("text", {
                    onClick: _cache[3] || (_cache[3] = (...args) => $options.skipA && $options.skipA(...args))
                  }, "返回")
                ]),
                $data.i2t === "i" ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "Bicon"
                }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "person-filled",
                    size: "60",
                    color: "#cccccc"
                  })
                ])) : $data.i2t === "t" ? (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 1,
                    class: "Bicon"
                  },
                  vue.toDisplayString($data.form.username.substring(0, 1)),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "center", "width": "40%", "position": "absolute", "margin-top": "70rpx" } }, [
                  vue.createElementVNode("text", { style: { "font-size": "32rpx", "color": "#755cb5" } }, "添加新用户")
                ])
              ]),
              vue.createElementVNode("view", { class: "infoback" }, [
                vue.createElementVNode("view", { style: { "padding-top": "2%" } }, [
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: $data.form.username,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.form.username = $event),
                    "error-message": $data.error ? "errorMessage" : "",
                    placeholder: "用户名称",
                    "placeholder-style": "font-size:30rpx",
                    clearable: true,
                    primaryColor: "#8366c8",
                    onInput: $options.Binput,
                    onFocus: $options.Bfocus
                  }, null, 8, ["modelValue", "error-message", "onInput", "onFocus"]),
                  vue.createElementVNode(
                    "text",
                    { style: { "padding-left": "3%", "font-size": "28rpx", "color": "#ff0000" } },
                    vue.toDisplayString($data.errormessgae),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass($data.swc ? "sexg" : "sexb")
                  },
                  [
                    vue.createElementVNode(
                      "text",
                      {
                        style: vue.normalizeStyle($data.swc ? "padding-left: 3%; color: #ffacd2; font-size: 30rpx;" : "padding-left: 3%; color: #66CCFF; font-size: 30rpx;")
                      },
                      "性别",
                      4
                      /* STYLE */
                    ),
                    vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "flex-end", "align-items": "center", "margin-left": "auto", "padding-right": "3%" } }, [
                      vue.createElementVNode(
                        "text",
                        {
                          class: vue.normalizeClass($data.swc ? "textsex" : "textsexb")
                        },
                        "男",
                        2
                        /* CLASS */
                      ),
                      vue.createElementVNode("view", { style: { "height": "100%", "display": "flex", "justify-content": "center", "align-items": "center", "padding": "0 2%" } }, [
                        vue.createElementVNode(
                          "switch",
                          {
                            color: "#ffacd2",
                            style: { "transform": "scale(0.7)", "align-items": "center", "dispaly": "flex" },
                            onChange: _cache[5] || (_cache[5] = (...args) => $options.switchchange && $options.switchchange(...args))
                          },
                          null,
                          32
                          /* HYDRATE_EVENTS */
                        )
                      ]),
                      vue.createElementVNode(
                        "text",
                        {
                          class: vue.normalizeClass($data.swc ? "textsexg" : "textsex")
                        },
                        "女",
                        2
                        /* CLASS */
                      )
                    ])
                  ],
                  2
                  /* CLASS */
                ),
                vue.createElementVNode("view", { style: { "height": "6vh", "margin-bottom": "7%", "display": "flex", "align-items": "center", "border-radius": "40rpx", "border": "2rpx solid #ccc" } }, [
                  vue.createElementVNode("picker", {
                    mode: "date",
                    value: $data.form.birth,
                    start: "1900-01",
                    end: $data.currenttime,
                    fields: "month",
                    onChange: _cache[6] || (_cache[6] = (...args) => $options.bindDateChange && $options.bindDateChange(...args)),
                    style: { "width": "100%", "height": "100%", "display": "flex", "align-items": "center", "padding-left": "3%" }
                  }, [
                    vue.createElementVNode(
                      "text",
                      {
                        style: vue.normalizeStyle($data.form.age === "" ? "font-size:30rpx; color: #a2a2a2; width: 100%; white-space: nowrap;" : "font-size:30rpx; color: #000000; width: 100%; white-space: nowrap;")
                      },
                      vue.toDisplayString($data.form.birth),
                      5
                      /* TEXT, STYLE */
                    )
                  ], 40, ["value", "end"])
                ]),
                vue.createElementVNode("view", { style: { "height": "6vh", "display": "flex", "align-items": "center", "border-radius": "40rpx" } }, [
                  vue.createElementVNode(
                    "button",
                    {
                      class: vue.normalizeClass($data.form.username === "" || $data.form.age === "" ? "noB-bt" : "B-bt"),
                      onClick: _cache[7] || (_cache[7] = (...args) => $options.adduser && $options.adduser(...args))
                    },
                    vue.toDisplayString($data.Bttext),
                    3
                    /* TEXT, CLASS */
                  )
                ])
              ])
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["onChange", "is-mask-click"])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__file", "F:/SkinApp/App01/pages/index/index.vue"]]);
  const _sfc_main$f = {
    data() {
      return {
        form: {
          user: "",
          password: "",
          deviceid: ""
        },
        showPasswordIcon: false,
        showClearIcon: false,
        showeyeIcon: false,
        persontext: true,
        showpersonIcon: false,
        eyetext: true,
        ty: true,
        showeye: true,
        errori: false,
        errorj: false,
        isChecked: true
      };
    },
    // mounted() {
    //
    // },
    methods: {
      personFocus() {
        this.persontext = false;
        this.errori = false;
      },
      personInput(e) {
        if (e == "") {
          this.showpersonIcon = false;
        } else {
          this.showpersonIcon = true;
        }
        const o = e;
        const inputRule = /[\W_]/g;
        this.$nextTick(function() {
          this.form.user = o.replace(inputRule, "");
          if (this.form.user == "") {
            this.showpersonIcon = false;
          }
        });
      },
      personBlur() {
        if (this.form.user == "") {
          this.showpersonIcon = false;
        }
        this.persontext = true;
      },
      personbt(type) {
        if (type === "suffix") {
          this.form.user = "";
          this.showpersonIcon = false;
        } else {
          uni.showToast({
            icon: "none",
            title: "账号至少为6位,英文数字均可"
          });
        }
      },
      eyeFocus() {
        this.eyetext = false;
        this.errorj = false;
      },
      eyeInput(e) {
        if (e == "") {
          this.showeyeIcon = false;
        }
        this.showeyeIcon = true;
        const o = e;
        const inputRule = /[\u4E00-\u9FA5\s]/g;
        this.$nextTick(function() {
          this.form.password = o.replace(inputRule, "");
          if (this.form.password == "") {
            this.showeyeIcon = false;
          }
        });
      },
      eyeBlur() {
        if (this.form.password == "") {
          this.showeyeIcon = false;
        }
        this.eyetext = true;
      },
      eyebt(type) {
        if (type === "prefix") {
          this.ty = !this.ty;
          this.showeye = !this.showeye;
        } else {
          this.form.password = "";
          this.showeyeIcon = false;
        }
      },
      eyeshow() {
        return this.showeye ? "eye-slash" : "eye";
      },
      login() {
        if (this.form.user == "" && this.form.password == "") {
          this.errori = true;
          this.errorj = true;
          uni.showToast({
            icon: "error",
            title: "输入不能为空"
          });
          return;
        } else if (this.form.user == "") {
          this.errori = true;
          uni.showToast({
            icon: "error",
            title: "账号不能为空"
          });
          return;
        } else if (this.form.password == "") {
          this.errorj = true;
          uni.showToast({
            icon: "error",
            title: "密码不能为空"
          });
          return;
        } else if (this.form.user.length < 6) {
          this.errori = true;
          uni.showToast({
            title: "账号至少为6位",
            icon: "error"
          });
          return;
        } else {
          this.$refs.popup.open("bottom");
          return;
        }
      },
      change(e) {
        if (!e.show) {
          if (this.isChecked == true) {
            this.loginfinish();
          }
        }
      },
      loginfinish() {
        uni.showLoading({
          title: "登录中",
          mask: true
        });
        this.form.deviceid = uni.getDeviceInfo().deviceId;
        var that = this;
        uni.request({
          url: that.$BASE_URL + "/login",
          method: "POST",
          data: this.form,
          success: (res) => {
            uni.hideLoading();
            const data = res.data;
            if (data.code == "401") {
              that.errori = true;
              that.errorj = true;
              uni.showToast({
                icon: "none",
                title: data.msg
              });
            } else if (data.code == "200") {
              uni.showToast({
                title: "登录成功"
              });
              uni.setStorage({
                key: "user",
                data: data.data
              });
              uni.reLaunch({
                url: "/pages/index/index"
              });
            } else {
              uni.showToast({
                icon: "none",
                title: data.msg
              });
            }
          },
          fail: (err) => {
            uni.hideLoading();
            if (err.statusCode === 404) {
              uni.showToast({
                icon: "none",
                title: "请求失败，找不到资源"
              });
            } else if (err.statusCode === 500) {
              uni.showToast({
                icon: "none",
                title: "服务器内部错误，请稍后重试"
              });
            } else {
              uni.showToast({
                icon: "none",
                title: "请求失败，请稍后重试"
              });
            }
          }
        });
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_4);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_5);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "login-wrap" }, [
        vue.createCommentVNode(" 200rpx == 100px "),
        vue.createElementVNode("view", { id: "logname" }, " 登录 "),
        vue.createElementVNode("view", { class: "login" }, [
          vue.createVNode(_component_uni_easyinput, {
            id: "logini",
            type: "text",
            modelValue: $data.form.user,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.form.user = $event),
            "error-message": $data.errori ? "errorMessage" : "",
            prefixIcon: $data.showpersonIcon ? "person" : " ",
            suffixIcon: $data.showpersonIcon ? "clear" : " ",
            clearable: $data.showClearIcon,
            placeholder: $data.persontext ? "请输入登录账号" : "",
            onFocus: $options.personFocus,
            onBlur: $options.personBlur,
            onIconClick: $options.personbt,
            onInput: $options.personInput
          }, null, 8, ["modelValue", "error-message", "prefixIcon", "suffixIcon", "clearable", "placeholder", "onFocus", "onBlur", "onIconClick", "onInput"])
        ]),
        vue.createElementVNode("view", { class: "login" }, [
          vue.createVNode(_component_uni_easyinput, {
            id: "loginj",
            type: $data.ty ? "password" : "text",
            "error-message": $data.errorj ? "errorMessage" : "",
            passwordIcon: $data.showPasswordIcon,
            clearable: $data.showClearIcon,
            modelValue: $data.form.password,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.form.password = $event),
            prefixIcon: $data.showeyeIcon ? $options.eyeshow() : " ",
            suffixIcon: $data.showeyeIcon ? "clear" : " ",
            placeholder: $data.eyetext ? "请输入登录密码" : "",
            onFocus: $options.eyeFocus,
            onBlur: $options.eyeBlur,
            onIconClick: $options.eyebt,
            onInput: $options.eyeInput
          }, null, 8, ["type", "error-message", "passwordIcon", "clearable", "modelValue", "prefixIcon", "suffixIcon", "placeholder", "onFocus", "onBlur", "onIconClick", "onInput"])
        ]),
        vue.createElementVNode("view", { class: "login" }, [
          vue.createElementVNode("button", {
            type: "primary",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.login && $options.login(...args)),
            style: { "background-color": "#9370DB", "border-radius": "20px", "font-size": "35rpx", "word-spacing": "20rpx" }
          }, "登 录")
        ]),
        vue.createElementVNode("view", { class: "sz" }, [
          vue.createElementVNode("navigator", {
            id: "toreg",
            url: "/pages/register/register"
          }, "前往注册"),
          vue.createElementVNode("navigator", {
            id: "tofor",
            url: "/pages/forget/forget?value=" + $data.form.user
          }, "忘记密码?", 8, ["url"])
        ]),
        vue.createCommentVNode(' 	<label class="checkbox d-flex a-center" >\r\n							<checkbox :checked="check" />\r\n							<text class="text-light-muted font">已阅读并同意XXXXX协议</text>\r\n			</label> '),
        vue.createElementVNode("view", { class: "login" }, [
          vue.createVNode(_component_uni_popup, {
            ref: "popup",
            style: { "height": "100rpx" },
            onChange: $options.change
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "radius" }, [
                vue.createCommentVNode(' <input type="checkbox" />	 '),
                vue.createElementVNode("checkbox", {
                  checked: $data.isChecked,
                  onClick: _cache[3] || (_cache[3] = ($event) => $data.isChecked = !$data.isChecked),
                  color: "#ffffff",
                  "border-color": "#8366c8",
                  activeBorderColor: "#8366c8",
                  activeBackgroundColor: "#8366c8"
                }, null, 8, ["checked"]),
                vue.createElementVNode("text", { style: { "color": "#999999" } }, "我同意"),
                vue.createElementVNode("navigator", {
                  url: "/pages/agreement/agreement",
                  class: "navigator"
                }, "SkinCloud服务协议")
              ])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["onChange"])
        ])
      ])
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__file", "F:/SkinApp/App01/pages/login/login.vue"]]);
  const _sfc_main$e = {
    data() {
      return {
        form: {
          user: "",
          password: "",
          confirm: ""
        },
        showPasswordIcon: false,
        showClearIcon: false,
        showeyeIcon: false,
        showeyeIconi: false,
        persontext: true,
        showpersonIcon: false,
        eyetext: true,
        eyetexti: true,
        ty: true,
        tyi: true,
        showeye: true,
        showeyei: true,
        errori: false,
        errorj: false,
        errork: false
      };
    },
    methods: {
      personFocus() {
        this.persontext = false;
        this.errori = false;
      },
      personInput(e) {
        if (e == "") {
          this.showpersonIcon = false;
        }
        this.showpersonIcon = true;
        const o = e;
        const inputRule = /[\W_]/g;
        this.$nextTick(function() {
          this.form.user = o.replace(inputRule, "");
        });
      },
      personbt(type) {
        if (type === "suffix") {
          this.form.user = "";
          this.showpersonIcon = false;
        } else {
          uni.showToast({
            icon: "none",
            title: "账号至少为6位,中英文均可"
          });
        }
      },
      personBlur() {
        if (this.form.user == "") {
          this.showpersonIcon = false;
        }
        this.persontext = true;
        return;
      },
      eyeFocus() {
        this.eyetext = false;
        this.errorj = false;
      },
      eyeFocusi() {
        this.eyetexti = false;
        this.errork = false;
      },
      eyeInput(e) {
        if (e == "") {
          this.showeyeIcon = false;
        }
        this.showeyeIcon = true;
        const o = e;
        const inputRule = /[\u4E00-\u9FA5\s]/g;
        this.$nextTick(function() {
          this.form.password = o.replace(inputRule, "");
          if (this.form.password == "") {
            this.showeyeIcon = false;
          }
        });
      },
      eyeInputi(e) {
        if (e == "") {
          this.showeyeIconi = false;
        }
        this.showeyeIconi = true;
        const o = e;
        const inputRule = /[\u4E00-\u9FA5\s]/g;
        this.$nextTick(function() {
          this.form.confirm = o.replace(inputRule, "");
          if (this.form.confirm == "") {
            this.showeyeIconi = false;
          }
        });
      },
      eyeBlur() {
        if (this.form.password == "") {
          this.showeyeIcon = false;
        }
        this.eyetext = true;
      },
      eyeBluri() {
        if (this.form.confirm == "") {
          this.showeyeIconi = false;
        }
        this.eyetexti = true;
      },
      eyebt(type) {
        if (type === "prefix") {
          this.ty = !this.ty;
          this.showeye = !this.showeye;
        } else {
          this.form.password = "";
          this.showeyeIcon = false;
        }
      },
      eyebti(type) {
        if (type === "prefix") {
          this.tyi = !this.tyi;
          this.showeyei = !this.showeyei;
        } else {
          this.form.confirm = "";
          this.showeyeIconi = false;
        }
      },
      eyeshow() {
        return this.showeye ? "eye-slash" : "eye";
      },
      eyeshowi() {
        return this.showeyei ? "eye-slash" : "eye";
      },
      register() {
        if (this.form.user === "" && this.form.password === "" && this.form.confirm === "") {
          this.errori = true;
          this.errorj = true;
          this.errork = true;
          uni.showToast({
            icon: "error",
            title: "输入不能为空"
          });
          return;
        } else if (this.form.user == "" && this.form.password != "" && this.form.confirm != "") {
          this.errori = true;
          uni.showToast({
            icon: "error",
            title: "账号不能为空"
          });
          return;
        } else if (this.form.user == "" && this.form.password == "" && this.form.confirm != "") {
          this.errori = true;
          this.errorj = true;
          uni.showToast({
            icon: "error",
            title: "输入不能为空"
          });
          return;
        } else if (this.form.user == "" && this.form.password != "" && this.form.confirm == "") {
          this.errori = true;
          this.errork = true;
          uni.showToast({
            icon: "error",
            title: "输入不能为空"
          });
          return;
        } else if (this.form.user != "" && this.form.password == "" && this.form.confirm == "") {
          this.errorj = true;
          this.errork = true;
          uni.showToast({
            icon: "error",
            title: "密码不能为空"
          });
          return;
        } else if (this.form.user != "" && this.form.password == "" && this.form.confirm != "") {
          this.errorj = true;
          uni.showToast({
            icon: "error",
            title: "密码不能为空"
          });
          return;
        } else if (this.form.user != "" && this.form.password != "" && this.form.confirm == "") {
          this.errork = true;
          uni.showToast({
            icon: "error",
            title: "密码不能为空"
          });
          return;
        } else if (this.form.user.length < 6) {
          this.errori = true;
          uni.showToast({
            title: "账号至少为6位",
            icon: "error"
          });
          return;
        } else if (this.form.password != this.form.confirm) {
          this.errorj = true;
          this.errork = true;
          uni.showToast({
            icon: "error",
            title: "密码输入不一致"
          });
          return;
        } else {
          var that = this;
          uni.showLoading({
            title: "注册中",
            mask: true
          });
          uni.request({
            url: that.$BASE_URL + "/register",
            method: "POST",
            data: this.form,
            success: (res) => {
              uni.hideLoading();
              const data = res.data;
              if (data.code == "401") {
                that.errori = true;
                uni.showToast({
                  icon: "error",
                  title: data.msg
                });
              } else if (data.code == "200") {
                uni.showToast({
                  icon: "success",
                  title: "注册成功"
                });
                uni.reLaunch({
                  url: "/pages/login/login"
                });
              } else {
                uni.showToast({
                  icon: "error",
                  title: data.msg
                });
              }
            },
            fail: (err) => {
              uni.hideLoading();
              if (err.statusCode === 404) {
                uni.showToast({
                  icon: "none",
                  title: "请求失败，找不到资源"
                });
              } else if (err.statusCode === 500) {
                uni.showToast({
                  icon: "none",
                  title: "服务器错误，请稍后重试"
                });
              } else {
                uni.showToast({
                  icon: "none",
                  title: "请求失败，请稍后重试"
                });
              }
            }
          });
        }
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "register-wrap" }, [
        vue.createCommentVNode(" 200rpx == 100px "),
        vue.createElementVNode("view", { id: "regname" }, " 注册 "),
        vue.createElementVNode("view", { class: "regin" }, [
          vue.createVNode(_component_uni_easyinput, {
            id: "regini",
            type: "text",
            modelValue: $data.form.user,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.form.user = $event),
            "error-message": $data.errori ? "errorMessage" : "",
            prefixIcon: $data.showpersonIcon ? "person" : " ",
            suffixIcon: $data.showpersonIcon ? "clear" : " ",
            clearable: $data.showClearIcon,
            placeholder: $data.persontext ? "请设置登录账号" : "",
            onFocus: $options.personFocus,
            onBlur: $options.personBlur,
            onIconClick: $options.personbt,
            onInput: $options.personInput
          }, null, 8, ["modelValue", "error-message", "prefixIcon", "suffixIcon", "clearable", "placeholder", "onFocus", "onBlur", "onIconClick", "onInput"])
        ]),
        vue.createElementVNode("view", { class: "regin" }, [
          vue.createVNode(_component_uni_easyinput, {
            id: "reginj",
            type: $data.ty ? "password" : "text",
            "error-message": $data.errorj ? "errorMessage" : "",
            passwordIcon: $data.showPasswordIcon,
            clearable: $data.showClearIcon,
            modelValue: $data.form.password,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.form.password = $event),
            prefixIcon: $data.showeyeIcon ? $options.eyeshow() : " ",
            suffixIcon: $data.showeyeIcon ? "clear" : " ",
            placeholder: $data.eyetext ? "请设置登录密码" : "",
            onFocus: $options.eyeFocus,
            onBlur: $options.eyeBlur,
            onIconClick: $options.eyebt,
            onInput: $options.eyeInput
          }, null, 8, ["type", "error-message", "passwordIcon", "clearable", "modelValue", "prefixIcon", "suffixIcon", "placeholder", "onFocus", "onBlur", "onIconClick", "onInput"])
        ]),
        vue.createElementVNode("view", { class: "regin" }, [
          vue.createVNode(_component_uni_easyinput, {
            id: "regink",
            type: $data.tyi ? "password" : "text",
            "error-message": $data.errork ? "errorMessage" : "",
            passwordIcon: $data.showPasswordIcon,
            clearable: $data.showClearIcon,
            modelValue: $data.form.confirm,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.form.confirm = $event),
            prefixIcon: $data.showeyeIconi ? $options.eyeshowi() : " ",
            suffixIcon: $data.showeyeIconi ? "clear" : " ",
            placeholder: $data.eyetexti ? "请确认登录密码" : "",
            onFocus: $options.eyeFocusi,
            onBlur: $options.eyeBluri,
            onIconClick: $options.eyebti,
            onInput: $options.eyeInputi
          }, null, 8, ["type", "error-message", "passwordIcon", "clearable", "modelValue", "prefixIcon", "suffixIcon", "placeholder", "onFocus", "onBlur", "onIconClick", "onInput"])
        ]),
        vue.createElementVNode("view", { class: "regin" }, [
          vue.createElementVNode("button", {
            type: "primary",
            onClick: _cache[3] || (_cache[3] = (...args) => $options.register && $options.register(...args)),
            style: { "background-color": "#99CCCC", "border-radius": "20px", "font-size": "35rpx", "word-spacing": "20rpx" }
          }, "注 册 ")
        ]),
        vue.createCommentVNode(' 	<label class="checkbox d-flex a-center" >\r\n							<checkbox :checked="check" />\r\n							<text class="text-light-muted font">已阅读并同意XXXXX协议</text>\r\n			</label> ')
      ])
    ]);
  }
  const PagesRegisterRegister = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__file", "F:/SkinApp/App01/pages/register/register.vue"]]);
  const _sfc_main$d = {
    data() {
      return {
        form: {
          user: ""
        },
        showClearIcon: false,
        persontext: true,
        showpersonIcon: false,
        error: false
      };
    },
    onLoad(e) {
      if (e.value) {
        this.form.user = e.value;
      }
      if (!this.form.user) {
        this.showpersonIcon = false;
      } else {
        this.showpersonIcon = true;
      }
    },
    methods: {
      personFocus() {
        this.persontext = false;
        this.error = false;
      },
      personInput(e) {
        if (e == "") {
          this.showpersonIcon = false;
        } else {
          this.showpersonIcon = true;
        }
        const o = e;
        const inputRule = /[\W_]/g;
        this.$nextTick(function() {
          this.form.user = o.replace(inputRule, "");
          if (this.form.user == "") {
            this.showpersonIcon = false;
          }
        });
      },
      personbt(type) {
        if (type === "suffix") {
          this.form.user = "";
          this.showpersonIcon = false;
        } else {
          uni.showToast({
            icon: "none",
            title: "账号至少为6位,英文数字均可"
          });
        }
      },
      personBlur() {
        if (this.form.user == "") {
          this.showpersonIcon = false;
        }
        this.persontext = true;
        return;
      },
      forget() {
        if (!this.form.user) {
          this.error = true;
          uni.showToast({
            icon: "error",
            title: "账号不能为空"
          });
          return;
        } else if (this.form.user.length < 6) {
          this.error = true;
          uni.showToast({
            title: "账号至少为6位",
            icon: "error"
          });
          return;
        }
        uni.showLoading({
          title: "上传中",
          mask: true
        });
        var that = this;
        uni.request({
          url: that.$BASE_URL + "/forget",
          method: "POST",
          data: this.form,
          success: (res) => {
            uni.hideLoading();
            const data = res.data;
            if (data.code !== "200") {
              uni.showToast({
                icon: "error",
                title: data.msg
              });
            } else {
              uni.navigateTo({
                url: "/pages/forget/forget2?data1=" + that.form.user
              });
            }
          },
          fail: (err) => {
            uni.hideLoading();
            if (err.statusCode === 404) {
              uni.showToast({
                icon: "none",
                title: "请求失败，找不到资源"
              });
            } else if (err.statusCode === 500) {
              uni.showToast({
                icon: "none",
                title: "服务器错误，请稍后重试"
              });
            } else {
              uni.showToast({
                icon: "none",
                title: "请求失败，请稍后重试"
              });
            }
          }
        });
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "forget-wrap" }, [
        vue.createCommentVNode(" 200rpx == 100px "),
        vue.createElementVNode("view", { id: "forgetname" }, " 忘记密码 "),
        vue.createElementVNode("view", { class: "forgetin" }, [
          vue.createVNode(_component_uni_easyinput, {
            id: "forgetini",
            type: "text",
            modelValue: $data.form.user,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.form.user = $event),
            "error-message": $data.error ? "errorMessage" : "",
            prefixIcon: $data.showpersonIcon ? "person" : " ",
            suffixIcon: $data.showpersonIcon ? "clear" : " ",
            clearable: $data.showClearIcon,
            placeholder: $data.persontext ? "请输入登录账号" : "",
            onFocus: $options.personFocus,
            onBlur: $options.personBlur,
            onIconClick: $options.personbt,
            onInput: $options.personInput
          }, null, 8, ["modelValue", "error-message", "prefixIcon", "suffixIcon", "clearable", "placeholder", "onFocus", "onBlur", "onIconClick", "onInput"])
        ]),
        vue.createElementVNode("view", { class: "forgetin" }, [
          vue.createElementVNode("button", {
            type: "primary",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.forget && $options.forget(...args)),
            style: { "background-color": "#99CC99", "border-radius": "20px", "font-size": "35rpx", "word-spacing": "20rpx" }
          }, "下一步 ")
        ]),
        vue.createCommentVNode(' 	<label class="checkbox d-flex a-center" >\r\n							<checkbox :checked="check" />\r\n							<text class="text-light-muted font">已阅读并同意XXXXX协议</text>\r\n			</label> ')
      ])
    ]);
  }
  const PagesForgetForget = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__file", "F:/SkinApp/App01/pages/forget/forget.vue"]]);
  const _sfc_main$c = {
    data() {
      return {
        form: {
          user: "",
          username: "",
          password: "",
          confirm: ""
        },
        showPasswordIcon: false,
        showClearIcon: false,
        showeyeIcon: false,
        showeyeIconi: false,
        persontext: true,
        showpersonIcon: false,
        eyetext: true,
        eyetexti: true,
        ty: true,
        tyi: true,
        showeye: true,
        showeyei: true,
        errori: false,
        errorj: false,
        errork: false
      };
    },
    onLoad(e) {
      this.form.user = e.data1;
    },
    methods: {
      personFocus() {
        this.persontext = false;
        this.errori = false;
      },
      personInput(e) {
        if (e == "") {
          this.showpersonIcon = false;
        } else {
          this.showpersonIcon = true;
        }
        const o = e;
        const inputRule = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
        this.$nextTick(function() {
          this.form.username = o.replace(inputRule, "");
          if (this.form.username == "") {
            this.showpersonIcon = false;
          }
        });
      },
      personbt(type) {
        if (type === "suffix") {
          uni.showToast({
            icon: "none",
            title: "账号已锁定,若想更改请返回重新输入"
          });
        } else {
          uni.showToast({
            icon: "none",
            title: "此为登录账号"
          });
        }
      },
      personbti(type) {
        if (type === "suffix") {
          this.form.username = "";
          this.showpersonIcon = false;
        } else {
          uni.showToast({
            icon: "none",
            title: "请输入账号注册时的首默认用户名,仅限中英文数字"
          });
        }
      },
      personBlur() {
        if (this.form.username == "") {
          this.showpersonIcon = false;
        }
        this.persontext = true;
        return;
      },
      eyeFocus() {
        this.eyetext = false;
        this.errorj = false;
      },
      eyeFocusi() {
        this.eyetexti = false;
        this.errork = false;
      },
      eyeInput(e) {
        if (e == "") {
          this.showeyeIcon = false;
        }
        this.showeyeIcon = true;
        const o = e;
        const inputRule = /[\u4E00-\u9FA5\s]/g;
        this.$nextTick(function() {
          this.form.password = o.replace(inputRule, "");
          if (this.form.password == "") {
            this.showeyeIcon = false;
          }
        });
      },
      eyeInputi(e) {
        if (e == "") {
          this.showeyeIconi = false;
        }
        this.showeyeIconi = true;
        const o = e;
        const inputRule = /[\u4E00-\u9FA5\s]/g;
        this.$nextTick(function() {
          this.form.confirm = o.replace(inputRule, "");
          if (this.form.confirm == "") {
            this.showeyeIconi = false;
          }
        });
      },
      eyeBlur() {
        if (this.form.password == "") {
          this.showeyeIcon = false;
        }
        this.eyetext = true;
      },
      eyeBluri() {
        if (this.form.confirm == "") {
          this.showeyeIconi = false;
        }
        this.eyetexti = true;
      },
      eyebt(type) {
        if (type === "prefix") {
          this.ty = !this.ty;
          this.showeye = !this.showeye;
        } else {
          this.form.password = "";
          this.showeyeIcon = false;
        }
      },
      eyebti(type) {
        if (type === "prefix") {
          this.tyi = !this.tyi;
          this.showeyei = !this.showeyei;
        } else {
          this.form.confirm = "";
          this.showeyeIconi = false;
        }
      },
      eyeshow() {
        return this.showeye ? "eye-slash" : "eye";
      },
      eyeshowi() {
        return this.showeyei ? "eye-slash" : "eye";
      },
      forget1() {
        var that = this;
        if (this.form.username === "" && this.form.password === "" && this.form.confirm === "") {
          this.errori = true;
          this.errorj = true;
          this.errork = true;
          uni.showToast({
            icon: "error",
            title: "输入不能为空"
          });
          return;
        } else if (this.form.username == "" && this.form.password != "" && this.form.confirm != "") {
          this.errori = true;
          uni.showToast({
            icon: "error",
            title: "用户名不能为空"
          });
          return;
        } else if (this.form.username == "" && this.form.password == "" && this.form.confirm != "") {
          this.errori = true;
          this.errorj = true;
          uni.showToast({
            icon: "error",
            title: "输入不能为空"
          });
          return;
        } else if (this.form.username == "" && this.form.password != "" && this.form.confirm == "") {
          this.errori = true;
          this.errork = true;
          uni.showToast({
            icon: "error",
            title: "输入不能为空"
          });
          return;
        } else if (this.form.username != "" && this.form.password == "" && this.form.confirm == "") {
          this.errorj = true;
          this.errork = true;
          uni.showToast({
            icon: "error",
            title: "密码不能为空"
          });
          return;
        } else if (this.form.username != "" && this.form.password == "" && this.form.confirm != "") {
          this.errorj = true;
          uni.showToast({
            icon: "error",
            title: "密码不能为空"
          });
          return;
        } else if (this.form.username != "" && this.form.password != "" && this.form.confirm == "") {
          this.errork = true;
          uni.showToast({
            icon: "error",
            title: "密码不能为空"
          });
          return;
        } else if (this.form.password != this.form.confirm) {
          this.errorj = true;
          this.errork = true;
          uni.showToast({
            icon: "error",
            title: "密码输入不一致"
          });
          return;
        }
        uni.showLoading({
          title: "更新中",
          mask: true
        });
        var that = this;
        uni.request({
          url: that.$BASE_URL + "/forget2",
          method: "POST",
          data: this.form,
          success: (res) => {
            const data = res.data;
            if (data.code == "401") {
              uni.hideLoading();
              that.errori = true;
              uni.showToast({
                icon: "error",
                title: data.msg
              });
            } else if (data.code == "200") {
              uni.hideLoading();
              uni.showToast({
                icon: "success",
                title: "成功"
              });
              uni.reLaunch({
                url: "/pages/login/login"
              });
            } else {
              uni.hideLoading();
              uni.showToast({
                icon: "error",
                title: data.msg
              });
            }
          },
          fail: (err) => {
            if (err.statusCode === 404) {
              uni.showToast({
                icon: "none",
                title: "请求失败，找不到资源"
              });
            } else if (err.statusCode === 500) {
              uni.showToast({
                icon: "none",
                title: "服务器错误，请稍后重试"
              });
            } else {
              uni.showToast({
                icon: "none",
                title: "请求失败，请稍后重试"
              });
            }
          }
        });
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "forgeti-wrap" }, [
        vue.createCommentVNode(" 200rpx == 100px "),
        vue.createElementVNode("view", { id: "forgetiname" }, " 忘记密码 "),
        vue.createElementVNode("view", { class: "forget2in" }, [
          vue.createVNode(_component_uni_easyinput, {
            id: "forget2ini",
            type: "text",
            modelValue: $data.form.user,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.form.user = $event),
            disabled: "",
            prefixIcon: "person",
            suffixIcon: "info",
            clearable: $data.showClearIcon,
            placeholder: "请输入登录账号",
            onIconClick: $options.personbt
          }, null, 8, ["modelValue", "clearable", "onIconClick"])
        ]),
        vue.createElementVNode("view", { class: "forget2in" }, [
          vue.createVNode(_component_uni_easyinput, {
            id: "forget2ini",
            type: "text",
            modelValue: $data.form.username,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.form.username = $event),
            "error-message": $data.errori ? "errorMessage" : "",
            prefixIcon: $data.showpersonIcon ? "help" : " ",
            suffixIcon: $data.showpersonIcon ? "clear" : " ",
            clearable: $data.showClearIcon,
            placeholder: $data.persontext ? "请输入默认用户名" : "",
            onFocus: $options.personFocus,
            onBlur: $options.personBlur,
            onIconClick: $options.personbti,
            onInput: $options.personInput
          }, null, 8, ["modelValue", "error-message", "prefixIcon", "suffixIcon", "clearable", "placeholder", "onFocus", "onBlur", "onIconClick", "onInput"])
        ]),
        vue.createElementVNode("view", { class: "forget2in" }, [
          vue.createVNode(_component_uni_easyinput, {
            id: "forget2inj",
            type: $data.ty ? "password" : "text",
            "error-message": $data.errorj ? "errorMessage" : "",
            passwordIcon: $data.showPasswordIcon,
            clearable: $data.showClearIcon,
            modelValue: $data.form.password,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.form.password = $event),
            prefixIcon: $data.showeyeIcon ? $options.eyeshow() : " ",
            suffixIcon: $data.showeyeIcon ? "clear" : " ",
            placeholder: $data.eyetext ? "请输入新登录密码" : "",
            onFocus: $options.eyeFocus,
            onBlur: $options.eyeBlur,
            onIconClick: $options.eyebt,
            onInput: $options.eyeInput
          }, null, 8, ["type", "error-message", "passwordIcon", "clearable", "modelValue", "prefixIcon", "suffixIcon", "placeholder", "onFocus", "onBlur", "onIconClick", "onInput"])
        ]),
        vue.createElementVNode("view", { class: "forget2in" }, [
          vue.createVNode(_component_uni_easyinput, {
            id: "forget2ink",
            type: $data.tyi ? "password" : "text",
            "error-message": $data.errork ? "errorMessage" : "",
            passwordIcon: $data.showPasswordIcon,
            clearable: $data.showClearIcon,
            modelValue: $data.form.confirm,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.form.confirm = $event),
            prefixIcon: $data.showeyeIconi ? $options.eyeshowi() : " ",
            suffixIcon: $data.showeyeIconi ? "clear" : " ",
            placeholder: $data.eyetexti ? "请确认新登录密码" : "",
            onFocus: $options.eyeFocusi,
            onBlur: $options.eyeBluri,
            onIconClick: $options.eyebti,
            onInput: $options.eyeInputi
          }, null, 8, ["type", "error-message", "passwordIcon", "clearable", "modelValue", "prefixIcon", "suffixIcon", "placeholder", "onFocus", "onBlur", "onIconClick", "onInput"])
        ]),
        vue.createElementVNode("view", { class: "forget2in" }, [
          vue.createElementVNode("button", {
            type: "primary",
            onClick: _cache[4] || (_cache[4] = (...args) => $options.forget1 && $options.forget1(...args)),
            style: { "background-color": "#99CC99", "border-radius": "20px", "font-size": "35rpx", "word-spacing": "20rpx" }
          }, "修 改 ")
        ]),
        vue.createCommentVNode(' 	<label class="checkbox d-flex a-center" >\r\n							<checkbox :checked="check" />\r\n							<text class="text-light-muted font">已阅读并同意XXXXX协议</text>\r\n			</label> ')
      ])
    ]);
  }
  const PagesForgetForget2 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__file", "F:/SkinApp/App01/pages/forget/forget2.vue"]]);
  const _sfc_main$b = {
    data() {
      return {
        imageUrl: "",
        x: 0,
        // 矩形框的x坐标
        y: 0,
        // 矩形框的y坐标
        width: 0,
        // 矩形框的宽度
        height: 0,
        // 矩形框的高度
        isor: false,
        iconnum: 0,
        image: {
          imageWidth: 0,
          // 图片的原始宽度
          imageHeight: 0,
          // 图片的原始高度
          displayWidth: 0,
          // 图片的显示宽度
          displayHeight: 0,
          // 图片的显示高度 
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        },
        isSkin: false,
        isdisplay: false,
        loadsucess: true,
        isclear: false,
        tabbarheight: 0,
        resizewidth: 0,
        resizetext: 0,
        isChoose: true,
        box: [],
        touchStartX: 0,
        touchStartY: 0,
        touchEndX: 0,
        touchEndY: 0,
        isDrawing: false,
        istextresponse: false,
        touchrect: {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          finish: false
        },
        touchrecttrue: {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        },
        form: {
          info_id: 0,
          username: "",
          sex: "",
          age: "",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          imageUrl: "",
          currenttime: ""
        },
        addorchoose: 0,
        time1: null
      };
    },
    onLoad: function(option) {
      this.imageUrl = option.src;
      const form = JSON.parse(option.form);
      this.form.info_id = form.info_id;
      this.form.username = form.username;
      this.form.sex = form.sex;
      this.form.age = form.age;
      this.form.imageUrl = option.src;
      this.tabbarheight = uni.getSystemInfoSync().windowTop;
      var currentTime = /* @__PURE__ */ new Date();
      this.form.currenttime = currentTime.getTime();
    },
    onShow() {
      this.$device(function(result) {
        if (result == 2) {
          uni.showToast({
            icon: "error",
            title: "账号在异地登录",
            mask: true
          });
          setTimeout(() => {
            uni.reLaunch({
              url: "/pages/index/index"
            });
          }, 1e3);
        } else if (result == 4) {
          setTimeout(() => {
            uni.reLaunch({
              url: "/pages/index/index"
            });
          }, 1e3);
        } else {
          let user1 = uni.getStorageSync("user");
          if (!user1) {
            uni.showToast({
              icon: "none",
              title: "未登录",
              "mask": true
            });
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/index/index"
              });
            }, 1e3);
          }
        }
      });
      this.time1 = setInterval(() => {
        this.$device(function(result) {
          if (result == 2) {
            uni.showToast({
              icon: "error",
              title: "账号在异地登录",
              mask: true
            });
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/index/index"
              });
            }, 1e3);
          } else if (result == 4) {
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/index/index"
              });
            }, 1e3);
          } else {
            let user1 = uni.getStorageSync("user");
            if (!user1) {
              uni.showToast({
                icon: "none",
                title: "未登录",
                "mask": true
              });
              setTimeout(() => {
                uni.reLaunch({
                  url: "/pages/index/index"
                });
              }, 1e3);
            }
          }
        });
      }, 36e5);
    },
    onReady() {
      const userData = uni.getStorageSync("user");
      if (this.isdisplay) {
        this.$refs.popup.open("bottom");
      }
      uni.uploadFile({
        url: this.$BASE_URL + "/skinrecognition",
        filePath: this.imageUrl,
        name: "file",
        header: { Authorization: "Bearer " + userData.access_token },
        success: (res) => {
          const data = JSON.parse(res.data);
          if (data.code == "200") {
            this.box = data.data;
            setTimeout(() => {
              this.isSkin = true;
            }, 500);
            setTimeout(() => {
              if (this.isSkin == false) {
                return;
              } else {
                if (this.box.length > 0) {
                  this.form.x = this.box[0][0];
                  this.form.y = this.box[0][1];
                  this.form.w = this.box[0][2];
                  this.form.h = this.box[0][3];
                }
                uni.getImageInfo({
                  src: this.imageUrl,
                  success: (res2) => {
                    this.image.imageWidth = res2.width;
                    this.image.imageHeight = res2.height;
                    var that = this;
                    const query0 = uni.createSelectorQuery().in(this);
                    query0.select("#resizecanvas").boundingClientRect((data0) => {
                      that.resizewidth = data0.height;
                    }).exec();
                    setTimeout(() => {
                      this.box.forEach((item, index2) => {
                        that.draw(index2);
                      });
                    }, 400);
                  }
                });
              }
            }, 500);
          } else if (data.code == "201") {
            this.box = data.data;
            setTimeout(() => {
              this.isSkin = true;
            }, 500);
            setTimeout(() => {
              if (this.isSkin == false) {
                return;
              } else {
                if (this.box.length > 0) {
                  this.form.x = this.box[0][0];
                  this.form.y = this.box[0][1];
                  this.form.w = this.box[0][2];
                  this.form.h = this.box[0][3];
                }
                uni.getImageInfo({
                  src: this.imageUrl,
                  success: (res2) => {
                    this.image.imageWidth = res2.width;
                    this.image.imageHeight = res2.height;
                    var that = this;
                    const query0 = uni.createSelectorQuery().in(this);
                    query0.select("#resizecanvas").boundingClientRect((data0) => {
                      that.resizewidth = data0.height;
                    }).exec();
                    setTimeout(() => {
                      this.box.forEach((item, index2) => {
                        that.draw(index2);
                      });
                    }, 400);
                  }
                });
              }
            }, 500);
          } else if (data.code == "300") {
            setTimeout(() => {
              this.isdisplay = true;
            }, 500);
            setTimeout(() => {
              this.$refs.popup.open("bottom");
            }, 500);
          } else {
            uni.showToast({
              icon: "none",
              title: data.msg
            });
            uni.switchTab({
              url: "/pages/index/index"
            });
          }
        },
        fail: (err) => {
          if (err.statusCode === 404) {
            uni.showToast({
              icon: "none",
              title: "请求失败，找不到资源"
            });
          } else if (err.statusCode === 500) {
            uni.showToast({
              icon: "none",
              title: "服务器内部错误，请稍后重试"
            });
          } else {
            uni.showToast({
              icon: "none",
              title: "请求失败，请稍后重试"
            });
          }
          uni.switchTab({
            url: "/pages/index/index"
          });
        }
      });
    },
    onHide() {
      clearInterval(this.time1);
      this.time1 = null;
    },
    methods: {
      textresponse() {
        this.istextresponse = true;
      },
      next() {
        if (this.box.length > 0 && this.iconnum != -1 || this.iconnum == -1 && this.addorchoose == 2) {
          if (this.iconnum != -1) {
            var index2 = this.iconnum;
            this.form.x = this.box[index2][0];
            this.form.y = this.box[index2][1];
            this.form.w = this.box[index2][2];
            this.form.h = this.box[index2][3];
            uni.navigateTo({
              url: "/pages/detect/detect2?form=" + JSON.stringify(this.form)
            });
          } else {
            this.form.x = (this.touchrecttrue.x + this.touchrecttrue.width / 2) / this.image.imageWidth;
            this.form.y = (this.touchrecttrue.y + this.touchrecttrue.height / 2) / this.image.imageHeight;
            this.form.w = this.touchrecttrue.width / this.image.imageWidth;
            this.form.h = this.touchrecttrue.height / this.image.imageHeight;
            uni.navigateTo({
              url: "/pages/detect/detect2?form=" + JSON.stringify(this.form)
            });
          }
        }
      },
      clear(id1, id2) {
        if (this.iconnum == -1) {
          this.addorchoose = 1;
        } else {
          this.addorchoose = 0;
        }
        this.touchrect = {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          finish: false
        };
        this.isclear = true;
        this.touchrecttrue = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
        const context = uni.createCanvasContext(id1, this);
        context.clearRect(0, 0, this.image.displayWidth, this.image.displayHeight);
        context.draw();
        const ctx1 = uni.createCanvasContext(id2, this);
        ctx1.clearRect(0, 0, this.resizewidth, this.resizewidth);
        ctx1.draw();
      },
      clickresize(index0) {
        this.iconnum = index0;
        if (this.iconnum == -1 && !this.touchrect.finish) {
          this.addorchoose = 1;
        } else if (this.iconnum == -1 && this.touchrect.finish) {
          this.addorchoose = 2;
        } else if (this.iconnum != -1 && !this.touchrect.finish) {
          this.addorchoose = 0;
        }
        if (!this.isclear && this.touchrect.finish) {
          this.handdraw(-1);
        }
        var that = this;
        this.box.forEach((item, index2) => {
          that.draw(index2);
        });
      },
      imageLoad: function(e) {
        var that = this;
        const query = uni.createSelectorQuery().in(this);
        query.select("#image").boundingClientRect((data) => {
          that.image.displayWidth = data.width;
          that.image.displayHeight = data.height;
          that.image.left = data.left;
          that.image.top = data.top;
          that.image.right = data.right;
          that.image.bottom = data.bottom;
        }).exec();
      },
      draw(index2) {
        var context = uni.createCanvasContext("myCanvas" + index2, this);
        var color = this.iconnum == index2 ? "#51458B" : "#fff";
        context.setStrokeStyle(color);
        context.setLineWidth(2);
        var fill = this.iconnum == index2 ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0)";
        context.setFillStyle(fill);
        var width = this.box[index2][2] * this.image.displayWidth;
        var height = this.box[index2][3] * this.image.displayHeight;
        var centerX = this.box[index2][0] * this.image.displayWidth;
        var centerY = this.box[index2][1] * this.image.displayHeight;
        context.fillRect(centerX - width / 2, centerY - height / 2, width, height);
        context.strokeRect(centerX - width / 2, centerY - height / 2, width, height);
        context.draw();
        const ctx = uni.createCanvasContext("seeCanvas" + index2, this);
        var width = this.box[index2][2] * this.image.imageWidth;
        var height = this.box[index2][3] * this.image.imageHeight;
        var centerX = this.box[index2][0] * this.image.imageWidth;
        var centerY = this.box[index2][1] * this.image.imageHeight;
        var x = centerX - width / 2;
        var y = centerY - height / 2;
        var width = width;
        var height = height;
        ctx.drawImage(this.imageUrl, x, y, width, height, 0, 0, this.resizewidth, this.resizewidth);
        ctx.draw();
      },
      chose() {
        this.isChoose = !this.isChoose;
        this.draw();
        const ctx = uni.createCanvasContext("seeCanvas" + index, this);
        var width = this.box[0][2] * this.image.imageWidth;
        var height = this.box[0][3] * this.image.imageHeight;
        var centerX = this.box[0][0] * this.image.imageWidth;
        var centerY = this.box[0][1] * this.image.imageHeight;
        var x = centerX - width / 2;
        var y = centerY - height / 2;
        var width = width;
        var height = height;
        ctx.drawImage(this.imageUrl, x, y, width, height, 0, 0, this.resizewidth, this.resizewidth);
        ctx.draw();
      },
      startDraw(event) {
        if (this.iconnum == -1) {
          this.isclear = false;
          this.touchStartX = event.touches[0].x;
          this.touchStartY = event.touches[0].y;
          this.isDrawing = true;
        }
      },
      drawRect(event) {
        if (this.iconnum == -1) {
          this.touchrect.finish = false;
          if (!this.isDrawing)
            return;
          const touchMoveX = event.touches[0].x;
          const touchMoveY = event.touches[0].y;
          this.touchEndX = touchMoveX;
          this.touchEndY = touchMoveY;
          this.handdraw(-1);
        }
      },
      handdraw(index2) {
        if (index2 == -1) {
          const context = uni.createCanvasContext("handCanvas", this);
          context.clearRect(0, 0, this.image.displayWidth, this.image.displayHeight);
          if (this.touchEndX > this.image.displayWidth) {
            this.touchEndX = this.image.displayWidth;
          } else if (this.touchEndX < 0) {
            this.touchEndX = 0;
          }
          if (this.touchEndY > this.image.displayHeight) {
            this.touchEndY = this.image.displayHeight;
          } else if (this.touchEndY < 0) {
            this.touchEndY = 0;
          }
          const x = Math.min(this.touchStartX, this.touchEndX);
          const y = Math.min(this.touchStartY, this.touchEndY);
          const width = Math.abs(this.touchEndX - this.touchStartX);
          const height = Math.abs(this.touchEndY - this.touchStartY);
          this.touchrect.x = x;
          this.touchrect.y = y;
          this.touchrect.width = width;
          this.touchrect.height = height;
          var fill = this.iconnum == -1 ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0)";
          context.setFillStyle(fill);
          var color = this.iconnum == -1 ? "#51458B" : "#fff";
          context.setStrokeStyle(color);
          context.setLineWidth(2);
          context.fillRect(x, y, width, height);
          context.strokeRect(x, y, width, height);
          context.draw();
          this.touchrecttrue.x = x / this.image.displayWidth * this.image.imageWidth;
          this.touchrecttrue.y = y / this.image.displayHeight * this.image.imageHeight;
          this.touchrecttrue.width = width / this.image.displayWidth * this.image.imageWidth;
          this.touchrecttrue.height = height / this.image.displayHeight * this.image.imageHeight;
        }
      },
      endDraw() {
        if (this.iconnum == -1) {
          if (this.touchrecttrue.width > 0 && this.touchrecttrue.height > 0) {
            this.addorchoose = 2;
            this.isDrawing = false;
            const ctx1 = uni.createCanvasContext("HandCanvas", this);
            ctx1.drawImage(this.imageUrl, this.touchrecttrue.x, this.touchrecttrue.y, this.touchrecttrue.width, this.touchrecttrue.height, 0, 0, this.resizewidth, this.resizewidth);
            this.touchrect.finish = true;
            setTimeout(() => {
              ctx1.draw();
            }, 100);
          }
        }
      }
      // 	cutimage(id){
      // 		var ctx = uni.createCanvasContext(id);
      // 		__f__('log','at pages/detect/detect1.vue:735','裁剪');
      // 		const imageWidth = this.width;
      // 		const imageHight = this.height;
      // 		const x = this.x;
      // 		const y = this.y;
      // 		__f__('log','at pages/detect/detect1.vue:740',x,y);
      // 		var that = this;
      // 		ctx.drawImage(this.imageUrl,x,y,imageWidth,imageHight);
      // 		ctx.draw(false,setTimeout(() =>{
      // 		        uni.canvasToTempFilePath({
      // 		          canvasId: id,
      // 		          fileType: 'jpg',
      // 		          success: (res) => {
      // 					uni.saveImageToPhotosAlbum({
      // 					filePath: res.tempFilePath,
      // 						 success: (suc) =>{
      // 							that.Image = suc.path;
      // 						},
      // 						fail: (error)  =>{
      // 							uni.showToast({
      // 								title: "没有权限,保存失败",
      // 								icon: "error"
      // 							});
      // 						},
      // 					});
      // 		          },
      // 		          fail: (err) => {
      // 					__f__('log','at pages/detect/detect1.vue:766','失败');
      // 		          }
      // 		        }, this);
      // 			}, 1000));
      // 	}
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_5);
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_2);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "content-wrap" }, [
        vue.createCommentVNode(" 判断 v-if onLoad开始上传 onReady后面判断  "),
        $data.isSkin == false ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          style: { "display": "contents" }
        }, [
          $data.isdisplay == false ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "image-wrap"
          }, [
            vue.createElementVNode("view", { style: { "border": "2rpx solid #ECEFF1", "width": "100%", "height": "100%", "border-radius": "40rpx", "background-color": "#fff", "display": "flex", "justify-content": "center", "align-items": "center" } }, [
              vue.createElementVNode("image", {
                src: "/static/loading.gif",
                style: { "width": "100%", "transform": "scale(0.7)" },
                mode: "widthFix"
              })
            ])
          ])) : vue.createCommentVNode("v-if", true),
          $data.isdisplay == false ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            style: { "display": "flex", "justify-content": "center", "align-items": "center", "color": "#8366c8", "font-size": "30rpx" }
          }, [
            vue.createElementVNode("text", null, "图片上传中...")
          ])) : vue.createCommentVNode("v-if", true),
          $data.isdisplay ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "image-wrap"
          }, [
            vue.createElementVNode("image", {
              ref: "img",
              id: "image",
              src: $data.imageUrl,
              mode: "widthFix"
            }, null, 8, ["src"])
          ])) : vue.createCommentVNode("v-if", true),
          $data.isdisplay ? (vue.openBlock(), vue.createElementBlock("view", { key: 3 }, [
            vue.createVNode(
              _component_uni_popup,
              {
                ref: "popup",
                "is-mask-click": false
              },
              {
                default: vue.withCtx(() => [
                  $data.istextresponse == false ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    style: { "height": "20vh", "width": "100%", "background-color": "#fff", "border-top-left-radius": "2vh", "border-top-right-radius": "2vh" }
                  }, [
                    vue.createElementVNode("view", { style: { "padding-top": "5%", "padding-left": "5%", "display": "flex", "justify-content": "flex-start", "align-items": "center" } }, [
                      vue.createElementVNode("image", {
                        src: "/static/fail1.png",
                        style: { "width": "70rpx", "height": "70rpx", "margin-right": "20rpx" }
                      }),
                      vue.createElementVNode("text", null, "这好像不是张皮肤部位的图片")
                    ]),
                    vue.createElementVNode("view", { style: { "padding-top": "8%", "padding-left": "5%", "display": "flex", "justify-content": "flex-start", "align-items": "center" } }, [
                      vue.createElementVNode("navigator", {
                        style: { "margin-left": "90rpx", "color": "#914DFF" },
                        "open-type": "switchTab",
                        url: "/pages/index/index"
                      }, "重新上传"),
                      vue.createElementVNode("text", {
                        style: { "margin-left": "20rpx", "color": "#bfbfbf" },
                        onClick: _cache[0] || (_cache[0] = (...args) => $options.textresponse && $options.textresponse(...args))
                      }, "这是一张皮肤图片")
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $data.istextresponse ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    style: { "height": "20vh", "width": "100%", "background-color": "#fff", "border-top-left-radius": "2vh", "border-top-right-radius": "2vh" }
                  }, [
                    vue.createElementVNode("view", { style: { "padding-top": "5%", "padding-left": "5%", "display": "flex", "justify-content": "flex-start", "align-items": "center" } }, [
                      vue.createElementVNode("image", {
                        src: "/static/success1.png",
                        style: { "width": "70rpx", "height": "70rpx", "margin-right": "20rpx" }
                      }),
                      vue.createElementVNode("text", null, "收到您的反馈，肤测汇会再接再厉")
                    ]),
                    vue.createElementVNode("view", { style: { "padding-top": "8%", "padding-left": "5%", "display": "flex", "justify-content": "flex-start", "align-items": "center" } }, [
                      vue.createElementVNode("navigator", {
                        style: { "margin-left": "90rpx", "color": "#914DFF" },
                        "open-type": "switchTab",
                        url: "/pages/index/index"
                      }, "返回到首页")
                    ])
                  ])) : vue.createCommentVNode("v-if", true)
                ]),
                _: 1
                /* STABLE */
              },
              512
              /* NEED_PATCH */
            )
          ])) : vue.createCommentVNode("v-if", true)
        ])) : vue.createCommentVNode("v-if", true),
        $data.isSkin ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          style: { "display": "contents" }
        }, [
          vue.createElementVNode("view", { class: "image-wrap" }, [
            vue.createElementVNode("image", {
              ref: "img",
              id: "image",
              src: $data.imageUrl,
              mode: "widthFix",
              onLoad: _cache[1] || (_cache[1] = (...args) => $options.imageLoad && $options.imageLoad(...args))
            }, null, 40, ["src"]),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.box, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", null, [
                  vue.createElementVNode("canvas", {
                    "canvas-id": "myCanvas" + index2,
                    style: vue.normalizeStyle({ position: "absolute", left: $data.image.left + "px", top: $data.image.top + "px", width: $data.image.displayWidth + "px", height: $data.image.displayHeight + "px" })
                  }, null, 12, ["canvas-id"])
                ]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            )),
            vue.createElementVNode(
              "canvas",
              {
                "canvas-id": "handCanvas",
                style: vue.normalizeStyle({ position: "absolute", left: $data.image.left + "px", top: $data.image.top + "px", width: $data.image.displayWidth + "px", height: $data.image.displayHeight + "px" }),
                onTouchstart: _cache[2] || (_cache[2] = (...args) => $options.startDraw && $options.startDraw(...args)),
                onTouchmove: _cache[3] || (_cache[3] = (...args) => $options.drawRect && $options.drawRect(...args)),
                onTouchend: _cache[4] || (_cache[4] = (...args) => $options.endDraw && $options.endDraw(...args))
              },
              null,
              36
              /* STYLE, HYDRATE_EVENTS */
            ),
            $data.touchrect.finish ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
              vue.createVNode(_component_uni_icons, {
                type: "clear",
                color: "#ffffff",
                size: "26",
                style: vue.normalizeStyle({ position: "absolute", left: $data.image.left + $data.touchrect.x + $data.touchrect.width - 12 + "px", top: $data.image.top - 16 + $data.touchrect.y + "px" }),
                onClick: _cache[5] || (_cache[5] = ($event) => $options.clear("handCanvas", "HandCanvas"))
              }, null, 8, ["style"])
            ])) : vue.createCommentVNode("v-if", true)
          ]),
          vue.createElementVNode("view", { style: { "height": "5vh", "display": "flex", "justify-content": "center", "overflow": "hidden", "flex-wrap": "nowrap", "text-overflow": "ellipsis", "color": "#8366c8", "font-size": "30rpx" } }, [
            $data.box.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
              $data.addorchoose == 1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                vue.createElementVNode("text", null, "请在上图圈画出皮损部位")
              ])) : $data.addorchoose == 2 && $data.iconnum == -1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                vue.createElementVNode("text", null, "可删除或修改手动添加的皮损部位")
              ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 2 }, [
                vue.createElementVNode("text", null, "请选择一处皮损或手动添加")
              ]))
            ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
              $data.addorchoose == 1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                vue.createElementVNode("text", null, "请在上图圈画出皮损部位")
              ])) : $data.addorchoose == 2 && $data.iconnum == -1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                vue.createElementVNode("text", null, "可删除或修改手动添加的皮损部位")
              ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 2 }, [
                vue.createElementVNode("text", null, "未识别皮损区域，请手动标记")
              ]))
            ]))
          ]),
          vue.createElementVNode(
            "view",
            {
              id: "resizecanvas",
              ref: "resizecanvas",
              style: { "height": "8vh", "display": "flex", "justify-content": "space-evenly", "align-items": "center", "overflow-y": "visible", "flex-wrap": "wrap" }
            },
            [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.box, (item, index2) => {
                  return vue.openBlock(), vue.createElementBlock("view", null, [
                    vue.createElementVNode("view", {
                      style: vue.normalizeStyle({ width: $data.resizewidth + "px", height: $data.resizewidth + "px", "border-radius": $data.resizewidth + "px", border: index2 == $data.iconnum ? "6rpx solid #8366c8" : "" }),
                      onClick: ($event) => $options.clickresize(index2)
                    }, [
                      vue.createElementVNode("canvas", {
                        "canvas-id": "seeCanvas" + index2,
                        style: vue.normalizeStyle({ width: $data.resizewidth + "px", height: $data.resizewidth + "px", "border-radius": $data.resizewidth + "px", overflow: "hidden" })
                      }, null, 12, ["canvas-id"])
                    ], 12, ["onClick"])
                  ]);
                }),
                256
                /* UNKEYED_FRAGMENT */
              )),
              vue.createElementVNode(
                "view",
                {
                  style: vue.normalizeStyle({ width: $data.resizewidth + "px", height: $data.resizewidth + "px", "border-radius": $data.resizewidth + "px", border: $data.iconnum == -1 ? "6rpx solid #8366c8" : "2rpx solid #bfbfbf", display: "flex", justifyContent: "center", alignItems: "center" }),
                  onClick: _cache[6] || (_cache[6] = ($event) => $options.clickresize(-1))
                },
                [
                  $data.addorchoose == 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "plusempty",
                      color: "#bfbfbf",
                      size: $data.resizewidth * 0.5
                    }, null, 8, ["size"])
                  ])) : vue.createCommentVNode("v-if", true),
                  $data.addorchoose == 1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "arrow-up",
                      color: "#8366c8",
                      size: $data.resizewidth * 0.5
                    }, null, 8, ["size"])
                  ])) : vue.createCommentVNode("v-if", true),
                  $data.addorchoose == 2 ? (vue.openBlock(), vue.createElementBlock("view", { key: 2 }, [
                    vue.createElementVNode(
                      "canvas",
                      {
                        "canvas-id": "HandCanvas",
                        style: vue.normalizeStyle({ width: $data.resizewidth + "px", height: $data.resizewidth + "px", "border-radius": $data.resizewidth + "px", overflow: "hidden" })
                      },
                      null,
                      4
                      /* STYLE */
                    )
                  ])) : vue.createCommentVNode("v-if", true)
                ],
                4
                /* STYLE */
              )
            ],
            512
            /* NEED_PATCH */
          ),
          vue.createElementVNode("view", {
            id: "resizetext",
            style: { "height": "4.5vh", "display": "flex", "font-size": "26rpx", "justify-content": "space-evenly", "align-items": "center", "overflow-y": "visible", "flex-wrap": "wrap", "text-align": "center" }
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.box, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", null, [
                  vue.createElementVNode(
                    "view",
                    {
                      style: vue.normalizeStyle({ width: $data.resizewidth + "px", color: index2 == $data.iconnum ? "#8366c8" : "#bfbfbf" })
                    },
                    [
                      vue.createElementVNode("text", null, "皮损")
                    ],
                    4
                    /* STYLE */
                  )
                ]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            )),
            vue.createElementVNode(
              "view",
              {
                style: vue.normalizeStyle({ width: $data.resizewidth + "px", color: $data.iconnum == -1 ? "#8366c8" : "#bfbfbf" })
              },
              [
                $data.addorchoose == 2 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                  vue.createElementVNode("text", null, "手动")
                ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                  vue.createElementVNode("text", null, "添加")
                ]))
              ],
              4
              /* STYLE */
            )
          ]),
          vue.createElementVNode("view", { style: { "margin-top": "1rpx", "display": "flex", "justify-content": "center", "align-items": "center", "text-align": "center" } }, [
            vue.createElementVNode("text", { style: { "color": "#bfbfbf", "font-size": "26rpx" } }, "*请在10分钟内完成测评")
          ]),
          vue.createElementVNode("view", { style: { "margin-top": "1vh", "margin-bottom": "1vh", "height": "5vh", "display": "flex", "justify-content": "center", "align-items": "center", "text-align": "center" } }, [
            vue.createElementVNode(
              "button",
              {
                style: vue.normalizeStyle({ width: "90%", height: "100%", color: $data.box.length > 0 && $data.iconnum != -1 || $data.iconnum == -1 && $data.addorchoose == 2 ? "#fff" : "#e2e2e2", "-moz-box-shadow ": $data.box.length > 0 && $data.iconnum != -1 || $data.iconnum == -1 && $data.addorchoose == 2 ? " 0px 5rpx 25rpx #7a7a7a" : "", "-webkit-box-shadow": $data.box.length > 0 && $data.iconnum != -1 || $data.iconnum == -1 && $data.addorchoose == 2 ? "0px 5rpx 25rpx #7a7a7a" : "", "box-shadow": $data.box.length > 0 && $data.iconnum != -1 || $data.iconnum == -1 && $data.addorchoose == 2 ? "0px 5rpx 25rpx #7a7a7a" : "", "white-space": "nowrap", "border-radius": "40rpx", "background-color": $data.box.length > 0 && $data.iconnum != -1 || $data.iconnum == -1 && $data.addorchoose == 2 ? "#9370DB" : "#ccc", "text-align": "center", display: "flex", "justify-content": "center", "align-items": "center" }),
                "hover-class": "nextbtclick",
                onClick: _cache[7] || (_cache[7] = (...args) => $options.next && $options.next(...args))
              },
              "继 续",
              4
              /* STYLE */
            )
          ])
        ])) : vue.createCommentVNode("v-if", true)
      ])
    ]);
  }
  const PagesDetectDetect1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__file", "F:/SkinApp/App01/pages/detect/detect1.vue"]]);
  const _sfc_main$a = {
    data() {
      return {
        ischose: false,
        opposite: true,
        form: {
          info_id: 0,
          username: "",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          sex: "男",
          age: "0",
          imageUrl: "",
          position: []
        },
        // 女 40 男 41
        clicknum: 0,
        positionx: Array(40).fill(0),
        positiony: Array(39).fill(0),
        image: {
          displayWidth: 0,
          displayHeight: 0,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        },
        height: 0,
        tabbarheight: 0,
        canvastop: 0,
        swc: false,
        time1: null,
        isChecked: false,
        currenttime: ""
      };
    },
    onLoad: function(option) {
      const form = JSON.parse(option.form);
      this.form.info_id = form.info_id;
      this.form.username = form.username;
      this.form.sex = form.sex;
      this.form.age = form.age;
      this.form.x = form.x;
      this.form.y = form.y;
      this.form.w = form.w;
      this.form.h = form.h;
      this.form.imageUrl = form.imageUrl;
      this.currenttime = form.currenttime;
      this.tabbarheight = uni.getSystemInfoSync().windowTop;
      this.height = uni.getSystemInfoSync().windowHeight;
      this.tabbarheight = uni.getSystemInfoSync().statusBarHeight;
      this.canvastop = this.height;
    },
    onShow() {
      this.$device(function(result) {
        if (result == 2) {
          uni.showToast({
            icon: "error",
            title: "账号在异地登录",
            mask: true
          });
          setTimeout(() => {
            uni.reLaunch({
              url: "/pages/index/index"
            });
          }, 1e3);
        } else if (result == 4) {
          setTimeout(() => {
            uni.reLaunch({
              url: "/pages/index/index"
            });
          }, 1e3);
        } else {
          let user1 = uni.getStorageSync("user");
          if (!user1) {
            uni.showToast({
              icon: "none",
              title: "未登录",
              "mask": true
            });
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/index/index"
              });
            }, 1e3);
          }
        }
      });
      this.time1 = setInterval(() => {
        this.$device(function(result) {
          if (result == 2) {
            uni.showToast({
              icon: "error",
              title: "账号在异地登录",
              mask: true
            });
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/index/index"
              });
            }, 1e3);
          } else if (result == 4) {
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/index/index"
              });
            }, 1e3);
          } else {
            let user1 = uni.getStorageSync("user");
            if (!user1) {
              uni.showToast({
                icon: "none",
                title: "未登录",
                "mask": true
              });
              setTimeout(() => {
                uni.reLaunch({
                  url: "/pages/index/index"
                });
              }, 1e3);
            }
          }
        });
      }, 36e5);
    },
    onReady() {
    },
    onHide() {
      clearInterval(this.time1);
      this.time1 = null;
    },
    methods: {
      final() {
        if (this.ischose || this.isChecked) {
          var now = /* @__PURE__ */ new Date();
          var currentTimeMs = now.getTime();
          var timeDifference = currentTimeMs - this.currenttime;
          if (timeDifference > 9 * 60 * 1e3) {
            this.$refs.overtime.open("bottom");
          } else {
            if (this.form.sex == "男") {
              this.form.position = this.positionx;
            } else {
              this.form.position = this.positiony;
            }
            uni.navigateTo({
              url: "/pages/detect/detect3?form=" + JSON.stringify(this.form)
            });
          }
        }
      },
      toggleCheckbox() {
        this.isChecked = !this.isChecked;
        if (this.isChecked) {
          if (this.form.sex == "男") {
            this.positionx.fill(1);
          } else {
            this.positiony.fill(1);
          }
          this.ischose = true;
        } else {
          if (this.form.sex == "男") {
            this.positionx.fill(0);
          } else {
            this.positiony.fill(0);
          }
          this.ischose = false;
        }
      },
      deleteall() {
        if (this.ischose) {
          if (this.form.sex == "男") {
            this.positionx = this.positionx.map(() => 0);
          } else {
            this.positiony = this.positiony.map(() => 0);
          }
          this.ischose = false;
          this.isChecked = false;
        }
      },
      imageLoad: function(e) {
        var that = this;
        const query = uni.createSelectorQuery().in(this);
        query.select(".image").boundingClientRect((data) => {
          that.image.displayWidth = data.width;
          that.image.displayHeight = data.height;
          that.image.left = data.left;
          that.image.top = data.top;
          that.image.right = data.right;
          that.image.bottom = data.bottom;
          that.canvastop = that.image.top / that.canvastop * 100;
        }).exec();
      },
      canvas(index2) {
        if (this.form.sex == "男") {
          if (this.opposite) {
            this.clicknum = index2;
            this.$refs.popup.open("center");
          } else {
            this.clicknum = index2;
            this.$refs.popup.open("center");
          }
        } else {
          if (this.opposite) {
            this.clicknum = index2;
            this.$refs.popup.open("center");
          } else {
            this.clicknum = index2;
            this.$refs.popup.open("center");
          }
        }
      },
      btclick(num) {
        if (this.form.sex == "男") {
          if (this.positionx[num] == 0) {
            this.positionx[num] = 1;
            this.ischose = true;
          } else {
            this.positionx[num] = 0;
            const allZeros = this.positionx.every((item) => item === 0);
            if (allZeros) {
              this.ischose = false;
            }
          }
        } else {
          if (this.positiony[num] == 0) {
            this.positiony[num] = 1;
            this.ischose = true;
          } else {
            this.positiony[num] = 0;
            const allZeros = this.positiony.every((item) => item === 0);
            if (allZeros) {
              this.ischose = false;
            }
          }
        }
      },
      switchchange: function(e) {
        if (e.detail.value) {
          this.swc = true;
          this.opposite = false;
        } else {
          this.swc = false;
          this.opposite = true;
        }
        this.tabbarheight = uni.getSystemInfoSync().windowTop;
        this.height = uni.getSystemInfoSync().windowHeight;
        this.tabbarheight = uni.getSystemInfoSync().statusBarHeight;
        this.canvastop = this.height;
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_5);
    return vue.openBlock(), vue.createElementBlock("view", {
      id: "viewd",
      style: { "width": "100%" }
    }, [
      vue.createElementVNode("view", { style: { "height": "10vh", "background-color": "aqua", "display": "contents" } }, [
        vue.createElementVNode("view", { style: { "display": "flex", "flex-direction": "row", "align-items": "center", "padding-top": "2vh" } }, [
          vue.createElementVNode("view", { style: { "font-size": "40rpx", "padding-left": "1.5vh", "white-space": "nowrap", "overflow": "hidden", "text-overflow": "ellipsis" } }, [
            vue.createElementVNode("text", { style: { "color": "#8b8b8b", "white-space": "nowrap" } }, "病发位于:"),
            vue.createElementVNode("text", { style: { "color": "#8366c8", "padding-left": "2vh", "white-space": "nowrap", "overflow": "hidden", "text-overflow": "ellipsis" } })
          ]),
          vue.createElementVNode("view", { style: { "justify-content": "flex-end", "margin-left": "auto", "padding-right": "1vh" } }, [
            vue.createElementVNode(
              "text",
              {
                style: vue.normalizeStyle({ color: $data.ischose ? "#8366c8" : "#bfbfbf", "white-space": "nowrap" }),
                onClick: _cache[0] || (_cache[0] = (...args) => $options.deleteall && $options.deleteall(...args))
              },
              "清空选项",
              4
              /* STYLE */
            )
          ])
        ]),
        vue.createElementVNode("view", { style: { "font-size": "24rpx", "padding-top": "1vh", "padding-bottom": "1vh", "padding-left": "1.5vh", "border-bottom": "2rpx solid #9f9f9f" } }, [
          vue.createElementVNode("text", { style: { "color": "#bfbfbf" } }, "请在下图中点击选择皮损发病部位，可多选*")
        ])
      ]),
      $data.form.sex == "男" ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
        $data.opposite ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          style: { "height": "65vh", "width": "100%", "background-color": "#fff", "display": "flex", "justify-content": "center", "align-items": "center", "overflow": "hidden" }
        }, [
          vue.createElementVNode(
            "image",
            {
              class: "image",
              src: "/static/humam/man1.jpg",
              mode: "aspectFit",
              style: { "height": "100%", "width": "100%" },
              onLoad: _cache[1] || (_cache[1] = (...args) => $options.imageLoad && $options.imageLoad(...args))
            },
            null,
            32
            /* HYDRATE_EVENTS */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "15%", height: "12%", top: $data.canvastop + "%" }),
              onClick: _cache[2] || (_cache[2] = ($event) => $options.canvas(0))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "18%", height: "17%", top: $data.canvastop + 12 + "%" }),
              onClick: _cache[3] || (_cache[3] = ($event) => $options.canvas(1))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "10%", height: "4%", top: $data.canvastop + 29 + "%", left: "45%" }),
              onClick: _cache[4] || (_cache[4] = ($event) => $options.canvas(2))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "5%", height: "4%", top: $data.canvastop + 29 + "%", left: "40%" }),
              onClick: _cache[5] || (_cache[5] = ($event) => $options.canvas(3))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "10%", height: "32%", top: $data.canvastop + 33 + "%", left: "40%" }),
              onClick: _cache[6] || (_cache[6] = ($event) => $options.canvas(3))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "5%", height: "4%", top: $data.canvastop + 29 + "%", left: "55%" }),
              onClick: _cache[7] || (_cache[7] = ($event) => $options.canvas(3))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "10%", height: "32%", top: $data.canvastop + 33 + "%", left: "51%" }),
              onClick: _cache[8] || (_cache[8] = ($event) => $options.canvas(3))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "22%", height: "26%", top: $data.canvastop + 12 + "%", left: "19%" }),
              onClick: _cache[9] || (_cache[9] = ($event) => $options.canvas(4))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "22%", height: "26%", top: $data.canvastop + 12 + "%", left: "59%" }),
              onClick: _cache[10] || (_cache[10] = ($event) => $options.canvas(4))
            },
            null,
            4
            /* STYLE */
          )
        ])) : !$data.opposite ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          style: { "height": "65vh", "width": "100%", "background-color": "#fff", "display": "flex", "justify-content": "center", "align-items": "center" }
        }, [
          vue.createElementVNode(
            "image",
            {
              class: "image",
              src: "/static/humam/man2.jpg",
              mode: "aspectFit",
              style: { "height": "100%", "width": "100%" },
              onLoad: _cache[11] || (_cache[11] = (...args) => $options.imageLoad && $options.imageLoad(...args))
            },
            null,
            32
            /* HYDRATE_EVENTS */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "15%", height: "12%", top: $data.canvastop + "%" }),
              onClick: _cache[12] || (_cache[12] = ($event) => $options.canvas(0))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "18%", height: "23%", top: $data.canvastop + 12 + "%" }),
              onClick: _cache[13] || (_cache[13] = ($event) => $options.canvas(1))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "10%", height: "30%", top: $data.canvastop + 35 + "%", left: "40%" }),
              onClick: _cache[14] || (_cache[14] = ($event) => $options.canvas(3))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "10%", height: "30%", top: $data.canvastop + 35 + "%", left: "51%" }),
              onClick: _cache[15] || (_cache[15] = ($event) => $options.canvas(3))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "22%", height: "26%", top: $data.canvastop + 12 + "%", left: "19%" }),
              onClick: _cache[16] || (_cache[16] = ($event) => $options.canvas(4))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "22%", height: "26%", top: $data.canvastop + 12 + "%", left: "59%" }),
              onClick: _cache[17] || (_cache[17] = ($event) => $options.canvas(4))
            },
            null,
            4
            /* STYLE */
          )
        ])) : vue.createCommentVNode("v-if", true)
      ])) : vue.createCommentVNode("v-if", true),
      $data.form.sex == "女" ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
        $data.opposite ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          style: { "height": "65vh", "width": "100%", "background-color": "#fff", "display": "flex", "justify-content": "center", "align-items": "center", "overflow": "hidden" }
        }, [
          vue.createElementVNode(
            "image",
            {
              class: "image",
              src: "/static/humam/woman1.jpg",
              mode: "aspectFit",
              style: { "height": "100%", "width": "100%" },
              onLoad: _cache[18] || (_cache[18] = (...args) => $options.imageLoad && $options.imageLoad(...args))
            },
            null,
            32
            /* HYDRATE_EVENTS */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "15%", height: "12%", top: $data.canvastop + "%" }),
              onClick: _cache[19] || (_cache[19] = ($event) => $options.canvas(0))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "17%", height: "17%", top: $data.canvastop + 12 + "%" }),
              onClick: _cache[20] || (_cache[20] = ($event) => $options.canvas(1))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "10%", height: "4%", top: $data.canvastop + 29 + "%", left: "45%" }),
              onClick: _cache[21] || (_cache[21] = ($event) => $options.canvas(2))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "5%", height: "4%", top: $data.canvastop + 29 + "%", left: "40%" }),
              onClick: _cache[22] || (_cache[22] = ($event) => $options.canvas(3))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "10%", height: "32%", top: $data.canvastop + 33 + "%", left: "40%" }),
              onClick: _cache[23] || (_cache[23] = ($event) => $options.canvas(3))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "5%", height: "4%", top: $data.canvastop + 29 + "%", left: "55%" }),
              onClick: _cache[24] || (_cache[24] = ($event) => $options.canvas(3))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "10%", height: "32%", top: $data.canvastop + 33 + "%", left: "51%" }),
              onClick: _cache[25] || (_cache[25] = ($event) => $options.canvas(3))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "20%", height: "25%", top: $data.canvastop + 12 + "%", left: "21%" }),
              onClick: _cache[26] || (_cache[26] = ($event) => $options.canvas(4))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "20%", height: "25%", top: $data.canvastop + 12 + "%", left: "59%" }),
              onClick: _cache[27] || (_cache[27] = ($event) => $options.canvas(4))
            },
            null,
            4
            /* STYLE */
          )
        ])) : !$data.opposite ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          style: { "height": "65vh", "width": "100%", "background-color": "#fff", "display": "flex", "justify-content": "center", "align-items": "center" }
        }, [
          vue.createElementVNode(
            "image",
            {
              class: "image",
              src: "/static/humam/woman2.jpg",
              mode: "aspectFit",
              style: { "height": "100%", "width": "100%" },
              onLoad: _cache[28] || (_cache[28] = (...args) => $options.imageLoad && $options.imageLoad(...args))
            },
            null,
            32
            /* HYDRATE_EVENTS */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "15%", height: "12%", top: $data.canvastop + "%" }),
              onClick: _cache[29] || (_cache[29] = ($event) => $options.canvas(0))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "18%", height: "23%", top: $data.canvastop + 12 + "%" }),
              onClick: _cache[30] || (_cache[30] = ($event) => $options.canvas(1))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "10%", height: "30%", top: $data.canvastop + 35 + "%", left: "40%" }),
              onClick: _cache[31] || (_cache[31] = ($event) => $options.canvas(3))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "10%", height: "30%", top: $data.canvastop + 35 + "%", left: "51%" }),
              onClick: _cache[32] || (_cache[32] = ($event) => $options.canvas(3))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "20%", height: "25%", top: $data.canvastop + 12 + "%", left: "21%" }),
              onClick: _cache[33] || (_cache[33] = ($event) => $options.canvas(4))
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "canvas",
            {
              style: vue.normalizeStyle({ position: "absolute", width: "20%", height: "25%", top: $data.canvastop + 12 + "%", left: "59%" }),
              onClick: _cache[34] || (_cache[34] = ($event) => $options.canvas(4))
            },
            null,
            4
            /* STYLE */
          )
        ])) : vue.createCommentVNode("v-if", true)
      ])) : vue.createCommentVNode("v-if", true),
      vue.createVNode(
        _component_uni_popup,
        { ref: "popup" },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "info1" }, [
              vue.createElementVNode("view", { style: { "height": "25%", "padding-left": "5%", "padding-right": "5%", "align-items": "center", "display": "flex", "font-size": "30rpx" } }, [
                vue.createElementVNode("text", { style: { "color": "#bfbfbf", "white-space": "nowrap" } }, "请选择具体部位，可多选"),
                vue.createElementVNode("text", { style: { "color": "#8366c8", "white-space": "nowrap" } }, "*")
              ]),
              $data.form.sex == "男" ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                $data.opposite ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                  $data.clicknum == 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    style: { "display": "flex", "flex-wrap": "wrap", "width": "100 %", "height": "75%", "justify-content": "center" }
                  }, [
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[0] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[35] || (_cache[35] = ($event) => $options.btclick(0))
                        },
                        "头皮",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[1] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[36] || (_cache[36] = ($event) => $options.btclick(1))
                        },
                        "前额",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[2] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[37] || (_cache[37] = ($event) => $options.btclick(2))
                        },
                        "耳朵",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[3] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[38] || (_cache[38] = ($event) => $options.btclick(3))
                        },
                        "眼部",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[4] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[39] || (_cache[39] = ($event) => $options.btclick(4))
                        },
                        "面颊",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[5] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[40] || (_cache[40] = ($event) => $options.btclick(5))
                        },
                        "口部",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[6] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[41] || (_cache[41] = ($event) => $options.btclick(6))
                        },
                        "下巴",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[7] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[42] || (_cache[42] = ($event) => $options.btclick(7))
                        },
                        "颈部",
                        2
                        /* CLASS */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $data.clicknum == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    style: { "display": "flex", "flex-wrap": "wrap", "width": "100 %", "height": "75%", "justify-content": "center" }
                  }, [
                    vue.createElementVNode("view", { style: { "width": "50%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[8] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[43] || (_cache[43] = ($event) => $options.btclick(8))
                        },
                        "胸部",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "50%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[9] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[44] || (_cache[44] = ($event) => $options.btclick(9))
                        },
                        "乳头乳晕",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "50%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[10] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[45] || (_cache[45] = ($event) => $options.btclick(10))
                        },
                        "腹部",
                        2
                        /* CLASS */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $data.clicknum == 3 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 2,
                    style: { "display": "flex", "flex-wrap": "wrap", "width": "100 %", "height": "75%", "justify-content": "center" }
                  }, [
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[11] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[46] || (_cache[46] = ($event) => $options.btclick(11))
                        },
                        "大腿",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[12] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[47] || (_cache[47] = ($event) => $options.btclick(12))
                        },
                        "膝关节",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[13] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[48] || (_cache[48] = ($event) => $options.btclick(13))
                        },
                        "小腿",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[14] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[49] || (_cache[49] = ($event) => $options.btclick(14))
                        },
                        "足踝",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[15] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[50] || (_cache[50] = ($event) => $options.btclick(15))
                        },
                        "脚背",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[16] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[51] || (_cache[51] = ($event) => $options.btclick(16))
                        },
                        "脚趾",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[17] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[52] || (_cache[52] = ($event) => $options.btclick(17))
                        },
                        "脚趾缝",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[18] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[53] || (_cache[53] = ($event) => $options.btclick(18))
                        },
                        "脚趾甲",
                        2
                        /* CLASS */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $data.clicknum == 4 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 3,
                    style: { "display": "flex", "flex-wrap": "wrap", "width": "100 %", "height": "75%", "justify-content": "center" }
                  }, [
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[19] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[54] || (_cache[54] = ($event) => $options.btclick(19))
                        },
                        "腋窝",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[20] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[55] || (_cache[55] = ($event) => $options.btclick(20))
                        },
                        "上臂",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[21] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[56] || (_cache[56] = ($event) => $options.btclick(21))
                        },
                        "肘关节",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[22] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[57] || (_cache[57] = ($event) => $options.btclick(22))
                        },
                        "前臂",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[23] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[58] || (_cache[58] = ($event) => $options.btclick(23))
                        },
                        "手腕",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[24] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[59] || (_cache[59] = ($event) => $options.btclick(24))
                        },
                        "手掌",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[25] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[60] || (_cache[60] = ($event) => $options.btclick(25))
                        },
                        "手指",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[26] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[61] || (_cache[61] = ($event) => $options.btclick(26))
                        },
                        "手指缝",
                        2
                        /* CLASS */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $data.clicknum == 2 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 4,
                    style: { "display": "flex", "flex-wrap": "wrap", "width": "100 %", "height": "75%", "justify-content": "center" }
                  }, [
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[34] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[62] || (_cache[62] = ($event) => $options.btclick(34))
                        },
                        "腹股沟",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[35] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[63] || (_cache[63] = ($event) => $options.btclick(35))
                        },
                        "会阴",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[36] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[64] || (_cache[64] = ($event) => $options.btclick(36))
                        },
                        "肛周",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[37] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[65] || (_cache[65] = ($event) => $options.btclick(37))
                        },
                        "龟头",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[38] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[66] || (_cache[66] = ($event) => $options.btclick(38))
                        },
                        "阴茎",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[39] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[67] || (_cache[67] = ($event) => $options.btclick(39))
                        },
                        "阴囊",
                        2
                        /* CLASS */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true)
                ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                  $data.clicknum == 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    style: { "display": "flex", "flex-wrap": "wrap", "width": "100 %", "height": "75%", "justify-content": "center" }
                  }, [
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[0] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[68] || (_cache[68] = ($event) => $options.btclick(0))
                        },
                        "头皮",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[2] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[69] || (_cache[69] = ($event) => $options.btclick(2))
                        },
                        "耳朵",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[7] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[70] || (_cache[70] = ($event) => $options.btclick(7))
                        },
                        "颈部",
                        2
                        /* CLASS */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $data.clicknum == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    style: { "display": "flex", "flex-wrap": "wrap", "width": "100 %", "height": "75%", "justify-content": "center" }
                  }, [
                    vue.createElementVNode("view", { style: { "width": "50%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[27] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[71] || (_cache[71] = ($event) => $options.btclick(27))
                        },
                        "背部",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "50%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[28] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[72] || (_cache[72] = ($event) => $options.btclick(28))
                        },
                        "臀部",
                        2
                        /* CLASS */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $data.clicknum == 3 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 2,
                    style: { "display": "flex", "flex-wrap": "wrap", "width": "100 %", "height": "75%", "justify-content": "center" }
                  }, [
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[11] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[73] || (_cache[73] = ($event) => $options.btclick(11))
                        },
                        "大腿",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[29] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[74] || (_cache[74] = ($event) => $options.btclick(29))
                        },
                        "腘窝",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[13] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[75] || (_cache[75] = ($event) => $options.btclick(13))
                        },
                        "小腿",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[14] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[76] || (_cache[76] = ($event) => $options.btclick(14))
                        },
                        "足踝",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[30] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[77] || (_cache[77] = ($event) => $options.btclick(30))
                        },
                        "脚后跟",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[31] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[78] || (_cache[78] = ($event) => $options.btclick(31))
                        },
                        "脚底",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[16] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[79] || (_cache[79] = ($event) => $options.btclick(16))
                        },
                        "脚趾",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[17] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[80] || (_cache[80] = ($event) => $options.btclick(17))
                        },
                        "脚趾缝",
                        2
                        /* CLASS */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $data.clicknum == 4 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 3,
                    style: { "display": "flex", "flex-wrap": "wrap", "width": "100 %", "height": "75%", "justify-content": "center" }
                  }, [
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[19] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[81] || (_cache[81] = ($event) => $options.btclick(19))
                        },
                        "腋窝",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[20] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[82] || (_cache[82] = ($event) => $options.btclick(20))
                        },
                        "上臂",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[21] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[83] || (_cache[83] = ($event) => $options.btclick(21))
                        },
                        "肘关节",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[22] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[84] || (_cache[84] = ($event) => $options.btclick(22))
                        },
                        "前臂",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[23] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[85] || (_cache[85] = ($event) => $options.btclick(23))
                        },
                        "手腕",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[32] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[86] || (_cache[86] = ($event) => $options.btclick(32))
                        },
                        "手背",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[25] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[87] || (_cache[87] = ($event) => $options.btclick(25))
                        },
                        "手指",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[26] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[88] || (_cache[88] = ($event) => $options.btclick(26))
                        },
                        "手指缝",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positionx[33] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[89] || (_cache[89] = ($event) => $options.btclick(33))
                        },
                        "手指甲",
                        2
                        /* CLASS */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true)
                ]))
              ])) : vue.createCommentVNode("v-if", true),
              $data.form.sex == "女" ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                $data.opposite ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                  $data.clicknum == 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    style: { "display": "flex", "flex-wrap": "wrap", "width": "100 %", "height": "75%", "justify-content": "center" }
                  }, [
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[0] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[90] || (_cache[90] = ($event) => $options.btclick(0))
                        },
                        "头皮",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[1] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[91] || (_cache[91] = ($event) => $options.btclick(1))
                        },
                        "前额",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[2] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[92] || (_cache[92] = ($event) => $options.btclick(2))
                        },
                        "耳朵",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[3] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[93] || (_cache[93] = ($event) => $options.btclick(3))
                        },
                        "眼部",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[4] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[94] || (_cache[94] = ($event) => $options.btclick(4))
                        },
                        "面颊",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[5] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[95] || (_cache[95] = ($event) => $options.btclick(5))
                        },
                        "口部",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[6] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[96] || (_cache[96] = ($event) => $options.btclick(6))
                        },
                        "下巴",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[7] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[97] || (_cache[97] = ($event) => $options.btclick(7))
                        },
                        "颈部",
                        2
                        /* CLASS */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $data.clicknum == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    style: { "display": "flex", "flex-wrap": "wrap", "width": "100 %", "height": "75%", "justify-content": "center" }
                  }, [
                    vue.createElementVNode("view", { style: { "width": "50%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[8] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[98] || (_cache[98] = ($event) => $options.btclick(8))
                        },
                        "胸部",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "50%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[9] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[99] || (_cache[99] = ($event) => $options.btclick(9))
                        },
                        "乳头乳晕",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "50%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[10] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[100] || (_cache[100] = ($event) => $options.btclick(10))
                        },
                        "腹部",
                        2
                        /* CLASS */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $data.clicknum == 3 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 2,
                    style: { "display": "flex", "flex-wrap": "wrap", "width": "100 %", "height": "75%", "justify-content": "center" }
                  }, [
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[11] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[101] || (_cache[101] = ($event) => $options.btclick(11))
                        },
                        "大腿",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[12] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[102] || (_cache[102] = ($event) => $options.btclick(12))
                        },
                        "膝关节",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[13] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[103] || (_cache[103] = ($event) => $options.btclick(13))
                        },
                        "小腿",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[14] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[104] || (_cache[104] = ($event) => $options.btclick(14))
                        },
                        "足踝",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[15] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[105] || (_cache[105] = ($event) => $options.btclick(15))
                        },
                        "脚背",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[16] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[106] || (_cache[106] = ($event) => $options.btclick(16))
                        },
                        "脚趾",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[17] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[107] || (_cache[107] = ($event) => $options.btclick(17))
                        },
                        "脚趾缝",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[18] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[108] || (_cache[108] = ($event) => $options.btclick(18))
                        },
                        "脚趾甲",
                        2
                        /* CLASS */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $data.clicknum == 4 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 3,
                    style: { "display": "flex", "flex-wrap": "wrap", "width": "100 %", "height": "75%", "justify-content": "center" }
                  }, [
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[19] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[109] || (_cache[109] = ($event) => $options.btclick(19))
                        },
                        "腋窝",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[20] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[110] || (_cache[110] = ($event) => $options.btclick(20))
                        },
                        "上臂",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[21] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[111] || (_cache[111] = ($event) => $options.btclick(21))
                        },
                        "肘关节",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[22] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[112] || (_cache[112] = ($event) => $options.btclick(22))
                        },
                        "前臂",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[23] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[113] || (_cache[113] = ($event) => $options.btclick(23))
                        },
                        "手腕",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[24] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[114] || (_cache[114] = ($event) => $options.btclick(24))
                        },
                        "手掌",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[25] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[115] || (_cache[115] = ($event) => $options.btclick(25))
                        },
                        "手指",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[26] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[116] || (_cache[116] = ($event) => $options.btclick(26))
                        },
                        "手指缝",
                        2
                        /* CLASS */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $data.clicknum == 2 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 4,
                    style: { "display": "flex", "flex-wrap": "wrap", "width": "100 %", "height": "75%", "justify-content": "center" }
                  }, [
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[34] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[117] || (_cache[117] = ($event) => $options.btclick(34))
                        },
                        "腹股沟",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[35] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[118] || (_cache[118] = ($event) => $options.btclick(35))
                        },
                        "会阴",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[36] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[119] || (_cache[119] = ($event) => $options.btclick(36))
                        },
                        "肛周",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[37] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[120] || (_cache[120] = ($event) => $options.btclick(37))
                        },
                        "阴唇",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[38] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[121] || (_cache[121] = ($event) => $options.btclick(38))
                        },
                        "阴蒂",
                        2
                        /* CLASS */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true)
                ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                  $data.clicknum == 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    style: { "display": "flex", "flex-wrap": "wrap", "width": "100 %", "height": "75%", "justify-content": "center" }
                  }, [
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[0] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[122] || (_cache[122] = ($event) => $options.btclick(0))
                        },
                        "头皮",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[2] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[123] || (_cache[123] = ($event) => $options.btclick(2))
                        },
                        "耳朵",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[7] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[124] || (_cache[124] = ($event) => $options.btclick(7))
                        },
                        "颈部",
                        2
                        /* CLASS */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $data.clicknum == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    style: { "display": "flex", "flex-wrap": "wrap", "width": "100 %", "height": "75%", "justify-content": "center" }
                  }, [
                    vue.createElementVNode("view", { style: { "width": "50%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[27] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[125] || (_cache[125] = ($event) => $options.btclick(27))
                        },
                        "背部",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "50%", "height": "20%", "padding-bottom": "5%", "padding-top": "3%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[28] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[126] || (_cache[126] = ($event) => $options.btclick(28))
                        },
                        "臀部",
                        2
                        /* CLASS */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $data.clicknum == 3 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 2,
                    style: { "display": "flex", "flex-wrap": "wrap", "width": "100 %", "height": "75%", "justify-content": "center" }
                  }, [
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[11] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[127] || (_cache[127] = ($event) => $options.btclick(11))
                        },
                        "大腿",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[29] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[128] || (_cache[128] = ($event) => $options.btclick(29))
                        },
                        "腘窝",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[13] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[129] || (_cache[129] = ($event) => $options.btclick(13))
                        },
                        "小腿",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[14] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[130] || (_cache[130] = ($event) => $options.btclick(14))
                        },
                        "足踝",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[30] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[131] || (_cache[131] = ($event) => $options.btclick(30))
                        },
                        "脚后跟",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[31] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[132] || (_cache[132] = ($event) => $options.btclick(31))
                        },
                        "脚底",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[16] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[133] || (_cache[133] = ($event) => $options.btclick(16))
                        },
                        "脚趾",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[17] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[134] || (_cache[134] = ($event) => $options.btclick(17))
                        },
                        "脚趾缝",
                        2
                        /* CLASS */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $data.clicknum == 4 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 3,
                    style: { "display": "flex", "flex-wrap": "wrap", "width": "100 %", "height": "75%", "justify-content": "center" }
                  }, [
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[19] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[135] || (_cache[135] = ($event) => $options.btclick(19))
                        },
                        "腋窝",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[20] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[136] || (_cache[136] = ($event) => $options.btclick(20))
                        },
                        "上臂",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[21] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[137] || (_cache[137] = ($event) => $options.btclick(21))
                        },
                        "肘关节",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[22] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[138] || (_cache[138] = ($event) => $options.btclick(22))
                        },
                        "前臂",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[23] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[139] || (_cache[139] = ($event) => $options.btclick(23))
                        },
                        "手腕",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[32] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[140] || (_cache[140] = ($event) => $options.btclick(32))
                        },
                        "手背",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "33%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[25] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[141] || (_cache[141] = ($event) => $options.btclick(25))
                        },
                        "手指",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[26] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[142] || (_cache[142] = ($event) => $options.btclick(26))
                        },
                        "手指缝",
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", { style: { "width": "40%", "height": "20%", "padding-bottom": "5%" } }, [
                      vue.createElementVNode(
                        "button",
                        {
                          class: vue.normalizeClass($data.positiony[33] == 0 ? "bt0" : "bt1"),
                          onClick: _cache[143] || (_cache[143] = ($event) => $options.btclick(33))
                        },
                        "手指甲",
                        2
                        /* CLASS */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true)
                ]))
              ])) : vue.createCommentVNode("v-if", true)
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createElementVNode("view", { style: { "height": "16vh", "border-top": "2rpx solid #9f9f9f", "background-color": "antiquewhite" } }, [
        vue.createElementVNode("view", { style: { "height": "30%", "background-color": "#fff", "display": "flex", "align-items": "center", "justify-content": "flex-start" } }, [
          vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "flex-start", "align-items": "center", "padding-left": "5%", "padding-right": "5%" } }, [
            vue.createElementVNode("view", { style: { "height": "100%", "display": "flex", "justify-content": "center", "align-items": "center", "padding": "0 2%", "font-size": "30rpx" } }, [
              vue.createElementVNode(
                "text",
                {
                  style: vue.normalizeStyle({ "text-align": "center", "white-space": "nowrap", "color": $data.swc ? "#b2b2b2" : "#8366c8" })
                },
                "正面",
                4
                /* STYLE */
              ),
              vue.createElementVNode(
                "switch",
                {
                  color: "#8366c8",
                  style: { "transform": "scale(0.65)", "align-items": "center", "dispaly": "flex" },
                  onChange: _cache[144] || (_cache[144] = (...args) => $options.switchchange && $options.switchchange(...args))
                },
                null,
                32
                /* HYDRATE_EVENTS */
              ),
              vue.createElementVNode(
                "text",
                {
                  style: vue.normalizeStyle({ "text-align": "center", "white-space": "nowrap", "color": !$data.swc ? "#b2b2b2" : "#8366c8" })
                },
                "背面",
                4
                /* STYLE */
              )
            ])
          ]),
          vue.createElementVNode("view", { style: { "height": "100%", "display": "flex", "margin-left": "auto", "align-items": "center", "justify-content": "flex-end", "padding-right": "5%", "font-size": "30rpx" } }, [
            vue.createElementVNode("checkbox", {
              style: { "transform": "scale(0.8)" },
              checked: $data.isChecked,
              onClick: _cache[145] || (_cache[145] = (...args) => $options.toggleCheckbox && $options.toggleCheckbox(...args)),
              color: "#ffffff",
              "border-color": "#b2b2b2",
              activeBorderColor: "#8366c8",
              activeBackgroundColor: "#8366c8"
            }, null, 8, ["checked"]),
            vue.createElementVNode(
              "text",
              {
                style: vue.normalizeStyle({ color: $data.isChecked ? "#6f6f6f" : "#b2b2b2" })
              },
              "选择全身",
              4
              /* STYLE */
            )
          ])
        ]),
        vue.createElementVNode("view", { style: { "height": "70%", "background-color": "#fff", "display": "flex", "align-items": "center", "justify-content": "center" } }, [
          vue.createElementVNode(
            "button",
            {
              style: vue.normalizeStyle({ width: "80%", color: $data.ischose || $data.isChecked ? "#fff" : "#b2b2b2", "background-color": $data.ischose || $data.isChecked ? "#8366c8" : "#dddddd", "border-radius": "30rpx", "font-size": "28rpx", border: $data.ischose || $data.isChecked ? "1rpx solid #8366c8" : "1rpx solid #dddddd" }),
              "hover-class": "finalbt",
              onClick: _cache[146] || (_cache[146] = (...args) => $options.final && $options.final(...args))
            },
            "查看结果",
            4
            /* STYLE */
          )
        ])
      ]),
      vue.createVNode(
        _component_uni_popup,
        {
          ref: "overtime",
          "is-mask-click": false
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "height": "20vh", "width": "100%", "background-color": "#fff", "border-top-left-radius": "2vh", "border-top-right-radius": "2vh" } }, [
              vue.createElementVNode("view", { style: { "padding-top": "5%", "padding-left": "5%", "display": "flex", "justify-content": "flex-start", "align-items": "center" } }, [
                vue.createElementVNode("image", {
                  src: "/static/fail1.png",
                  style: { "width": "70rpx", "height": "70rpx", "margin-right": "20rpx" }
                }),
                vue.createElementVNode("text", null, "测评时间超过10分钟,提交失败")
              ]),
              vue.createElementVNode("view", { style: { "padding-top": "8%", "padding-left": "5%", "display": "flex", "justify-content": "flex-start", "align-items": "center" } }, [
                vue.createElementVNode("navigator", {
                  style: { "margin-left": "90rpx", "color": "#914DFF" },
                  "open-type": "switchTab",
                  url: "/pages/index/index"
                }, "重新测评")
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      )
    ]);
  }
  const PagesDetectDetect2 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__file", "F:/SkinApp/App01/pages/detect/detect2.vue"]]);
  const _sfc_main$9 = {
    name: "UniCard",
    emits: ["click"],
    props: {
      title: {
        type: String,
        default: ""
      },
      subTitle: {
        type: String,
        default: ""
      },
      padding: {
        type: String,
        default: "10px"
      },
      margin: {
        type: String,
        default: "15px"
      },
      spacing: {
        type: String,
        default: "0 10px"
      },
      extra: {
        type: String,
        default: ""
      },
      cover: {
        type: String,
        default: ""
      },
      thumbnail: {
        type: String,
        default: ""
      },
      isFull: {
        // 内容区域是否通栏
        type: Boolean,
        default: false
      },
      isShadow: {
        // 是否开启阴影
        type: Boolean,
        default: true
      },
      shadow: {
        type: String,
        default: "0px 0px 3px 1px rgba(0, 0, 0, 0.08)"
      },
      border: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      onClick(type) {
        this.$emit("click", type);
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-card", { "uni-card--full": $props.isFull, "uni-card--shadow": $props.isShadow, "uni-card--border": $props.border }]),
        style: vue.normalizeStyle({ "margin": $props.isFull ? 0 : $props.margin, "padding": $props.spacing, "box-shadow": $props.isShadow ? $props.shadow : "" })
      },
      [
        vue.createCommentVNode(" 封面 "),
        vue.renderSlot(_ctx.$slots, "cover", {}, () => [
          $props.cover ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uni-card__cover"
          }, [
            vue.createElementVNode("image", {
              class: "uni-card__cover-image",
              mode: "widthFix",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick("cover")),
              src: $props.cover
            }, null, 8, ["src"])
          ])) : vue.createCommentVNode("v-if", true)
        ], true),
        vue.renderSlot(_ctx.$slots, "title", {}, () => [
          $props.title || $props.extra ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uni-card__header"
          }, [
            vue.createCommentVNode(" 卡片标题 "),
            vue.createElementVNode("view", {
              class: "uni-card__header-box",
              onClick: _cache[1] || (_cache[1] = ($event) => $options.onClick("title"))
            }, [
              $props.thumbnail ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-card__header-avatar"
              }, [
                vue.createElementVNode("image", {
                  class: "uni-card__header-avatar-image",
                  src: $props.thumbnail,
                  mode: "aspectFit"
                }, null, 8, ["src"])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { class: "uni-card__header-content" }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-card__header-content-title uni-ellipsis" },
                  vue.toDisplayString($props.title),
                  1
                  /* TEXT */
                ),
                $props.title && $props.subTitle ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: "uni-card__header-content-subtitle uni-ellipsis"
                  },
                  vue.toDisplayString($props.subTitle),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true)
              ])
            ]),
            vue.createElementVNode("view", {
              class: "uni-card__header-extra",
              onClick: _cache[2] || (_cache[2] = ($event) => $options.onClick("extra"))
            }, [
              vue.createElementVNode(
                "text",
                { class: "uni-card__header-extra-text" },
                vue.toDisplayString($props.extra),
                1
                /* TEXT */
              )
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ], true),
        vue.createCommentVNode(" 卡片内容 "),
        vue.createElementVNode(
          "view",
          {
            class: "uni-card__content",
            style: vue.normalizeStyle({ padding: $props.padding }),
            onClick: _cache[3] || (_cache[3] = ($event) => $options.onClick("content"))
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ],
          4
          /* STYLE */
        ),
        vue.createElementVNode("view", {
          class: "uni-card__actions",
          onClick: _cache[4] || (_cache[4] = ($event) => $options.onClick("actions"))
        }, [
          vue.renderSlot(_ctx.$slots, "actions", {}, void 0, true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-ae4bee67"], ["__file", "F:/SkinApp/App01/uni_modules/uni-card/components/uni-card/uni-card.vue"]]);
  const _sfc_main$8 = {
    name: "uniCollapseItem",
    props: {
      // 列表标题
      title: {
        type: String,
        default: ""
      },
      name: {
        type: [Number, String],
        default: ""
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否显示动画,app 端默认不开启动画，卡顿严重
      showAnimation: {
        type: Boolean,
        default: false
      },
      // 是否展开
      open: {
        type: Boolean,
        default: false
      },
      // 缩略图
      thumb: {
        type: String,
        default: ""
      },
      // 标题分隔线显示类型
      titleBorder: {
        type: String,
        default: "auto"
      },
      border: {
        type: Boolean,
        default: true
      },
      showArrow: {
        type: Boolean,
        default: true
      }
    },
    data() {
      const elId = `Uni_${Math.ceil(Math.random() * 1e6).toString(36)}`;
      return {
        isOpen: false,
        isheight: null,
        height: 0,
        elId,
        nameSync: 0
      };
    },
    watch: {
      open(val) {
        this.isOpen = val;
        this.onClick(val, "init");
      }
    },
    updated(e) {
      this.$nextTick(() => {
        this.init(true);
      });
    },
    created() {
      this.collapse = this.getCollapse();
      this.oldHeight = 0;
      this.onClick(this.open, "init");
    },
    // TODO vue3
    unmounted() {
      this.__isUnmounted = true;
      this.uninstall();
    },
    mounted() {
      if (!this.collapse)
        return;
      if (this.name !== "") {
        this.nameSync = this.name;
      } else {
        this.nameSync = this.collapse.childrens.length + "";
      }
      if (this.collapse.names.indexOf(this.nameSync) === -1) {
        this.collapse.names.push(this.nameSync);
      } else {
        formatAppLog("warn", "at uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.vue:154", `name 值 ${this.nameSync} 重复`);
      }
      if (this.collapse.childrens.indexOf(this) === -1) {
        this.collapse.childrens.push(this);
      }
      this.init();
    },
    methods: {
      init(type) {
        this.getCollapseHeight(type);
      },
      uninstall() {
        if (this.collapse) {
          this.collapse.childrens.forEach((item, index2) => {
            if (item === this) {
              this.collapse.childrens.splice(index2, 1);
            }
          });
          this.collapse.names.forEach((item, index2) => {
            if (item === this.nameSync) {
              this.collapse.names.splice(index2, 1);
            }
          });
        }
      },
      onClick(isOpen, type) {
        if (this.disabled)
          return;
        this.isOpen = isOpen;
        if (this.isOpen && this.collapse) {
          this.collapse.setAccordion(this);
        }
        if (type !== "init") {
          this.collapse.onChange(isOpen, this);
        }
      },
      getCollapseHeight(type, index2 = 0) {
        const views = uni.createSelectorQuery().in(this);
        views.select(`#${this.elId}`).fields({
          size: true
        }, (data) => {
          if (index2 >= 10)
            return;
          if (!data) {
            index2++;
            this.getCollapseHeight(false, index2);
            return;
          }
          this.height = data.height;
          this.isheight = true;
          if (type)
            return;
          this.onClick(this.isOpen, "init");
        }).exec();
      },
      getNvueHwight(type) {
        dom.getComponentRect(this.$refs["collapse--hook"], (option) => {
          if (option && option.result && option.size) {
            this.height = option.size.height;
            this.isheight = true;
            if (type)
              return;
            this.onClick(this.open, "init");
          }
        });
      },
      /**
       * 获取父元素实例
       */
      getCollapse(name = "uniCollapse") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_2);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-collapse-item" }, [
      vue.createCommentVNode(" onClick(!isOpen) "),
      vue.createElementVNode(
        "view",
        {
          onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick(!$data.isOpen)),
          class: vue.normalizeClass(["uni-collapse-item__title", { "is-open": $data.isOpen && $props.titleBorder === "auto", "uni-collapse-item-border": $props.titleBorder !== "none" }])
        },
        [
          vue.createElementVNode("view", { class: "uni-collapse-item__title-wrap" }, [
            vue.renderSlot(_ctx.$slots, "title", {}, () => [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["uni-collapse-item__title-box", { "is-disabled": $props.disabled }])
                },
                [
                  $props.thumb ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 0,
                    src: $props.thumb,
                    class: "uni-collapse-item__title-img"
                  }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode(
                    "text",
                    { class: "uni-collapse-item__title-text" },
                    vue.toDisplayString($props.title),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              )
            ], true)
          ]),
          $props.showArrow ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: vue.normalizeClass([{ "uni-collapse-item__title-arrow-active": $data.isOpen, "uni-collapse-item--animation": $props.showAnimation === true }, "uni-collapse-item__title-arrow"])
            },
            [
              vue.createVNode(_component_uni_icons, {
                color: $props.disabled ? "#ddd" : "#bbb",
                size: "14",
                type: "bottom"
              }, null, 8, ["color"])
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      ),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["uni-collapse-item__wrap", { "is--transition": $props.showAnimation }]),
          style: vue.normalizeStyle({ height: ($data.isOpen ? $data.height : 0) + "px" })
        },
        [
          vue.createElementVNode("view", {
            id: $data.elId,
            ref: "collapse--hook",
            class: vue.normalizeClass(["uni-collapse-item__wrap-content", { open: $data.isheight, "uni-collapse-item--border": $props.border && $data.isOpen }])
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 10, ["id"])
        ],
        6
        /* CLASS, STYLE */
      )
    ]);
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-3d2dde9f"], ["__file", "F:/SkinApp/App01/uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.vue"]]);
  const _sfc_main$7 = {
    name: "uniCollapse",
    emits: ["change", "activeItem", "input", "update:modelValue"],
    props: {
      value: {
        type: [String, Array],
        default: ""
      },
      modelValue: {
        type: [String, Array],
        default: ""
      },
      accordion: {
        // 是否开启手风琴效果
        type: [Boolean, String],
        default: false
      }
    },
    data() {
      return {};
    },
    computed: {
      // TODO 兼容 vue2 和 vue3
      dataValue() {
        let value = typeof this.value === "string" && this.value === "" || Array.isArray(this.value) && this.value.length === 0;
        let modelValue = typeof this.modelValue === "string" && this.modelValue === "" || Array.isArray(this.modelValue) && this.modelValue.length === 0;
        if (value) {
          return this.modelValue;
        }
        if (modelValue) {
          return this.value;
        }
        return this.value;
      }
    },
    watch: {
      dataValue(val) {
        this.setOpen(val);
      }
    },
    created() {
      this.childrens = [];
      this.names = [];
    },
    mounted() {
      this.$nextTick(() => {
        this.setOpen(this.dataValue);
      });
    },
    methods: {
      setOpen(val) {
        let str = typeof val === "string";
        let arr = Array.isArray(val);
        this.childrens.forEach((vm, index2) => {
          if (str) {
            if (val === vm.nameSync) {
              if (!this.accordion) {
                formatAppLog("warn", "at uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue:75", "accordion 属性为 false ,v-model 类型应该为 array");
                return;
              }
              vm.isOpen = true;
            }
          }
          if (arr) {
            val.forEach((v) => {
              if (v === vm.nameSync) {
                if (this.accordion) {
                  formatAppLog("warn", "at uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue:85", "accordion 属性为 true ,v-model 类型应该为 string");
                  return;
                }
                vm.isOpen = true;
              }
            });
          }
        });
        this.emit(val);
      },
      setAccordion(self) {
        if (!this.accordion)
          return;
        this.childrens.forEach((vm, index2) => {
          if (self !== vm) {
            vm.isOpen = false;
          }
        });
      },
      resize() {
        this.childrens.forEach((vm, index2) => {
          vm.getCollapseHeight();
        });
      },
      onChange(isOpen, self) {
        let activeItem = [];
        if (this.accordion) {
          activeItem = isOpen ? self.nameSync : "";
        } else {
          this.childrens.forEach((vm, index2) => {
            if (vm.isOpen) {
              activeItem.push(vm.nameSync);
            }
          });
        }
        this.$emit("change", activeItem);
        this.emit(activeItem);
      },
      emit(val) {
        this.$emit("input", val);
        this.$emit("update:modelValue", val);
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-collapse" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]);
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-3f050360"], ["__file", "F:/SkinApp/App01/uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue"]]);
  function dataUrlToBase64(str) {
    var array = str.split(",");
    return array[array.length - 1];
  }
  var index$1 = 0;
  function getNewFileId() {
    return Date.now() + String(index$1++);
  }
  function biggerThan(v1, v2) {
    var v1Array = v1.split(".");
    var v2Array = v2.split(".");
    var update = false;
    for (var index2 = 0; index2 < v2Array.length; index2++) {
      var diff = v1Array[index2] - v2Array[index2];
      if (diff !== 0) {
        update = diff > 0;
        break;
      }
    }
    return update;
  }
  function base64ToPath(base64) {
    return new Promise(function(resolve, reject) {
      if (typeof window === "object" && "document" in window) {
        base64 = base64.split(",");
        var type = base64[0].match(/:(.*?);/)[1];
        var str = atob(base64[1]);
        var n = str.length;
        var array = new Uint8Array(n);
        while (n--) {
          array[n] = str.charCodeAt(n);
        }
        return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], { type })));
      }
      var extName = base64.split(",")[0].match(/data\:\S+\/(\S+);/);
      if (extName) {
        extName = extName[1];
      } else {
        reject(new Error("base64 error"));
      }
      var fileName = getNewFileId() + "." + extName;
      if (typeof plus === "object") {
        var basePath = "_doc";
        var dirPath = "uniapp_temp";
        var filePath = basePath + "/" + dirPath + "/" + fileName;
        if (!biggerThan(plus.os.name === "Android" ? "1.9.9.80627" : "1.9.9.80472", plus.runtime.innerVersion)) {
          plus.io.resolveLocalFileSystemURL(basePath, function(entry) {
            entry.getDirectory(dirPath, {
              create: true,
              exclusive: false
            }, function(entry2) {
              entry2.getFile(fileName, {
                create: true,
                exclusive: false
              }, function(entry3) {
                entry3.createWriter(function(writer) {
                  writer.onwrite = function() {
                    resolve(filePath);
                  };
                  writer.onerror = reject;
                  writer.seek(0);
                  writer.writeAsBinary(dataUrlToBase64(base64));
                }, reject);
              }, reject);
            }, reject);
          }, reject);
          return;
        }
        var bitmap = new plus.nativeObj.Bitmap(fileName);
        bitmap.loadBase64Data(base64, function() {
          bitmap.save(filePath, {}, function() {
            bitmap.clear();
            resolve(filePath);
          }, function(error) {
            bitmap.clear();
            reject(error);
          });
        }, function(error) {
          bitmap.clear();
          reject(error);
        });
        return;
      }
      if (typeof wx === "object" && wx.canIUse("getFileSystemManager")) {
        var filePath = wx.env.USER_DATA_PATH + "/" + fileName;
        wx.getFileSystemManager().writeFile({
          filePath,
          data: dataUrlToBase64(base64),
          encoding: "base64",
          success: function() {
            resolve(filePath);
          },
          fail: function(error) {
            reject(error);
          }
        });
        return;
      }
      reject(new Error("not support"));
    });
  }
  const _sfc_main$6 = {
    data() {
      return {
        form: {
          info_id: 0,
          username: "默认用户",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          sex: "",
          age: "",
          position: [],
          date: "",
          results: [],
          imageUrl: "../../static/user.jpg"
        },
        test: [0, 0, 0],
        // Wed, 03 Jan 2024 00:00:00 GMT
        imgsize: 0,
        imagesize: 0,
        Chinesemedicne: true,
        text: "1.卧床休息，抬高患肢。2.新霉素溶液、硼酸水或者生理盐水进行清洗或者湿敷。3.莫匹罗星软膏。4.手术治疗。",
        time1: null,
        canvasw: 0,
        canvash: 0
      };
    },
    onLoad: function(option) {
      const form = JSON.parse(option.form);
      this.form.info_id = form.info_id;
      this.form.username = form.username;
      this.form.sex = form.sex;
      this.form.age = form.age;
      this.form.x = form.x;
      this.form.y = form.y;
      this.form.w = form.w;
      this.form.h = form.h;
      this.form.imageUrl = form.imageUrl;
      this.form.position = form.position;
      uni.showLoading({
        mask: true
      });
      var that = this;
      const userData = uni.getStorageSync("user");
      uni.request({
        url: this.$BASE_URL + "/skindataest",
        header: { Authorization: "Bearer " + userData.access_token },
        method: "POST",
        data: this.form,
        success: (res) => {
          const data = res.data;
          if (data.code == "401") {
            uni.hideLoading();
            uni.showToast({
              icon: "none",
              title: data.msg
            });
          } else if (data.code == "200") {
            for (let i = 0; i < data.data.length; i++) {
              data.data[i].sicknessurl = "data:image/jpeg;base64," + data.data[i].sicknessurl;
              data.data[i].Wtreatment = that.formatText(data.data[i].Wtreatment);
              data.data[i].Ctreatment = that.formatText(data.data[i].Ctreatment);
            }
            that.test = data.data;
            that.form.date = that.formatDate(data.data[0].date);
            uni.hideLoading();
          } else {
            uni.hideLoading();
            uni.showToast({
              icon: "none",
              title: data.msg
            });
          }
        },
        fail: (err) => {
          uni.hideLoading();
          if (err.statusCode === 404) {
            uni.showToast({
              icon: "none",
              title: "请求失败，找不到资源"
            });
          } else if (err.statusCode === 500) {
            uni.showToast({
              icon: "none",
              title: "服务器内部错误，请稍后重试"
            });
          } else {
            uni.showToast({
              icon: "none",
              title: "请求失败，请稍后重试"
            });
          }
        }
      });
    },
    onShow() {
      this.$device(function(result) {
        if (result == 2) {
          uni.showToast({
            icon: "error",
            title: "账号在异地登录",
            mask: true
          });
          setTimeout(() => {
            uni.reLaunch({
              url: "/pages/index/index"
            });
          }, 1e3);
        } else if (result == 4) {
          setTimeout(() => {
            uni.reLaunch({
              url: "/pages/index/index"
            });
          }, 1e3);
        } else {
          let user1 = uni.getStorageSync("user");
          if (!user1) {
            uni.showToast({
              icon: "none",
              title: "未登录",
              "mask": true
            });
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/index/index"
              });
            }, 1e3);
          }
        }
      });
      this.time1 = setInterval(() => {
        this.$device(function(result) {
          if (result == 2) {
            uni.showToast({
              icon: "error",
              title: "账号在异地登录",
              mask: true
            });
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/index/index"
              });
            }, 1e3);
          } else if (result == 4) {
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/index/index"
              });
            }, 1e3);
          } else {
            let user1 = uni.getStorageSync("user");
            if (!user1) {
              uni.showToast({
                icon: "none",
                title: "未登录",
                "mask": true
              });
              setTimeout(() => {
                uni.reLaunch({
                  url: "/pages/index/index"
                });
              }, 1e3);
            }
          }
        });
      }, 36e5);
    },
    onHide() {
      clearInterval(this.time1);
      this.time1 = null;
    },
    onReady() {
      var that = this;
      const query0 = uni.createSelectorQuery().in(this);
      query0.select(".images").boundingClientRect((data0) => {
        that.imagesize = data0.height;
      }).exec();
      const query1 = uni.createSelectorQuery().in(this);
      query1.select(".img").boundingClientRect((data1) => {
        that.imgsize = data1.height;
      }).exec();
    },
    methods: {
      // saveimage(){
      // 	/* 获取节点信息的对象 */
      // 	var that = this;
      //     const query = uni.createSelectorQuery().in(this);
      //     query
      // 	  .select(".saveimage")
      // 	  .boundingClientRect(res => {
      // 	    that.canvasw = res.width;
      // 	    that.canvash = res.height;
      // 	    __f__('log','at pages/detect/detect3.vue:405',res.height); // 102.85714721679688
      // 	    __f__('log','at pages/detect/detect3.vue:406',res.width); // 102.85714721679688
      // 	  })
      // 	  .exec();
      // 	__f__('log','at pages/detect/detect3.vue:409','完成');
      // },
      formatText(text) {
        const newText = text.replace(/。(\d)/g, "。\n$1");
        return newText;
      },
      clickImg() {
        var that = this;
        if (this.form.imageUrl != "../../static/user.jpg") {
          uni.showLoading({
            mask: true
          });
          base64ToPath(this.form.imageUrl).then((path) => {
            var imsArray = "";
            uni.hideLoading();
            imsArray = path;
            uni.previewImage({
              urls: [imsArray],
              current: 0
            });
          }).catch((error) => {
            uni.hideLoading();
            uni.previewImage({
              urls: [that.form.imageUrl]
            });
          });
        } else {
          uni.previewImage({
            urls: [that.form.imageUrl]
          });
        }
      },
      exit() {
        uni.reLaunch({
          url: "/pages/index/index"
        });
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}/${month}/${day}`;
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_2);
    const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_0);
    const _component_uni_collapse_item = resolveEasycom(vue.resolveDynamicComponent("uni-collapse-item"), __easycom_1$1);
    const _component_uni_collapse = resolveEasycom(vue.resolveDynamicComponent("uni-collapse"), __easycom_3);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { style: { "height": "30px", "background-color": "#fff" } }),
      vue.createElementVNode("view", { style: { "height": "44px", "background-color": "#fff", "width": "100vw", "display": "flex", "flex-direction": "row", "justify-content": "center", "align-items": "center" } }, [
        vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "flex-start", "align-items": "center", "padding-left": "3%", "width": "25%" } }, [
          vue.createVNode(_component_uni_icons, {
            type: "closeempty",
            size: "32",
            color: "#000",
            style: { "padding-right": "1%" },
            onClick: $options.exit
          }, null, 8, ["onClick"]),
          vue.createElementVNode("text", {
            style: { "color": "#000", "font-size": "16px", "white-space": "nowrap" },
            onClick: _cache[0] || (_cache[0] = (...args) => $options.exit && $options.exit(...args))
          }, "退出")
        ]),
        vue.createElementVNode("view", { style: { "flex": "1", "display": "flex", "justify-content": "center" } }, [
          vue.createElementVNode("text", { style: { "color": "#000", "white-space": "nowrap", "font-size": "20px" } }, "结果与建议")
        ]),
        vue.createElementVNode("view", { style: { "display": "flex", "padding-right": "3%", "width": "25%" } })
      ]),
      vue.createCommentVNode(` <canvas  canvas-id="Canvas" :style="{width: canvasw +'px',height: canvash + 'px',position:'absolute' }" ></canvas> `),
      vue.createElementVNode("view", { class: "saveimage" }, [
        vue.createElementVNode("view", { style: { "background-color": "#8366c8", "padding-top": "1%", "padding-bottom": "5%", "width": "100vw" } }, [
          vue.createCommentVNode(' <view style="display: flex; justify-content: flex-end; align-items: center;">\r\n				<uni-icons type="download" size="28" color="#fff" @click="saveimage()"></uni-icons>\r\n				<text style="margin-right: 5%; color: #fff; font-size: 18px; margin-left: 2%;" @click="saveimage()">生成长图</text>\r\n				\r\n			</view> '),
          vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "center", "align-items": "center" } }, [
            vue.createVNode(_component_uni_card, {
              "is-full": true,
              style: { "white-space": "nowrap", "text-overflow": "ellipsis", "margin-top": "3%", "margin-left": "5%", "margin-right": "5%", "border-radius": "30rpx" }
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  class: "img",
                  style: { "height": "8vh", "display": "flex", "justify-content": "flex-start", "align-items": "center" }
                }, [
                  vue.createElementVNode(
                    "view",
                    {
                      style: vue.normalizeStyle({ height: $data.imgsize + "px", width: $data.imgsize + "px", "border-radius": $data.imgsize + "px", overflow: "hidden" })
                    },
                    [
                      vue.createElementVNode("image", {
                        src: $data.form.imageUrl,
                        mode: "aspectFill",
                        style: { "width": "100%", "height": "100%" },
                        onClick: _cache[1] || (_cache[1] = (...args) => $options.clickImg && $options.clickImg(...args))
                      }, null, 8, ["src"])
                    ],
                    4
                    /* STYLE */
                  ),
                  vue.createElementVNode("view", { style: { "flex": "1", "display": "flex", "justify-content": "center", "align-items": "center", "white-space": "nowrap", "overflow": "hidden", "text-overflow": "ellipsis" } }, [
                    vue.createElementVNode(
                      "text",
                      { style: { "font-size": "20px", "color": "#000", "white-space": "nowrap", "overflow": "hidden", "text-overflow": "ellipsis" } },
                      vue.toDisplayString($data.form.username),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                vue.createElementVNode("view", { style: { "white-space": "nowrap", "text-overflow": "ellipsis", "width": "100%", "display": "flex", "align-items": "center", "justify-content": "flex-start", "padding-top": "2%", "margin-top": "2%", "border-top": "2rpx solid #b2b2b2" } }, [
                  vue.createElementVNode("view", { style: { "white-space": "nowrap", "text-overflow": "ellipsis" } }, [
                    vue.createElementVNode(
                      "text",
                      { style: { "color": "#b0adbd", "font-size": "30rpx" } },
                      "日期:" + vue.toDisplayString($options.formatDate($data.form.date)),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "as0" }, [
                    vue.createElementVNode(
                      "view",
                      { class: "half-width0" },
                      vue.toDisplayString($data.form.age),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "separator0" }, "|"),
                    vue.createElementVNode(
                      "view",
                      { class: "half-width0" },
                      vue.toDisplayString($data.form.sex),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ]),
              _: 1
              /* STABLE */
            })
          ])
        ]),
        vue.createElementVNode("view", { style: { "overflow": "auto", "height": "55vh" } }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.test, (item, index2) => {
              return vue.openBlock(), vue.createElementBlock("view", { key: index2 }, [
                vue.createElementVNode("view", { style: { "padding-top": "3%", "padding-bottom": "3%", "background-color": "#ECEFF1", "display": "flex", "justify-content": "center" } }, [
                  vue.createVNode(
                    _component_uni_card,
                    {
                      "is-full": true,
                      style: { "white-space": "nowrap", "text-overflow": "ellipsis", "margin-left": "5%", "margin-right": "5%", "border-radius": "30rpx" }
                    },
                    {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { style: { "white-space": "nowrap", "display": "flex", "justify-content": "center", "align-items": "center", "text-overflow": "ellipsis", "margin-bottom": "2%", "padding-bottom": "2%", "border-bottom": "2rpx solid #b2b2b2" } }, [
                          item.isChinesemedicine == 0 ? (vue.openBlock(), vue.createElementBlock("text", {
                            key: 0,
                            style: { "font-size": "16px", "color": "#b2b2b2", "white-space": "nowrap", "text-overflow": "ellipsis", "overflow": "hidden" }
                          }, "西医：")) : vue.createCommentVNode("v-if", true),
                          item.isChinesemedicine == 0 ? (vue.openBlock(), vue.createElementBlock(
                            "text",
                            {
                              key: 1,
                              style: { "font-size": "20px", "color": "#000", "white-space": "nowrap", "text-overflow": "ellipsis", "overflow": "hidden" }
                            },
                            vue.toDisplayString(item.Wsicknessname),
                            1
                            /* TEXT */
                          )) : vue.createCommentVNode("v-if", true),
                          item.isChinesemedicine == 1 ? (vue.openBlock(), vue.createElementBlock("text", {
                            key: 2,
                            style: { "font-size": "16px", "color": "#b2b2b2", "white-space": "nowrap", "text-overflow": "ellipsis", "overflow": "hidden" }
                          }, "西医：")) : vue.createCommentVNode("v-if", true),
                          item.isChinesemedicine == 1 ? (vue.openBlock(), vue.createElementBlock(
                            "text",
                            {
                              key: 3,
                              style: { "font-size": "20px", "color": "#000", "white-space": "nowrap", "text-overflow": "ellipsis", "overflow": "hidden" }
                            },
                            vue.toDisplayString(item.Wsicknessname),
                            1
                            /* TEXT */
                          )) : vue.createCommentVNode("v-if", true),
                          item.isChinesemedicine == 1 ? (vue.openBlock(), vue.createElementBlock("text", {
                            key: 4,
                            style: { "margin-left": "auto", "font-size": "16px", "color": "#b2b2b2", "white-space": "nowrap", "text-overflow": "ellipsis", "overflow": "hidden" }
                          }, "中医：")) : vue.createCommentVNode("v-if", true),
                          item.isChinesemedicine == 1 ? (vue.openBlock(), vue.createElementBlock(
                            "text",
                            {
                              key: 5,
                              style: { "font-size": "20px", "color": "#000", "white-space": "nowrap", "text-overflow": "ellipsis", "overflow": "hidden" }
                            },
                            vue.toDisplayString(item.Csicknessname),
                            1
                            /* TEXT */
                          )) : vue.createCommentVNode("v-if", true)
                        ]),
                        vue.createElementVNode("view", {
                          class: "images",
                          style: { "height": "6vh", "display": "flex", "justify-content": "flex-start", "align-items": "center" }
                        }, [
                          vue.createElementVNode(
                            "view",
                            {
                              style: vue.normalizeStyle({ height: $data.imagesize + "px", width: $data.imagesize + "px", "border-radius": $data.imagesize + "px", overflow: "hidden", "margin-right": "2%" })
                            },
                            [
                              vue.createElementVNode("image", {
                                src: item.sicknessurl,
                                mode: "aspectFill",
                                style: { "width": "100%", "height": "100%" }
                              }, null, 8, ["src"])
                            ],
                            4
                            /* STYLE */
                          ),
                          $data.test[0] != 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 0,
                            style: { "flex": "1" }
                          }, [
                            vue.createElementVNode("progress", {
                              percent: item.probability,
                              "stroke-width": "8",
                              style: { "overflow": "hidden", "border-radius": "30rpx" },
                              activeColor: "#857BE8"
                            }, null, 8, ["percent"])
                          ])) : vue.createCommentVNode("v-if", true)
                        ]),
                        vue.createElementVNode("view", null, [
                          $data.test[0] != 0 ? (vue.openBlock(), vue.createBlock(
                            _component_uni_collapse,
                            { key: 0 },
                            {
                              default: vue.withCtx(() => [
                                vue.createElementVNode("view", null, [
                                  vue.createVNode(
                                    _component_uni_collapse_item,
                                    {
                                      thumb: "../../static/cw/fire.png",
                                      title: "就医紧急度"
                                    },
                                    {
                                      default: vue.withCtx(() => [
                                        vue.createElementVNode("view", { style: { "padding": "0 20px", "word-break": "break-all", "font-size": "15px" } }, [
                                          vue.createElementVNode(
                                            "text",
                                            null,
                                            vue.toDisplayString(item.urgency),
                                            1
                                            /* TEXT */
                                          )
                                        ])
                                      ]),
                                      _: 2
                                      /* DYNAMIC */
                                    },
                                    1024
                                    /* DYNAMIC_SLOTS */
                                  )
                                ]),
                                vue.createElementVNode("view", null, [
                                  vue.createVNode(_component_uni_collapse_item, {
                                    thumb: "../../static/cw/W.png",
                                    "title-border": item.isChinesemedicine == 1 ? "auto" : "none",
                                    title: "西医"
                                  }, {
                                    default: vue.withCtx(() => [
                                      vue.createElementVNode("view", { style: { "padding": "0 15px", "display": "flex", "justify-content": "flex-start" } }, [
                                        vue.createElementVNode("view", { style: { "margin": "0 1%" } }, [
                                          vue.createVNode(_component_uni_icons, {
                                            type: "calendar-filled",
                                            size: "24",
                                            color: "#bcbcbc"
                                          })
                                        ]),
                                        vue.createElementVNode("view", { style: { "flex": "1", "padding": "0 5px" } }, [
                                          vue.createElementVNode("view", { style: { "word-break": "keep-all", "overflow": "hidden" } }, [
                                            vue.createElementVNode("text", { style: { "color": "#a2a2a2" } }, "典型症状")
                                          ]),
                                          vue.createElementVNode("view", { style: { "word-break": "break-all", "font-size": "15px" } }, [
                                            vue.createElementVNode(
                                              "text",
                                              null,
                                              vue.toDisplayString(item.Wsymptoms),
                                              1
                                              /* TEXT */
                                            )
                                          ])
                                        ])
                                      ]),
                                      vue.createElementVNode("view", { style: { "padding": "0 15px", "display": "flex", "justify-content": "flex-start" } }, [
                                        vue.createElementVNode("view", { style: { "margin": "0 1%" } }, [
                                          vue.createVNode(_component_uni_icons, {
                                            type: "info-filled",
                                            size: "24",
                                            color: "#bcbcbc"
                                          })
                                        ]),
                                        vue.createElementVNode("view", { style: { "flex": "1", "padding": "0 5px" } }, [
                                          vue.createElementVNode("view", { style: { "word-break": "keep-all", "overflow": "hidden" } }, [
                                            vue.createElementVNode("text", { style: { "color": "#a2a2a2" } }, "可能病因")
                                          ]),
                                          vue.createElementVNode("view", { style: { "word-break": "break-all", "font-size": "15px" } }, [
                                            vue.createElementVNode(
                                              "text",
                                              null,
                                              vue.toDisplayString(item.Wcause),
                                              1
                                              /* TEXT */
                                            )
                                          ])
                                        ])
                                      ]),
                                      vue.createElementVNode("view", { style: { "padding": "0 15px", "display": "flex", "justify-content": "flex-start" } }, [
                                        vue.createElementVNode("view", { style: { "margin": "0 1%" } }, [
                                          vue.createVNode(_component_uni_icons, {
                                            type: "plusempty",
                                            size: "24",
                                            color: "#bcbcbc"
                                          })
                                        ]),
                                        vue.createElementVNode("view", { style: { "flex": "1", "padding": "0 5px" } }, [
                                          vue.createElementVNode("view", { style: { "word-break": "keep-all", "overflow": "hidden" } }, [
                                            vue.createElementVNode("text", { style: { "color": "#a2a2a2" } }, "治疗方法")
                                          ]),
                                          vue.createElementVNode("view", { style: { "white-space": "normal", "font-size": "15px" } }, [
                                            vue.createElementVNode(
                                              "text",
                                              null,
                                              vue.toDisplayString(item.Wtreatment),
                                              1
                                              /* TEXT */
                                            )
                                          ])
                                        ])
                                      ])
                                    ]),
                                    _: 2
                                    /* DYNAMIC */
                                  }, 1032, ["title-border"])
                                ]),
                                item.isChinesemedicine == 1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                                  vue.createVNode(
                                    _component_uni_collapse_item,
                                    {
                                      thumb: "../../static/cw/C.png",
                                      "title-border": "none",
                                      title: "中医"
                                    },
                                    {
                                      default: vue.withCtx(() => [
                                        vue.createElementVNode("view", { style: { "padding": "0 15px", "display": "flex", "justify-content": "flex-start" } }, [
                                          vue.createElementVNode("view", { style: { "margin": "0 1%" } }, [
                                            vue.createVNode(_component_uni_icons, {
                                              type: "calendar-filled",
                                              size: "24",
                                              color: "#bcbcbc"
                                            })
                                          ]),
                                          vue.createElementVNode("view", { style: { "flex": "1", "padding": "0 5px" } }, [
                                            vue.createElementVNode("view", { style: { "word-break": "keep-all", "overflow": "hidden" } }, [
                                              vue.createElementVNode("text", { style: { "color": "#a2a2a2" } }, "典型症状")
                                            ]),
                                            vue.createElementVNode("view", { style: { "word-break": "break-all", "font-size": "15px" } }, [
                                              vue.createElementVNode(
                                                "text",
                                                null,
                                                vue.toDisplayString(item.Csymptoms),
                                                1
                                                /* TEXT */
                                              )
                                            ])
                                          ])
                                        ]),
                                        vue.createElementVNode("view", { style: { "padding": "0 15px", "display": "flex", "justify-content": "flex-start" } }, [
                                          vue.createElementVNode("view", { style: { "margin": "0 1%" } }, [
                                            vue.createVNode(_component_uni_icons, {
                                              type: "info-filled",
                                              size: "24",
                                              color: "#bcbcbc"
                                            })
                                          ]),
                                          vue.createElementVNode("view", { style: { "flex": "1", "padding": "0 5px" } }, [
                                            vue.createElementVNode("view", { style: { "word-break": "keep-all", "overflow": "hidden" } }, [
                                              vue.createElementVNode("text", { style: { "color": "#a2a2a2" } }, "可能病因")
                                            ]),
                                            vue.createElementVNode("view", { style: { "white-space": "normal", "font-size": "15px" } }, [
                                              vue.createElementVNode(
                                                "text",
                                                null,
                                                vue.toDisplayString(item.Ccause),
                                                1
                                                /* TEXT */
                                              )
                                            ])
                                          ])
                                        ]),
                                        vue.createElementVNode("view", { style: { "padding": "0 15px", "display": "flex", "justify-content": "flex-start" } }, [
                                          vue.createElementVNode("view", { style: { "margin": "0 1%" } }, [
                                            vue.createVNode(_component_uni_icons, {
                                              type: "plusempty",
                                              size: "24",
                                              color: "#bcbcbc"
                                            })
                                          ]),
                                          vue.createElementVNode("view", { style: { "flex": "1", "padding": "0 5px" } }, [
                                            vue.createElementVNode("view", { style: { "word-break": "keep-all", "overflow": "hidden" } }, [
                                              vue.createElementVNode("text", { style: { "color": "#a2a2a2" } }, "治疗方法")
                                            ]),
                                            vue.createElementVNode("view", { style: { "white-space": "normal", "font-size": "15px" } }, [
                                              vue.createElementVNode(
                                                "text",
                                                null,
                                                vue.toDisplayString(item.Ctreatment),
                                                1
                                                /* TEXT */
                                              )
                                            ])
                                          ])
                                        ])
                                      ]),
                                      _: 2
                                      /* DYNAMIC */
                                    },
                                    1024
                                    /* DYNAMIC_SLOTS */
                                  )
                                ])) : vue.createCommentVNode("v-if", true)
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          )) : vue.createCommentVNode("v-if", true)
                        ])
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  )
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", { style: { "word-wrap": "break-word", "padding": "1% 5vw", "background-color": "#ECEFF1" } }, [
          vue.createElementVNode("view", { style: { "background-color": "#ECEFF1", "display": "flex", "justify-content": "flex-start", "align-items": "center" } }, [
            vue.createElementVNode("image", {
              style: { "height": "36px", "width": "36px" },
              src: "/static/cw/icon.png",
              mode: "aspectFit"
            }),
            vue.createElementVNode("text", { style: { "padding-left": "2%", "color": "#000", "font-size": "16px", "font-weight": "bold" } }, "SkinCloud")
          ]),
          vue.createElementVNode("text", { style: { "font-size": "14px", "color": "#b2b2b2" } }, "*注:本结果不代表临床诊断，如有紧急情况请及时就医\\n"),
          vue.createElementVNode("text", { style: { "font-size": "14px", "color": "#b2b2b2" } }, "*尊重用户的隐私，皮肤云保护用户历史数据")
        ])
      ])
    ]);
  }
  const PagesDetectDetect3 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__file", "F:/SkinApp/App01/pages/detect/detect3.vue"]]);
  const _sfc_main$5 = {
    name: "UniDrawer",
    components: {},
    emits: ["change"],
    props: {
      /**
       * 显示模式（左、右），只在初始化生效
       */
      mode: {
        type: String,
        default: ""
      },
      /**
       * 蒙层显示状态
       */
      mask: {
        type: Boolean,
        default: true
      },
      /**
       * 遮罩是否可点击关闭
       */
      maskClick: {
        type: Boolean,
        default: true
      },
      /**
       * 抽屉宽度
       */
      width: {
        type: Number,
        default: 220
      }
    },
    data() {
      return {
        visibleSync: false,
        showDrawer: false,
        rightMode: false,
        watchTimer: null,
        drawerWidth: 220
      };
    },
    created() {
      this.drawerWidth = this.width;
      this.rightMode = this.mode === "right";
    },
    methods: {
      clear() {
      },
      close(type) {
        if (type === "mask" && !this.maskClick || !this.visibleSync)
          return;
        this._change("showDrawer", "visibleSync", false);
      },
      open() {
        if (this.visibleSync)
          return;
        this._change("visibleSync", "showDrawer", true);
      },
      _change(param1, param2, status) {
        this[param1] = status;
        if (this.watchTimer) {
          clearTimeout(this.watchTimer);
        }
        this.watchTimer = setTimeout(() => {
          this[param2] = status;
          this.$emit("change", status);
        }, status ? 50 : 300);
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.visibleSync ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass([{ "uni-drawer--visible": $data.showDrawer }, "uni-drawer"]),
        onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers((...args) => $options.clear && $options.clear(...args), ["stop", "prevent"]))
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-drawer__mask", { "uni-drawer__mask--visible": $data.showDrawer && $props.mask }]),
            onClick: _cache[0] || (_cache[0] = ($event) => $options.close("mask"))
          },
          null,
          2
          /* CLASS */
        ),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-drawer__content", { "uni-drawer--right": $data.rightMode, "uni-drawer--left": !$data.rightMode, "uni-drawer__content--visible": $data.showDrawer }]),
            style: vue.normalizeStyle({ width: $data.drawerWidth + "px" })
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      34
      /* CLASS, HYDRATE_EVENTS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-f7c32d22"], ["__file", "F:/SkinApp/App01/uni_modules/uni-drawer/components/uni-drawer/uni-drawer.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {
        form: {
          user: "默认账号",
          username: "默认用户",
          sex: "男",
          age: "0",
          birth: "出生年月",
          date: "Wed, 03 Jan 2024 00:00:00 GMT",
          is_default: "1"
        },
        imgurl: "../../static/imagetest.png",
        form1: {
          username: "",
          sex: "男",
          age: "0",
          birth: "出生年月",
          is_default: "0"
        },
        test: [0, 0, 0, 0, 0, 0, 0],
        i2t: "i",
        error: false,
        success: true,
        login: false,
        currenttime: "",
        year: "",
        swc: false,
        infoman: [],
        resultlist: [],
        Bttext: "创建用户",
        errormessgae: "",
        finish: false,
        imagesize: 40,
        deleteindex: 0,
        time1: null
      };
    },
    onLoad() {
      let current = /* @__PURE__ */ new Date();
      let year = current.getFullYear();
      this.year = year;
      let month = current.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      this.currenttime = year + "-" + month;
      this.imagesize = uni.getSystemInfoSync().screenHeight * 0.07;
      this.getdefault();
    },
    onShow() {
      var that = this;
      this.$device(function(result) {
        if (result == 1) {
          let user = uni.getStorageSync("user");
          if (user) {
            if (!that.success && that.login) {
              uni.showLoading({
                mask: true,
                title: "重新加载中"
              });
              setTimeout(() => {
                that.getdefault();
              }, 3e3);
              setTimeout(() => {
                uni.hideLoading();
              }, 3e3);
            }
          } else {
            that.login = false;
          }
        } else if (result == 2) {
          uni.showToast({
            icon: "error",
            title: "账号在异地登录",
            mask: true
          });
          setTimeout(() => {
            uni.reLaunch({
              url: "/pages/user/user"
            });
          }, 1e3);
        } else if (result == 4) {
          that.login = false;
          uni.navigateTo({
            url: "/pages/login/login"
          });
        } else {
          let user1 = uni.getStorageSync("user");
          if (user1)
            ;
          else {
            that.login = false;
          }
        }
      });
      this.time1 = setInterval(() => {
        this.$device(function(result) {
          if (result == 1) {
            let user = uni.getStorageSync("user");
            if (user) {
              if (!that.success) {
                uni.showLoading({
                  mask: true,
                  title: "重新加载中"
                });
                setTimeout(() => {
                  that.getdefault();
                }, 3e3);
                setTimeout(() => {
                  uni.hideLoading();
                }, 3e3);
              }
            } else {
              that.login = false;
            }
          } else if (result == 2) {
            uni.showToast({
              icon: "error",
              title: "账号在异地登录",
              mask: true
            });
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/user/user"
              });
            }, 1e3);
          } else if (result == 4) {
            that.login = false;
            uni.navigateTo({
              url: "/pages/login/login"
            });
          } else {
            let user1 = uni.getStorageSync("user");
            if (user1)
              ;
            else {
              that.login = false;
            }
          }
        });
      }, 36e5);
    },
    onHide() {
      clearInterval(this.time1);
      this.time1 = null;
    },
    onReady() {
    },
    methods: {
      getdefault() {
        uni.showLoading({
          mask: true
        });
        const userData = uni.getStorageSync("user");
        if (userData) {
          var that = this;
          uni.request({
            url: that.$BASE_URL + "/getinfo0",
            header: { Authorization: "Bearer " + userData.access_token },
            method: "GET",
            success: (res) => {
              const data = res.data;
              if (res.statusCode == 401) {
                uni.request({
                  url: that.$BASE_URL + "/refresh",
                  header: { Authorization: "Bearer " + userData.refresh_token },
                  method: "GET",
                  success: (res2) => {
                    const data2 = res2.data;
                    if (res2.statusCode == 401) {
                      uni.hideLoading();
                      uni.showToast({
                        icon: "none",
                        title: "登录已过期"
                      });
                      uni.removeStorage({
                        key: "user"
                      });
                      uni.navigateTo({
                        url: "/pages/login/login"
                      });
                    } else if (data2.code == "200") {
                      uni.setStorageSync("user", data2.data);
                      uni.setStorage({
                        key: "user",
                        data: {
                          refresh_token: userData.refresh_token,
                          access_token: data2.data
                        }
                      });
                      setTimeout(() => {
                        that.getdefault();
                      }, 500);
                    }
                  },
                  fail: (err) => {
                    uni.hideLoading();
                    that.success = false;
                    that.login = true;
                    if (err.statusCode === 404) {
                      uni.showToast({
                        icon: "none",
                        title: "请求失败，找不到资源"
                      });
                    } else if (err.statusCode === 500) {
                      uni.showToast({
                        icon: "none",
                        title: "服务器内部错误，请稍后重试"
                      });
                    } else {
                      uni.showToast({
                        icon: "none",
                        title: "请求失败，请稍后重试"
                      });
                    }
                  }
                });
              } else if (data.code == "200") {
                uni.hideLoading();
                that.form = data.data;
                that.infoman = data.infoman;
                for (let i = 0; i < data.result.length; i++) {
                  data.result[i].resultimg = "data:image/jpeg;base64," + data.result[i].resultimg;
                }
                that.resultlist = data.result;
                that.login = true;
                if (that.resultlist.length > 0) {
                  that.finish = true;
                }
                that.success = true;
              } else {
                uni.hideLoading();
                uni.showToast({
                  icon: "error",
                  title: data.msg
                });
                that.success = false;
                that.login = true;
              }
            },
            fail: (err) => {
              uni.hideLoading();
              that.success = false;
              that.login = true;
              if (err.statusCode === 404) {
                uni.showToast({
                  icon: "none",
                  title: "请求失败，找不到资源"
                });
              } else if (err.statusCode === 500) {
                uni.showToast({
                  icon: "none",
                  title: "服务器内部错误，请稍后重试"
                });
              } else {
                uni.showToast({
                  icon: "none",
                  title: "请求失败，请稍后重试"
                });
              }
            }
          });
        } else {
          uni.hideLoading();
        }
      },
      cancel() {
        this.$refs.delete.close();
      },
      exit() {
        this.$refs.showRight.close();
        this.$refs.exit.open("center");
      },
      cancelexit() {
        this.$refs.exit.close();
      },
      exitfinish() {
        this.$refs.exit.close();
        uni.removeStorageSync("user");
        uni.reLaunch({
          url: "/pages/user/user"
        });
      },
      deletefinish() {
        uni.showLoading({
          mask: true
        });
        const userData = uni.getStorageSync("user");
        if (userData) {
          var that = this;
          uni.request({
            url: this.$BASE_URL + "/deleteresult",
            header: { Authorization: "Bearer " + userData.access_token },
            method: "POST",
            data: { "result_id": this.resultlist[this.deleteindex].result_id },
            success: (res) => {
              const data = res.data;
              if (res.statusCode == 401) {
                uni.request({
                  url: that.$BASE_URL + "/refresh",
                  header: { Authorization: "Bearer " + userData.refresh_token },
                  method: "GET",
                  success: (res2) => {
                    const data2 = res2.data;
                    if (res2.statusCode == 401) {
                      uni.hideLoading();
                      uni.showToast({
                        icon: "none",
                        title: "登录已过期"
                      });
                      uni.removeStorage({
                        key: "user"
                      });
                      uni.navigateTo({
                        url: "/pages/login/login"
                      });
                    } else if (data2.code == "200") {
                      uni.setStorageSync("user", data2.data);
                      uni.setStorage({
                        key: "user",
                        data: {
                          refresh_token: userData.refresh_token,
                          access_token: data2.data
                        }
                      });
                      setTimeout(() => {
                        that.deletefinish();
                      }, 500);
                    }
                  },
                  fail: (err) => {
                    uni.hideLoading();
                    that.success = false;
                    if (err.statusCode === 404) {
                      uni.showToast({
                        icon: "none",
                        title: "请求失败，找不到资源"
                      });
                    } else if (err.statusCode === 500) {
                      uni.showToast({
                        icon: "none",
                        title: "服务器内部错误，请稍后重试"
                      });
                    } else {
                      uni.showToast({
                        icon: "none",
                        title: "请求失败，请稍后重试"
                      });
                    }
                  }
                });
              } else if (data.code == "200") {
                uni.hideLoading();
                that.resultlist.splice(that.deleteindex, 1);
                if (that.resultlist.length == 0) {
                  that.finish = false;
                }
                uni.showToast({
                  icon: "success",
                  title: "删除报告成功"
                });
                that.$refs.delete.close();
              } else {
                uni.hideLoading();
                uni.showToast({
                  icon: "error",
                  title: data.msg
                });
              }
            },
            fail: (err) => {
              uni.hideLoading();
              if (err.statusCode === 404) {
                uni.showToast({
                  icon: "none",
                  title: "请求失败，找不到资源"
                });
              } else if (err.statusCode === 500) {
                uni.showToast({
                  icon: "none",
                  title: "服务器内部错误，请稍后重试"
                });
              } else {
                uni.showToast({
                  icon: "none",
                  title: "请求失败，请稍后重试"
                });
              }
            }
          });
        }
      },
      deleteresult(index2) {
        this.$refs.delete.open("center");
        this.deleteindex = index2;
      },
      result(index2) {
        let img1 = this.resultlist[index2].sicknessimg1;
        let img2 = this.resultlist[index2].sicknessimg2;
        let img3 = this.resultlist[index2].sicknessimg3;
        if (!img1.startsWith("data:image/jpeg;base64,")) {
          img1 = "data:image/jpeg;base64," + img1;
        }
        if (!img2.startsWith("data:image/jpeg;base64,")) {
          img2 = "data:image/jpeg;base64," + img2;
        }
        if (!img3.startsWith("data:image/jpeg;base64,")) {
          img3 = "data:image/jpeg;base64," + img3;
        }
        let result = this.resultlist[index2];
        result.sicknessimg1 = img1;
        result.sicknessimg2 = img2;
        result.sicknessimg3 = img3;
        uni.navigateTo({
          url: "/pages/user/result?result=" + encodeURIComponent(JSON.stringify(result))
        });
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}/${month}/${day}`;
      },
      loginorexit() {
        if (this.login) {
          this.showDrawer();
        } else {
          uni.navigateTo({
            url: "/pages/login/login"
          });
        }
      },
      showDrawer() {
        this.$refs.showRight.open();
      },
      add() {
        this.$refs.showRight.close();
        this.$refs.popup.open("bottom");
      },
      alluser() {
        const userData = uni.getStorageSync("user");
        if (userData) {
          uni.navigateTo({
            url: "/pages/user/alluser?infoman=" + JSON.stringify(this.infoman)
          });
        }
      },
      Binput(e) {
        const o = e;
        const inputRule = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
        this.$nextTick(function() {
          this.form1.username = o.replace(inputRule, "");
          if (this.form1.username) {
            this.i2t = "t";
          } else {
            this.i2t = "i";
          }
        });
      },
      Bfocus() {
        this.error = false;
        this.errormessgae = "";
      },
      switchchange: function(e) {
        if (e.detail.value) {
          this.swc = true;
          this.form1.sex = "女";
        } else {
          this.swc = false;
          this.form1.sex = "男";
        }
      },
      bindDateChange: function(e) {
        this.form1.birth = e.detail.value;
        let parts = this.form1.birth.split("-");
        let years = parseInt(parts[0]);
        this.form1.age = this.year - years;
      },
      adduser() {
        if (this.form1.username !== "" && this.form1.age !== "" && this.form1.birth != "出生年月") {
          const isExist = this.infoman.some((item) => item.username === this.form1.username);
          if (isExist) {
            this.error = true;
            this.errormessgae = "该用户名已经存在，请使用其他用户名";
          } else {
            this.Bttext = "创建中...";
            var that = this;
            const userData = uni.getStorageSync("user");
            if (userData) {
              uni.request({
                url: this.$BASE_URL + "/adduser",
                method: "POST",
                header: { Authorization: "Bearer " + userData.access_token },
                data: this.form1,
                success: (res) => {
                  const data = res.data;
                  if (res.statusCode == 401) {
                    uni.request({
                      url: that.$BASE_URL + "/refresh",
                      header: { Authorization: "Bearer " + userData.refresh_token },
                      method: "GET",
                      success: (res2) => {
                        const data2 = res2.data;
                        if (res2.statusCode == 401) {
                          uni.showToast({
                            icon: "none",
                            title: "登录已过期"
                          });
                          that.Bttext = "创建用户";
                          uni.removeStorage({
                            key: "user"
                          });
                          uni.navigateTo({
                            url: "/pages/login/login"
                          });
                        } else if (data2.code == "200") {
                          uni.setStorageSync("user", data2.data);
                          uni.setStorage({
                            key: "user",
                            data: {
                              refresh_token: userData.refresh_token,
                              access_token: data2.data
                            }
                          });
                          setTimeout(() => {
                            that.adduser();
                          }, 500);
                        }
                      },
                      fail: (err) => {
                        that.Bttext = "创建用户";
                        if (err.statusCode === 404) {
                          uni.showToast({
                            icon: "none",
                            title: "请求失败，找不到资源"
                          });
                        } else if (err.statusCode === 500) {
                          uni.showToast({
                            icon: "none",
                            title: "服务器内部错误，请稍后重试"
                          });
                        } else {
                          uni.showToast({
                            icon: "none",
                            title: "请求失败，请稍后重试"
                          });
                        }
                      }
                    });
                  } else if (data.code == "200") {
                    that.Bttext = "创建用户";
                    that.$refs.popup.close();
                    uni.showToast({
                      icon: "success",
                      title: "成功",
                      mask: true
                    });
                    setTimeout(() => {
                      uni.reLaunch({
                        url: "/pages/user/user"
                      });
                    }, 500);
                  } else {
                    uni.showToast({
                      icon: "error",
                      title: data.msg
                    });
                    that.Bttext = "创建用户";
                  }
                },
                fail: (err) => {
                  that.Bttext = "创建用户";
                  if (err.statusCode === 404) {
                    uni.showToast({
                      icon: "none",
                      title: "请求失败，找不到资源"
                    });
                  } else if (err.statusCode === 500) {
                    uni.showToast({
                      icon: "none",
                      title: "服务器内部错误，请稍后重试"
                    });
                  } else {
                    uni.showToast({
                      icon: "none",
                      title: "请求失败，请稍后重试"
                    });
                  }
                }
              });
            }
          }
        }
      },
      change(e) {
        if (e.show) {
          uni.hideTabBar();
        } else {
          this.swc = false;
          this.form1.sex = "男";
          this.form1.username = "";
          this.form1.birth = "出生年月";
          this.form1.age = "";
          this.i2t = "i";
          this.error = false;
          this.errormessgae = "";
          setTimeout(() => {
            uni.showTabBar();
          }, 200);
        }
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_2);
    const _component_uni_drawer = resolveEasycom(vue.resolveDynamicComponent("uni-drawer"), __easycom_1);
    const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_0);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_5);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      !$data.success ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        style: { "text-align": "center" }
      }, [
        vue.createElementVNode("view", { style: { "align-items": "center", "justify-content": "center", "text-align": "center", "display": "flex" } }, [
          vue.createElementVNode("image", {
            src: "/static/report.png",
            mode: "aspectFit",
            style: { "width": "100vw", "height": "50vh" }
          })
        ]),
        vue.createElementVNode("text", { style: { "text-align": "center", "color": "#7259b1" } }, "网络错误请求失败...")
      ])) : vue.createCommentVNode("v-if", true),
      $data.success ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        style: { "padding": "10rpx 10px" }
      }, [
        vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "flex-start", "align-items": "center", "padding": "5rpx 5rpx", "border": "2rpx solid #b2b2b2", "border-radius": "45px", "background-color": "#ECEFF1" } }, [
          vue.createElementVNode("view", { style: { "width": "45px", "height": "45px", "border-radius": "50%", "background-color": "#8366c8", "font-size": "22.5px", "display": "flex", "color": "#fff", "justify-content": "center", "align-items": "center" } }, [
            $data.login ? (vue.openBlock(), vue.createElementBlock(
              "text",
              { key: 0 },
              vue.toDisplayString($data.form.username.substring(0, 1)),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true),
            !$data.login ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
              vue.createVNode(_component_uni_icons, {
                type: "person-filled",
                size: "44",
                color: "#ECEFF1"
              })
            ])) : vue.createCommentVNode("v-if", true)
          ]),
          !$data.login ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            style: { "font-size": "15px", "margin-left": "4%", "width": "50vw" }
          }, [
            vue.createElementVNode("view", { style: { "display": "flex", "width": "100%" } }, [
              vue.createElementVNode("text", { style: { "white-space": "nowrap", "text-overflow": "ellipsis", "overflow": "hidden" } }, "用户名"),
              vue.createElementVNode("text", { style: { "white-space": "nowrap", "text-overflow": "ellipsis", "overflow": "hidden", "color": "#b2b2b2" } }, "(未登录)")
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", { style: { "color": "#b2b2b2" } }, "创建时间")
            ])
          ])) : vue.createCommentVNode("v-if", true),
          $data.login ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            style: { "font-size": "15px", "width": "50vw", "margin-left": "4%" }
          }, [
            vue.createElementVNode("view", { style: { "display": "flex", "width": "100%" } }, [
              vue.createElementVNode(
                "text",
                { style: { "overflow": "hidden", "white-space": "nowrap", "text-overflow": "ellipsis" } },
                vue.toDisplayString($data.form.username),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { style: { "display": "flex", "width": "100%" } }, [
              vue.createElementVNode(
                "text",
                { style: { "color": "#b2b2b2", "overflow": "hidden", "white-space": "nowrap", "text-overflow": "ellipsis" } },
                "创建于" + vue.toDisplayString($options.formatDate($data.form.date)),
                1
                /* TEXT */
              )
            ])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { style: { "margin-left": "auto" } }, [
            vue.createVNode(_component_uni_icons, {
              type: "forward",
              size: "32",
              color: "#666699",
              onClick: $options.loginorexit
            }, null, 8, ["onClick"])
          ])
        ]),
        !$data.login ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          style: { "align-items": "center", "justify-content": "center", "text-align": "center", "display": "flex" }
        }, [
          vue.createElementVNode("image", {
            src: "/static/report.png",
            mode: "aspectFit",
            style: { "width": "100vw", "height": "50vh" }
          })
        ])) : vue.createCommentVNode("v-if", true),
        $data.login && !$data.finish ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          style: { "align-items": "center", "justify-content": "center", "text-align": "center", "display": "flex" }
        }, [
          vue.createElementVNode("image", {
            src: "/static/report.png",
            mode: "aspectFit",
            style: { "width": "100vw", "height": "50vh" }
          })
        ])) : vue.createCommentVNode("v-if", true),
        $data.login && !$data.finish ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          style: { "text-align": "center" }
        }, [
          vue.createElementVNode("text", { style: { "color": "#7259b1", "font-size": "20px" } }, "暂无测评报告")
        ])) : vue.createCommentVNode("v-if", true)
      ])) : vue.createCommentVNode("v-if", true),
      vue.createVNode(
        _component_uni_drawer,
        {
          ref: "showRight",
          mode: "right"
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "background-color": "#b2b2b2", "color": "#ECEFF1", "border-radius": "10px", "height": "40px", "margin-top": "10vh", "margin-left": "auto", "margin-right": "auto", "width": "85%", "display": "flex", "align-items": "center", "justify-content": "center", "white-space": "nowrap", "text-overflow": "ellipsis", "overflow": "hidden" } }, [
              vue.createElementVNode(
                "text",
                { style: { "padding-left": "5%", "padding-right": "5%", "text-overflow": "ellipsis", "white-space": "nowrap", "overflow": "hidden" } },
                "账号:" + vue.toDisplayString($data.form.user),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { style: { "margin-top": "15vh" } }, [
              vue.createElementVNode("button", {
                style: { "background-color": "#8366c8", "color": "#fff", "border-radius": "30px", "width": "85%" },
                "hover-class": "bt-click",
                onClick: _cache[0] || (_cache[0] = (...args) => $options.alluser && $options.alluser(...args))
              }, "查看所有用户")
            ]),
            vue.createElementVNode("view", { style: { "margin-top": "15vh" } }, [
              vue.createElementVNode("button", {
                style: { "background-color": "#8366c8", "color": "#fff", "border-radius": "30px", "width": "85%" },
                "hover-class": "bt-click",
                onClick: _cache[1] || (_cache[1] = (...args) => $options.add && $options.add(...args))
              }, "添加新用户")
            ]),
            vue.createElementVNode("view", { style: { "justify-content": "center", "display": "flex", "height": "40%", "align-items": "center" } }, [
              vue.createElementVNode("button", {
                style: { "background-color": "#99CCCC", "color": "#fff", "border-radius": "30px", "width": "85%" },
                "hover-class": "bt-click",
                onClick: _cache[2] || (_cache[2] = (...args) => $options.exit && $options.exit(...args))
              }, "退出登录")
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      $data.login && $data.finish ? (vue.openBlock(), vue.createElementBlock("view", { key: 2 }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.resultlist, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock("view", { key: index2 }, [
              vue.createVNode(
                _component_uni_card,
                {
                  "is-full": true,
                  style: { "background-color": "#f1f4f5", "white-space": "nowrap", "text-overflow": "ellipsis", "margin-left": "5%", "margin-right": "5%", "border-radius": "30rpx", "margin-top": "5%" }
                },
                {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("view", { style: { "display": "flex", "padding-top": "3%", "padding-bottom": "3%", "justify-content": "flex-start" } }, [
                      vue.createElementVNode("view", {
                        class: "images",
                        style: { "height": "7vh", "display": "flex", "justify-content": "flex-start", "align-items": "center" },
                        onClick: ($event) => $options.result(index2)
                      }, [
                        vue.createElementVNode(
                          "view",
                          {
                            style: vue.normalizeStyle({ height: $data.imagesize + "px", width: $data.imagesize + "px", "border-radius": $data.imagesize + "px", overflow: "hidden", "margin-right": "2%" })
                          },
                          [
                            vue.createElementVNode("image", {
                              src: item.resultimg,
                              mode: "aspectFill",
                              style: { "width": "100%", "height": "100%" }
                            }, null, 8, ["src"])
                          ],
                          4
                          /* STYLE */
                        )
                      ], 8, ["onClick"]),
                      vue.createElementVNode("view", { style: { "flex": "1" } }, [
                        vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "flex-start", "align-items": "center" } }, [
                          vue.createElementVNode("view", {
                            style: { "margin-left": "2%", "width": "50vw", "font-size": "18px", "display": "flex", "justify-content": "flex-start", "align-items": "center" },
                            onClick: ($event) => $options.result(index2)
                          }, [
                            vue.createElementVNode(
                              "text",
                              { style: { "white-space": "nowrap", "text-overflow": "ellipsis", "overflow": "hidden" } },
                              vue.toDisplayString(item.username),
                              1
                              /* TEXT */
                            )
                          ], 8, ["onClick"]),
                          vue.createElementVNode("view", { style: { "margin-left": "auto" } }, [
                            vue.createVNode(_component_uni_icons, {
                              type: "trash-filled",
                              color: "#b2b2b2",
                              size: "30",
                              onClick: ($event) => $options.deleteresult(index2)
                            }, null, 8, ["onClick"])
                          ])
                        ]),
                        vue.createElementVNode("view", {
                          onClick: ($event) => $options.result(index2),
                          style: { "margin-left": "2%", "white-space": "nowrap", "text-overflow": "ellipsis", "width": "100%", "display": "flex", "align-items": "center", "justify-content": "flex-start", "padding-top": "2%", "margin-top": "2%", "border-top": "2rpx solid #b2b2b2" }
                        }, [
                          vue.createElementVNode("view", { style: { "white-space": "nowrap", "text-overflow": "ellipsis" } }, [
                            vue.createElementVNode(
                              "text",
                              { style: { "color": "#b0adbd", "font-size": "30rpx" } },
                              "报告日期:" + vue.toDisplayString($options.formatDate(item.date)),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.createElementVNode("view", { class: "as0" }, [
                            vue.createElementVNode(
                              "view",
                              { class: "half-width0" },
                              vue.toDisplayString(item.age),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode("view", { class: "separator0" }, "|"),
                            vue.createElementVNode(
                              "view",
                              { class: "half-width0" },
                              vue.toDisplayString(item.sex),
                              1
                              /* TEXT */
                            )
                          ])
                        ], 8, ["onClick"])
                      ])
                    ])
                  ]),
                  _: 2
                  /* DYNAMIC */
                },
                1024
                /* DYNAMIC_SLOTS */
              )
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])) : vue.createCommentVNode("v-if", true),
      vue.createVNode(
        _component_uni_popup,
        {
          ref: "delete",
          "is-mask-click": false
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "width": "280px", "height": "130px", "background-color": "#fff", "border-radius": "2vh" } }, [
              vue.createElementVNode("view", { style: { "text-align": "center", "display": "flex", "justify-content": "center", "align-items": "center", "padding-top": "20px" } }, [
                vue.createElementVNode("text", { style: { "color": "#8366c8", "font-size": "20px" } }, "请确定删除?")
              ]),
              vue.createElementVNode("view", { style: { "text-align": "center", "display": "flex", "justify-content": "center", "align-items": "center" } }, [
                vue.createElementVNode("text", { style: { "color": "#b2b2b2", "font-size": "14px" } }, "*删除报告后无法还原")
              ]),
              vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "space-around", "align-items": "center", "margin-top": "15px" } }, [
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("button", {
                    onClick: _cache[3] || (_cache[3] = (...args) => $options.cancel && $options.cancel(...args)),
                    style: { "font-size": "16px", "border-radius": "18px", "background-color": "#ECEFF1", "color": "#b2b2b2" }
                  }, "取消")
                ]),
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("button", {
                    onClick: _cache[4] || (_cache[4] = (...args) => $options.deletefinish && $options.deletefinish(...args)),
                    style: { "border-radius": "18px", "font-size": "16px", "background-color": "#8366c8", "color": "#fff" }
                  }, "确定")
                ])
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createVNode(
        _component_uni_popup,
        {
          ref: "exit",
          "is-mask-click": false
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "width": "280px", "height": "130px", "background-color": "#fff", "border-radius": "2vh" } }, [
              vue.createElementVNode("view", { style: { "text-align": "center", "display": "flex", "justify-content": "center", "align-items": "center", "padding-top": "20px" } }, [
                vue.createElementVNode("text", { style: { "color": "#99CCCC", "font-size": "20px" } }, "请确定退出登录?")
              ]),
              vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "space-around", "align-items": "center", "margin-top": "15px" } }, [
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("button", {
                    onClick: _cache[5] || (_cache[5] = (...args) => $options.cancelexit && $options.cancelexit(...args)),
                    style: { "font-size": "16px", "border-radius": "18px", "background-color": "#ECEFF1", "color": "#b2b2b2" }
                  }, "取消")
                ]),
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("button", {
                    onClick: _cache[6] || (_cache[6] = (...args) => $options.exitfinish && $options.exitfinish(...args)),
                    style: { "border-radius": "18px", "font-size": "16px", "background-color": "#99CCCC", "color": "#fff" }
                  }, "确定")
                ])
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createVNode(_component_uni_popup, {
        ref: "popup",
        onChange: $options.change
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "info" }, [
            vue.createElementVNode("view", { class: "infobara" }, [
              $data.i2t === "i" ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "Bicon"
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "person-filled",
                  size: "60",
                  color: "#cccccc"
                })
              ])) : $data.i2t === "t" ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 1,
                  class: "Bicon"
                },
                vue.toDisplayString($data.form1.username.substring(0, 1)),
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "center", "width": "40%", "position": "absolute", "margin-top": "70rpx" } }, [
                vue.createElementVNode("text", { style: { "font-size": "32rpx", "color": "#755cb5" } }, "添加新用户")
              ])
            ]),
            vue.createElementVNode("view", { class: "infoback" }, [
              vue.createElementVNode("view", { style: { "padding-top": "2%" } }, [
                vue.createVNode(_component_uni_easyinput, {
                  modelValue: $data.form1.username,
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.form1.username = $event),
                  "error-message": $data.error ? "errorMessage" : "",
                  placeholder: "用户名称",
                  "placeholder-style": "font-size:30rpx",
                  clearable: true,
                  primaryColor: "#8366c8",
                  onInput: $options.Binput,
                  onFocus: $options.Bfocus
                }, null, 8, ["modelValue", "error-message", "onInput", "onFocus"]),
                vue.createElementVNode(
                  "text",
                  { style: { "padding-left": "3%", "font-size": "28rpx", "color": "#ff0000" } },
                  vue.toDisplayString($data.errormessgae),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass($data.swc ? "sexg" : "sexb")
                },
                [
                  vue.createElementVNode(
                    "text",
                    {
                      style: vue.normalizeStyle($data.swc ? "padding-left: 3%; color: #ffacd2; font-size: 30rpx;" : "padding-left: 3%; color: #66CCFF; font-size: 30rpx;")
                    },
                    "性别",
                    4
                    /* STYLE */
                  ),
                  vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "flex-end", "align-items": "center", "margin-left": "auto", "padding-right": "3%" } }, [
                    vue.createElementVNode(
                      "text",
                      {
                        class: vue.normalizeClass($data.swc ? "textsex" : "textsexb")
                      },
                      "男",
                      2
                      /* CLASS */
                    ),
                    vue.createElementVNode("view", { style: { "height": "100%", "display": "flex", "justify-content": "center", "align-items": "center", "padding": "0 2%" } }, [
                      vue.createElementVNode(
                        "switch",
                        {
                          color: "#ffacd2",
                          style: { "transform": "scale(0.7)", "align-items": "center", "dispaly": "flex" },
                          onChange: _cache[8] || (_cache[8] = (...args) => $options.switchchange && $options.switchchange(...args))
                        },
                        null,
                        32
                        /* HYDRATE_EVENTS */
                      )
                    ]),
                    vue.createElementVNode(
                      "text",
                      {
                        class: vue.normalizeClass($data.swc ? "textsexg" : "textsex")
                      },
                      "女",
                      2
                      /* CLASS */
                    )
                  ])
                ],
                2
                /* CLASS */
              ),
              vue.createElementVNode("view", { style: { "height": "6vh", "margin-bottom": "7%", "display": "flex", "align-items": "center", "border-radius": "40rpx", "border": "2rpx solid #ccc" } }, [
                vue.createElementVNode("picker", {
                  mode: "date",
                  value: $data.form1.birth,
                  start: "1900-01",
                  end: $data.currenttime,
                  fields: "month",
                  onChange: _cache[9] || (_cache[9] = (...args) => $options.bindDateChange && $options.bindDateChange(...args)),
                  style: { "width": "100%", "height": "100%", "display": "flex", "align-items": "center", "padding-left": "3%" }
                }, [
                  vue.createElementVNode(
                    "text",
                    {
                      style: vue.normalizeStyle($data.form1.age === "" ? "font-size:30rpx; color: #a2a2a2; width: 100%; white-space: nowrap;" : "font-size:30rpx; color: #000000; width: 100%; white-space: nowrap;")
                    },
                    vue.toDisplayString($data.form1.birth),
                    5
                    /* TEXT, STYLE */
                  )
                ], 40, ["value", "end"])
              ]),
              vue.createElementVNode("view", { style: { "height": "6vh", "display": "flex", "align-items": "center", "border-radius": "40rpx" } }, [
                vue.createElementVNode(
                  "button",
                  {
                    class: vue.normalizeClass($data.form1.username === "" || $data.form1.age === "" || $data.form1.birth == "出生年月" ? "noB-bt" : "B-bt"),
                    onClick: _cache[10] || (_cache[10] = (...args) => $options.adduser && $options.adduser(...args))
                  },
                  vue.toDisplayString($data.Bttext),
                  3
                  /* TEXT, CLASS */
                )
              ])
            ])
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["onChange"])
    ]);
  }
  const PagesUserUser = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "F:/SkinApp/App01/pages/user/user.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {
        form: {
          info_id: "",
          username: "",
          sex: "男",
          age: "0",
          birth: "出生年月",
          date: "",
          is_default: 0
        },
        infoman: [],
        changes: {
          user_id: "",
          username: "",
          sex: "男",
          age: "0",
          birth: "出生年月",
          is_default: "0"
        },
        i2t: "t",
        error: false,
        currenttime: "",
        year: "",
        swc: false,
        infoman: [],
        Bttext: "保存",
        errormessgae: "",
        test: [0, 0, 0, 0, 0],
        changeindex: 0,
        deleteindex: 0,
        time1: null
      };
    },
    onShow() {
      this.$device(function(result) {
        if (result == 2) {
          uni.showToast({
            icon: "error",
            title: "账号在异地登录",
            mask: true
          });
          setTimeout(() => {
            uni.reLaunch({
              url: "/pages/index/index"
            });
          }, 1e3);
        } else if (result == 4) {
          setTimeout(() => {
            uni.reLaunch({
              url: "/pages/index/index"
            });
          }, 1e3);
        } else {
          let user1 = uni.getStorageSync("user");
          if (!user1) {
            uni.showToast({
              icon: "none",
              title: "未登录",
              "mask": true
            });
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/index/index"
              });
            }, 1e3);
          }
        }
      });
      this.time1 = setInterval(() => {
        this.$device(function(result) {
          if (result == 2) {
            uni.showToast({
              icon: "error",
              title: "账号在异地登录",
              mask: true
            });
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/index/index"
              });
            }, 1e3);
          } else if (result == 4) {
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/index/index"
              });
            }, 1e3);
          } else {
            let user1 = uni.getStorageSync("user");
            if (!user1) {
              uni.showToast({
                icon: "none",
                title: "未登录",
                "mask": true
              });
              setTimeout(() => {
                uni.reLaunch({
                  url: "/pages/index/index"
                });
              }, 1e3);
            }
          }
        });
      }, 36e5);
    },
    onLoad: function(option) {
      const infoman = JSON.parse(option.infoman);
      this.infoman = infoman;
      let current = /* @__PURE__ */ new Date();
      let year = current.getFullYear();
      this.year = year;
      let month = current.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      this.currenttime = year + "-" + month;
    },
    onBackPress() {
      setTimeout(() => {
        uni.reLaunch({
          url: "/pages/user/user"
        });
      }, 200);
      return true;
    },
    onHide() {
      clearInterval(this.time1);
      this.time1 = null;
    },
    methods: {
      formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}/${month}/${day}`;
      },
      deleteuser(index2) {
        this.$refs.delete.open("center");
        this.deleteindex = index2;
      },
      changeuser(index2, item) {
        this.changeindex = index2;
        if (index2 == 0) {
          this.form.is_default = 1;
        } else {
          this.form.is_default = 0;
        }
        this.form.info_id = item.info_id;
        this.form.username = item.username;
        this.form.sex = item.sex;
        this.form.birth = item.birth;
        this.form.age = item.age;
        if (this.form.sex == "女") {
          this.swc = true;
        }
        if (this.form.username) {
          this.i2t = "t";
        } else {
          this.i2t = "i";
        }
        this.$refs.popup.open("bottom");
      },
      Binput(e) {
        const o = e;
        const inputRule = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
        this.$nextTick(function() {
          this.form.username = o.replace(inputRule, "");
          if (this.form.username) {
            this.i2t = "t";
          } else {
            this.i2t = "i";
          }
        });
      },
      Bfocus() {
        this.error = false;
        this.errormessgae = "";
      },
      switchchange: function(e) {
        if (e.detail.value) {
          this.swc = true;
          this.form.sex = "女";
        } else {
          this.swc = false;
          this.form.sex = "男";
        }
      },
      bindDateChange: function(e) {
        this.form.birth = e.detail.value;
        let parts = this.form.birth.split("-");
        let years = parseInt(parts[0]);
        this.form.age = this.year - years;
      },
      adduser() {
        if (this.form.username !== "" && this.form.age !== "" && (this.form.username != this.infoman[this.changeindex].username || this.form.age != this.infoman[this.changeindex].age || this.form.sex != this.infoman[this.changeindex].sex)) {
          const isExist = this.infoman.some((item) => item.username === this.form.username);
          if (isExist && this.form.username != this.infoman[this.changeindex].username) {
            this.error = true;
            this.errormessgae = "该用户名已经存在，请使用其他用户名";
          } else {
            this.Bttext = "保存中...";
            var that = this;
            const userData = uni.getStorageSync("user");
            uni.request({
              url: that.$BASE_URL + "/changeuser",
              method: "POST",
              header: { Authorization: "Bearer " + userData.access_token },
              data: this.form,
              success: (res) => {
                const data = res.data;
                that.Bttext = "保存";
                if (data.code == "200") {
                  that.Bttext = "保存";
                  that.$refs.popup.close();
                  that.infoman[that.changeindex].sex = that.form.sex;
                  that.infoman[that.changeindex].username = that.form.username;
                  that.infoman[that.changeindex].age = that.form.age;
                  that.infoman[that.changeindex].birth = that.form.birth;
                  uni.showToast({
                    icon: "success",
                    title: "成功"
                  });
                } else {
                  uni.showToast({
                    icon: "error",
                    title: data.msg
                  });
                  that.Bttext = "保存";
                }
              },
              fail: (err) => {
                that.Bttext = "保存";
                if (err.statusCode === 404) {
                  uni.showToast({
                    icon: "none",
                    title: "请求失败，找不到资源"
                  });
                } else if (err.statusCode === 500) {
                  uni.showToast({
                    icon: "none",
                    title: "服务器内部错误，请稍后重试"
                  });
                } else {
                  uni.showToast({
                    icon: "none",
                    title: "请求失败，请稍后重试"
                  });
                }
              }
            });
          }
        }
      },
      change(e) {
        if (e.show) {
          uni.hideTabBar();
        } else {
          this.swc = false;
          this.error = false;
          this.errormessgae = "";
          setTimeout(() => {
            uni.showTabBar();
          }, 200);
        }
      },
      cancel() {
        this.$refs.delete.close();
      },
      deletefinish() {
        uni.showLoading({
          mask: true
        });
        const userData = uni.getStorageSync("user");
        if (userData && this.infoman[this.deleteindex].is_default == 0) {
          var that = this;
          uni.request({
            url: this.$BASE_URL + "/deleteuser",
            header: { Authorization: "Bearer " + userData.access_token },
            method: "POST",
            data: { "info_id": this.infoman[this.deleteindex].info_id },
            success: (res) => {
              const data = res.data;
              if (res.statusCode == 401) {
                uni.request({
                  url: that.$BASE_URL + "/refresh",
                  header: { Authorization: "Bearer " + userData.refresh_token },
                  method: "GET",
                  success: (res2) => {
                    const data2 = res2.data;
                    if (res2.statusCode == 401) {
                      uni.hideLoading();
                      uni.showToast({
                        icon: "none",
                        title: "登录已过期"
                      });
                      uni.removeStorage({
                        key: "user"
                      });
                      uni.navigateTo({
                        url: "/pages/login/login"
                      });
                    } else if (data2.code == "200") {
                      uni.setStorageSync("user", data2.data);
                      uni.setStorage({
                        key: "user",
                        data: {
                          refresh_token: userData.refresh_token,
                          access_token: data2.data
                        }
                      });
                      setTimeout(() => {
                        that.deletefinish();
                      }, 500);
                    }
                  },
                  fail: (err) => {
                    uni.hideLoading();
                    if (err.statusCode === 404) {
                      uni.showToast({
                        icon: "none",
                        title: "请求失败，找不到资源"
                      });
                    } else if (err.statusCode === 500) {
                      uni.showToast({
                        icon: "none",
                        title: "服务器内部错误，请稍后重试"
                      });
                    } else {
                      uni.showToast({
                        icon: "none",
                        title: "请求失败，请稍后重试"
                      });
                    }
                  }
                });
              } else if (data.code == "200") {
                uni.hideLoading();
                that.infoman.splice(that.deleteindex, 1);
                uni.showToast({
                  icon: "success",
                  title: "删除用户成功"
                });
                that.$refs.delete.close();
              } else {
                uni.hideLoading();
                uni.showToast({
                  icon: "error",
                  title: data.msg
                });
              }
            },
            fail: (err) => {
              uni.hideLoading();
              if (err.statusCode === 404) {
                uni.showToast({
                  icon: "none",
                  title: "请求失败，找不到资源"
                });
              } else if (err.statusCode === 500) {
                uni.showToast({
                  icon: "none",
                  title: "服务器内部错误，请稍后重试"
                });
              } else {
                uni.showToast({
                  icon: "none",
                  title: "请求失败，请稍后重试"
                });
              }
            }
          });
        }
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_2);
    const _component_uni_collapse_item = resolveEasycom(vue.resolveDynamicComponent("uni-collapse-item"), __easycom_1$1);
    const _component_uni_collapse = resolveEasycom(vue.resolveDynamicComponent("uni-collapse"), __easycom_3);
    const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_0);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_4);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_5);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.infoman, (item, index2) => {
          return vue.openBlock(), vue.createElementBlock("view", { key: index2 }, [
            vue.createElementVNode("view", { style: { "padding-top": "3%", "padding-bottom": "3%", "background-color": "#ECEFF1", "display": "flex", "justify-content": "center" } }, [
              vue.createVNode(
                _component_uni_card,
                {
                  "is-full": true,
                  style: { "white-space": "nowrap", "text-overflow": "ellipsis", "margin-left": "5%", "margin-right": "5%", "border-radius": "30rpx" }
                },
                {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("view", { style: { "height": "45px", "display": "flex", "justify-content": "flex-start", "align-items": "center" } }, [
                      vue.createElementVNode("view", { style: { "width": "45px", "height": "45px", "border-radius": "50%", "background-color": "#8366c8", "font-size": "22.5px", "display": "flex", "color": "#fff", "justify-content": "center", "align-items": "center", "margin-right": "2%" } }, [
                        vue.createElementVNode(
                          "text",
                          null,
                          vue.toDisplayString(item.username.substring(0, 1)),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", { style: { "flex": "1", "display": "flex", "justify-content": "center", "align-items": "center", "white-space": "nowrap", "overflow": "hidden", "text-overflow": "ellipsis" } }, [
                        vue.createElementVNode(
                          "text",
                          { style: { "font-size": "18px", "color": "#000", "white-space": "nowrap", "overflow": "hidden", "text-overflow": "ellipsis" } },
                          "用户名：" + vue.toDisplayString(item.username),
                          1
                          /* TEXT */
                        )
                      ])
                    ]),
                    vue.createElementVNode("view", { style: { "white-space": "nowrap", "text-overflow": "ellipsis", "width": "100%", "display": "flex", "align-items": "center", "justify-content": "flex-start", "padding-top": "2%", "margin-top": "2%", "border-top": "2rpx solid #b2b2b2" } }, [
                      vue.createElementVNode("view", { style: { "white-space": "nowrap", "text-overflow": "ellipsis", "margin-left": "5%" } }, [
                        vue.createElementVNode(
                          "text",
                          { style: { "color": "#b0adbd", "font-size": "15px" } },
                          "创建于:" + vue.toDisplayString($options.formatDate(item.date)),
                          1
                          /* TEXT */
                        )
                      ])
                    ]),
                    vue.createVNode(
                      _component_uni_collapse,
                      null,
                      {
                        default: vue.withCtx(() => [
                          vue.createElementVNode("view", null, [
                            vue.createVNode(_component_uni_collapse_item, {
                              "title-border": "none",
                              open: index2 == 0 ? true : false
                            }, {
                              default: vue.withCtx(() => [
                                vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "flex-start", "align-items": "center", "margin-left": "5%" } }, [
                                  vue.createElementVNode("view", null, [
                                    vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "flex-start", "align-items": "center" } }, [
                                      vue.createElementVNode("view", { style: { "width": "30px", "height": "30px", "display": "flex", "justify-content": "center", "align-items": "center" } }, [
                                        vue.createElementVNode("view", { style: { "width": "10px", "height": "10px", "border-radius": "50%", "background-color": "#8366c8" } })
                                      ]),
                                      vue.createElementVNode("view", { style: { "text-align": "center", "display": "flex", "justify-content": "center", "align-items": "center" } }, [
                                        vue.createElementVNode(
                                          "text",
                                          { style: { "font-size": "15px" } },
                                          "性别:" + vue.toDisplayString(item.sex),
                                          1
                                          /* TEXT */
                                        )
                                      ])
                                    ]),
                                    vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "flex-start", "align-items": "center" } }, [
                                      vue.createElementVNode("view", { style: { "width": "30px", "height": "30px", "display": "flex", "justify-content": "center", "align-items": "center" } }, [
                                        vue.createElementVNode("view", { style: { "width": "10px", "height": "10px", "border-radius": "50%", "background-color": "#8366c8" } })
                                      ]),
                                      vue.createElementVNode("view", { style: { "text-align": "center", "display": "flex", "justify-content": "center", "align-items": "center" } }, [
                                        vue.createElementVNode(
                                          "text",
                                          { style: { "font-size": "15px" } },
                                          "出生年月:" + vue.toDisplayString(item.birth),
                                          1
                                          /* TEXT */
                                        )
                                      ])
                                    ])
                                  ]),
                                  vue.createElementVNode("view", { style: { "margin-left": "auto", "display": "flex", "justify-content": "center", "align-items": "center" } }, [
                                    index2 != 0 ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                                      key: 0,
                                      type: "trash-filled",
                                      size: "28",
                                      color: "#b2b2b2",
                                      onClick: ($event) => $options.deleteuser(index2)
                                    }, null, 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
                                    vue.createVNode(_component_uni_icons, {
                                      type: "compose",
                                      size: "28",
                                      color: "#b2b2b2",
                                      onClick: ($event) => $options.changeuser(index2, item)
                                    }, null, 8, ["onClick"])
                                  ])
                                ])
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["open"])
                          ])
                        ]),
                        _: 2
                        /* DYNAMIC */
                      },
                      1024
                      /* DYNAMIC_SLOTS */
                    )
                  ]),
                  _: 2
                  /* DYNAMIC */
                },
                1024
                /* DYNAMIC_SLOTS */
              )
            ])
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      )),
      vue.createVNode(_component_uni_popup, {
        ref: "popup",
        onChange: $options.change
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "info" }, [
            vue.createElementVNode("view", { class: "infobara" }, [
              $data.i2t == "i" ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "Bicon"
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "person-filled",
                  size: "60",
                  color: "#cccccc"
                })
              ])) : $data.i2t == "t" ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 1,
                  class: "Bicon"
                },
                vue.toDisplayString($data.form.username.substring(0, 1)),
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "center", "width": "40%", "position": "absolute", "margin-top": "70rpx" } }, [
                vue.createElementVNode("text", { style: { "font-size": "32rpx", "color": "#755cb5" } }, "编辑用户")
              ])
            ]),
            vue.createElementVNode("view", { class: "infoback" }, [
              vue.createElementVNode("view", { style: { "padding-top": "2%" } }, [
                vue.createVNode(_component_uni_easyinput, {
                  modelValue: $data.form.username,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.form.username = $event),
                  "error-message": $data.error ? "errorMessage" : "",
                  placeholder: "用户名称",
                  "placeholder-style": "font-size:30rpx",
                  clearable: true,
                  primaryColor: "#8366c8",
                  onInput: $options.Binput,
                  onFocus: $options.Bfocus
                }, null, 8, ["modelValue", "error-message", "onInput", "onFocus"]),
                vue.createElementVNode(
                  "text",
                  { style: { "padding-left": "3%", "font-size": "28rpx", "color": "#ff0000" } },
                  vue.toDisplayString($data.errormessgae),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass($data.swc ? "sexg" : "sexb")
                },
                [
                  vue.createElementVNode(
                    "text",
                    {
                      style: vue.normalizeStyle($data.swc ? "padding-left: 3%; color: #ffacd2; font-size: 30rpx;" : "padding-left: 3%; color: #66CCFF; font-size: 30rpx;")
                    },
                    "性别",
                    4
                    /* STYLE */
                  ),
                  vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "flex-end", "align-items": "center", "margin-left": "auto", "padding-right": "3%" } }, [
                    vue.createElementVNode(
                      "text",
                      {
                        class: vue.normalizeClass($data.swc ? "textsex" : "textsexb")
                      },
                      "男",
                      2
                      /* CLASS */
                    ),
                    vue.createElementVNode("view", { style: { "height": "100%", "display": "flex", "justify-content": "center", "align-items": "center", "padding": "0 2%" } }, [
                      vue.createElementVNode("switch", {
                        color: "#ffacd2",
                        checked: $data.swc ? true : false,
                        style: { "transform": "scale(0.7)", "align-items": "center", "dispaly": "flex" },
                        onChange: _cache[1] || (_cache[1] = (...args) => $options.switchchange && $options.switchchange(...args))
                      }, null, 40, ["checked"])
                    ]),
                    vue.createElementVNode(
                      "text",
                      {
                        class: vue.normalizeClass($data.swc ? "textsexg" : "textsex")
                      },
                      "女",
                      2
                      /* CLASS */
                    )
                  ])
                ],
                2
                /* CLASS */
              ),
              vue.createElementVNode("view", { style: { "height": "6vh", "margin-bottom": "7%", "display": "flex", "align-items": "center", "border-radius": "40rpx", "border": "2rpx solid #ccc" } }, [
                vue.createElementVNode("picker", {
                  mode: "date",
                  value: $data.form.birth,
                  start: "1900-01",
                  end: $data.currenttime,
                  fields: "month",
                  onChange: _cache[2] || (_cache[2] = (...args) => $options.bindDateChange && $options.bindDateChange(...args)),
                  style: { "width": "100%", "height": "100%", "display": "flex", "align-items": "center", "padding-left": "3%" }
                }, [
                  vue.createElementVNode(
                    "text",
                    {
                      style: vue.normalizeStyle($data.form.age === "" ? "font-size:30rpx; color: #a2a2a2; width: 100%; white-space: nowrap;" : "font-size:30rpx; color: #000000; width: 100%; white-space: nowrap;")
                    },
                    vue.toDisplayString($data.form.birth),
                    5
                    /* TEXT, STYLE */
                  )
                ], 40, ["value", "end"])
              ]),
              vue.createElementVNode("view", { style: { "height": "6vh", "display": "flex", "align-items": "center", "border-radius": "40rpx" } }, [
                vue.createElementVNode(
                  "button",
                  {
                    class: vue.normalizeClass($data.form.username === "" || $data.form.age === "" || $data.form.username == $data.infoman[$data.changeindex].username && $data.form.age == $data.infoman[$data.changeindex].age && $data.form.sex == $data.infoman[$data.changeindex].sex ? "noB-bt" : "B-bt"),
                    onClick: _cache[3] || (_cache[3] = (...args) => $options.adduser && $options.adduser(...args))
                  },
                  vue.toDisplayString($data.Bttext),
                  3
                  /* TEXT, CLASS */
                )
              ])
            ])
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["onChange"]),
      vue.createVNode(
        _component_uni_popup,
        {
          ref: "delete",
          "is-mask-click": false
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "width": "280px", "height": "130px", "background-color": "#fff", "border-radius": "2vh" } }, [
              vue.createElementVNode("view", { style: { "text-align": "center", "display": "flex", "justify-content": "center", "align-items": "center", "padding-top": "20px" } }, [
                vue.createElementVNode("text", { style: { "color": "#8366c8", "font-size": "20px" } }, "请确定删除该用户?")
              ]),
              vue.createElementVNode("view", { style: { "text-align": "center", "display": "flex", "justify-content": "center", "align-items": "center" } }, [
                vue.createElementVNode("text", { style: { "color": "#b2b2b2", "font-size": "14px" } }, "*删除用户后报告也跟随删除且无法还原")
              ]),
              vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "space-around", "align-items": "center", "margin-top": "15px" } }, [
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("button", {
                    onClick: _cache[4] || (_cache[4] = (...args) => $options.cancel && $options.cancel(...args)),
                    style: { "font-size": "16px", "border-radius": "18px", "background-color": "#ECEFF1", "color": "#b2b2b2" }
                  }, "取消")
                ]),
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("button", {
                    onClick: _cache[5] || (_cache[5] = (...args) => $options.deletefinish && $options.deletefinish(...args)),
                    style: { "border-radius": "18px", "font-size": "16px", "background-color": "#8366c8", "color": "#fff" }
                  }, "确定")
                ])
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      )
    ]);
  }
  const PagesUserAlluser = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "F:/SkinApp/App01/pages/user/alluser.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        form: {
          username: "默认用户",
          sex: "男",
          age: 0,
          date: "Wed, 03 Jan 2024 00:00:00 GMT",
          imgurl: "../../static/user.jpg"
        },
        result: {
          Wsicknessname: [1, 1, 0],
          Csicknessname: [1, 1, 0],
          isChinesemedicine: [1, 1, 0],
          Wsymptoms: [1, 1, 0],
          Csymptoms: [1, 1, 0],
          Wcause: [1, 1, 0],
          Ccause: [1, 1, 0],
          Wtreatment: [1, 1, 0],
          Ctreatment: [1, 1, 0],
          urgency: [1, 1, 0],
          sicknessimg: ["../../static/user.jpg", "../../static/user.jpg", "../../static/user.jpg"],
          probability: [90, 70, 60]
        },
        test: [0, 0, 0],
        imgsize: 0,
        imagesize: 0,
        pglist: [80, 60, 40],
        time1: null
      };
    },
    onLoad: function(option) {
      if (!option || !option.result) {
        return;
      }
      const result = JSON.parse(decodeURIComponent(option.result));
      this.form.imgurl = result.resultimg;
      this.form.username = result.username;
      this.form.age = result.age;
      this.form.sex = result.sex;
      this.form.date = this.formatDate(result.date);
      for (let i = 0; i < 3; i++) {
        this.result.sicknessimg[i] = result[`sicknessimg${i + 1}`];
        this.result.Wsicknessname[i] = result[`Wsicknessname${i + 1}`];
        this.result.Csicknessname[i] = result[`Csicknessname${i + 1}`];
        this.result.isChinesemedicine[i] = result[`isChinesemedicine${i + 1}`];
        this.result.Wsymptoms[i] = result[`Wsymptoms${i + 1}`];
        this.result.Csymptoms[i] = result[`Csymptoms${i + 1}`];
        this.result.Wtreatment[i] = this.formatText(result[`Wtreatment${i + 1}`]);
        this.result.Ctreatment[i] = this.formatText(result[`Ctreatment${i + 1}`]);
        this.result.Wcause[i] = result[`Wcause${i + 1}`];
        this.result.Ccause[i] = result[`Ccause${i + 1}`];
        this.result.urgency[i] = result[`urgency${i + 1}`];
        this.result.probability[i] = result[`probability${i + 1}`];
      }
    },
    onShow() {
      this.$device(function(result) {
        if (result == 2) {
          uni.showToast({
            icon: "error",
            title: "账号在异地登录",
            mask: true
          });
          setTimeout(() => {
            uni.reLaunch({
              url: "/pages/index/index"
            });
          }, 1e3);
        } else if (result == 4) {
          setTimeout(() => {
            uni.reLaunch({
              url: "/pages/index/index"
            });
          }, 1e3);
        } else {
          let user1 = uni.getStorageSync("user");
          if (!user1) {
            uni.showToast({
              icon: "none",
              title: "未登录",
              "mask": true
            });
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/index/index"
              });
            }, 1e3);
          }
        }
      });
      this.time1 = setInterval(() => {
        this.$device(function(result) {
          if (result == 2) {
            uni.showToast({
              icon: "error",
              title: "账号在异地登录",
              mask: true
            });
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/index/index"
              });
            }, 1e3);
          } else if (result == 4) {
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/index/index"
              });
            }, 1e3);
          } else {
            let user1 = uni.getStorageSync("user");
            if (!user1) {
              uni.showToast({
                icon: "none",
                title: "未登录",
                "mask": true
              });
              setTimeout(() => {
                uni.reLaunch({
                  url: "/pages/index/index"
                });
              }, 1e3);
            }
          }
        });
      }, 36e5);
    },
    onHide() {
      clearInterval(this.time1);
      this.time1 = null;
    },
    onReady() {
      var that = this;
      const query0 = uni.createSelectorQuery().in(this);
      query0.select(".images").boundingClientRect((data0) => {
        that.imagesize = data0.height;
      }).exec();
      const query1 = uni.createSelectorQuery().in(this);
      query1.select(".img").boundingClientRect((data1) => {
        that.imgsize = data1.height;
      }).exec();
    },
    methods: {
      formatText(text) {
        const newText = text.replace(/。(\d)/g, "。\n$1");
        return newText;
      },
      clickImg() {
        var that = this;
        if (this.form.imgurl != "../../static/user.jpg") {
          uni.showLoading({
            mask: true
          });
          base64ToPath(this.form.imgurl).then((path) => {
            uni.hideLoading();
            that.form.imgurl = path;
            uni.previewImage({
              urls: [that.form.imgurl]
            });
          }).catch((error) => {
            uni.hideLoading();
            uni.previewImage({
              urls: [that.form.imgurl]
            });
          });
        } else {
          uni.previewImage({
            urls: [that.form.imgurl]
          });
        }
      },
      exit() {
        uni.switchTab({
          url: "/pages/user/user"
        });
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}/${month}/${day}`;
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_0);
    const _component_uni_collapse_item = resolveEasycom(vue.resolveDynamicComponent("uni-collapse-item"), __easycom_1$1);
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_2);
    const _component_uni_collapse = resolveEasycom(vue.resolveDynamicComponent("uni-collapse"), __easycom_3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "saveimage" }, [
      vue.createElementVNode("view", { style: { "background-color": "#8366c8", "padding-top": "1%", "padding-bottom": "5%", "width": "100vw", "display": "flex", "justify-content": "center", "align-items": "center" } }, [
        vue.createVNode(_component_uni_card, {
          "is-full": true,
          style: { "white-space": "nowrap", "text-overflow": "ellipsis", "margin-top": "3%", "margin-left": "5%", "margin-right": "5%", "border-radius": "30rpx" }
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: "img",
              style: { "height": "8vh", "display": "flex", "justify-content": "flex-start", "align-items": "center" }
            }, [
              vue.createElementVNode(
                "view",
                {
                  style: vue.normalizeStyle({ height: $data.imgsize + "px", width: $data.imgsize + "px", "border-radius": $data.imgsize + "px", overflow: "hidden" })
                },
                [
                  vue.createElementVNode("image", {
                    src: $data.form.imgurl,
                    mode: "aspectFill",
                    style: { "width": "100%", "height": "100%" },
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clickImg && $options.clickImg(...args))
                  }, null, 8, ["src"])
                ],
                4
                /* STYLE */
              ),
              vue.createElementVNode("view", { style: { "flex": "1", "display": "flex", "justify-content": "center", "align-items": "center", "white-space": "nowrap", "overflow": "hidden", "text-overflow": "ellipsis" } }, [
                vue.createElementVNode(
                  "text",
                  { style: { "font-size": "20px", "color": "#000", "white-space": "nowrap", "overflow": "hidden", "text-overflow": "ellipsis" } },
                  vue.toDisplayString($data.form.username),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("view", { style: { "white-space": "nowrap", "text-overflow": "ellipsis", "width": "100%", "display": "flex", "align-items": "center", "justify-content": "flex-start", "padding-top": "2%", "margin-top": "2%", "border-top": "2rpx solid #b2b2b2" } }, [
              vue.createElementVNode("view", { style: { "white-space": "nowrap", "text-overflow": "ellipsis" } }, [
                vue.createElementVNode(
                  "text",
                  { style: { "color": "#b0adbd", "font-size": "30rpx" } },
                  "日期:" + vue.toDisplayString($options.formatDate($data.form.date)),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "as0" }, [
                vue.createElementVNode(
                  "view",
                  { class: "half-width0" },
                  vue.toDisplayString($data.form.age),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "separator0" }, "|"),
                vue.createElementVNode(
                  "view",
                  { class: "half-width0" },
                  vue.toDisplayString($data.form.sex),
                  1
                  /* TEXT */
                )
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        })
      ]),
      vue.createElementVNode("view", { style: { "overflow": "auto", "height": "60vh" } }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.test, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock("view", { key: index2 }, [
              vue.createElementVNode("view", { style: { "padding-top": "3%", "padding-bottom": "3%", "background-color": "#ECEFF1", "display": "flex", "justify-content": "center" } }, [
                vue.createVNode(
                  _component_uni_card,
                  {
                    "is-full": true,
                    style: { "white-space": "nowrap", "text-overflow": "ellipsis", "margin-left": "5%", "margin-right": "5%", "border-radius": "30rpx" }
                  },
                  {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("view", { style: { "white-space": "nowrap", "display": "flex", "justify-content": "flex-start", "align-items": "center", "text-overflow": "ellipsis", "margin-bottom": "2%", "padding-bottom": "2%", "border-bottom": "2rpx solid #b2b2b2" } }, [
                        $data.result.isChinesemedicine[index2] == 0 ? (vue.openBlock(), vue.createElementBlock("text", {
                          key: 0,
                          style: { "font-size": "16px", "color": "#b2b2b2", "white-space": "nowrap", "text-overflow": "ellipsis", "overflow": "hidden" }
                        }, "西医：")) : vue.createCommentVNode("v-if", true),
                        $data.result.isChinesemedicine[index2] == 0 ? (vue.openBlock(), vue.createElementBlock(
                          "text",
                          {
                            key: 1,
                            style: { "font-size": "20px", "color": "#000", "white-space": "nowrap", "text-overflow": "ellipsis", "overflow": "hidden" }
                          },
                          vue.toDisplayString($data.result.Wsicknessname[index2]),
                          1
                          /* TEXT */
                        )) : vue.createCommentVNode("v-if", true),
                        $data.result.isChinesemedicine[index2] == 1 ? (vue.openBlock(), vue.createElementBlock("text", {
                          key: 2,
                          style: { "font-size": "16px", "color": "#b2b2b2", "white-space": "nowrap", "text-overflow": "ellipsis", "overflow": "hidden" }
                        }, "西医：")) : vue.createCommentVNode("v-if", true),
                        $data.result.isChinesemedicine[index2] == 1 ? (vue.openBlock(), vue.createElementBlock(
                          "text",
                          {
                            key: 3,
                            style: { "font-size": "20px", "color": "#000", "white-space": "nowrap", "text-overflow": "ellipsis", "overflow": "hidden" }
                          },
                          vue.toDisplayString($data.result.Wsicknessname[index2]),
                          1
                          /* TEXT */
                        )) : vue.createCommentVNode("v-if", true),
                        $data.result.isChinesemedicine[index2] == 1 ? (vue.openBlock(), vue.createElementBlock("text", {
                          key: 4,
                          style: { "margin-left": "auto", "font-size": "16px", "color": "#b2b2b2", "white-space": "nowrap", "text-overflow": "ellipsis", "overflow": "hidden" }
                        }, "中医：")) : vue.createCommentVNode("v-if", true),
                        $data.result.isChinesemedicine[index2] == 1 ? (vue.openBlock(), vue.createElementBlock(
                          "text",
                          {
                            key: 5,
                            style: { "font-size": "20px", "color": "#000", "white-space": "nowrap", "text-overflow": "ellipsis", "overflow": "hidden" }
                          },
                          vue.toDisplayString($data.result.Csicknessname[index2]),
                          1
                          /* TEXT */
                        )) : vue.createCommentVNode("v-if", true)
                      ]),
                      vue.createElementVNode("view", {
                        class: "images",
                        style: { "height": "6vh", "display": "flex", "justify-content": "flex-start", "align-items": "center" }
                      }, [
                        vue.createElementVNode(
                          "view",
                          {
                            style: vue.normalizeStyle({ height: $data.imagesize + "px", width: $data.imagesize + "px", "border-radius": $data.imagesize + "px", overflow: "hidden", "margin-right": "2%" })
                          },
                          [
                            vue.createElementVNode("image", {
                              src: $data.result.sicknessimg[index2],
                              mode: "aspectFill",
                              style: { "width": "100%", "height": "100%" }
                            }, null, 8, ["src"])
                          ],
                          4
                          /* STYLE */
                        ),
                        vue.createElementVNode("view", { style: { "flex": "1" } }, [
                          vue.createElementVNode("progress", {
                            percent: $data.result.probability[index2],
                            "stroke-width": "8",
                            style: { "overflow": "hidden", "border-radius": "30rpx" },
                            activeColor: "#857BE8"
                          }, null, 8, ["percent"])
                        ])
                      ]),
                      vue.createElementVNode("view", null, [
                        vue.createVNode(
                          _component_uni_collapse,
                          null,
                          {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("view", null, [
                                vue.createVNode(
                                  _component_uni_collapse_item,
                                  {
                                    thumb: "../../static/cw/fire.png",
                                    title: "就医紧急度"
                                  },
                                  {
                                    default: vue.withCtx(() => [
                                      vue.createElementVNode("view", { style: { "padding": "0 20px", "word-break": "break-all", "font-size": "15px" } }, [
                                        vue.createElementVNode(
                                          "text",
                                          null,
                                          vue.toDisplayString($data.result.urgency[index2]),
                                          1
                                          /* TEXT */
                                        )
                                      ])
                                    ]),
                                    _: 2
                                    /* DYNAMIC */
                                  },
                                  1024
                                  /* DYNAMIC_SLOTS */
                                )
                              ]),
                              vue.createElementVNode("view", null, [
                                vue.createVNode(_component_uni_collapse_item, {
                                  thumb: "../../static/cw/W.png",
                                  "title-border": $data.result.isChinesemedicine[index2] == 1 ? "auto" : "none",
                                  title: "西医"
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createElementVNode("view", { style: { "padding": "0 15px", "display": "flex", "justify-content": "flex-start" } }, [
                                      vue.createElementVNode("view", { style: { "margin": "0 1%" } }, [
                                        vue.createVNode(_component_uni_icons, {
                                          type: "calendar-filled",
                                          size: "24",
                                          color: "#bcbcbc"
                                        })
                                      ]),
                                      vue.createElementVNode("view", { style: { "flex": "1", "padding": "0 5px" } }, [
                                        vue.createElementVNode("view", { style: { "word-break": "keep-all", "overflow": "hidden" } }, [
                                          vue.createElementVNode("text", { style: { "color": "#a2a2a2" } }, "典型症状")
                                        ]),
                                        vue.createElementVNode("view", { style: { "word-break": "break-all", "font-size": "15px" } }, [
                                          vue.createElementVNode(
                                            "text",
                                            null,
                                            vue.toDisplayString($data.result.Wsymptoms[index2]),
                                            1
                                            /* TEXT */
                                          )
                                        ])
                                      ])
                                    ]),
                                    vue.createElementVNode("view", { style: { "padding": "0 15px", "display": "flex", "justify-content": "flex-start" } }, [
                                      vue.createElementVNode("view", { style: { "margin": "0 1%" } }, [
                                        vue.createVNode(_component_uni_icons, {
                                          type: "info-filled",
                                          size: "24",
                                          color: "#bcbcbc"
                                        })
                                      ]),
                                      vue.createElementVNode("view", { style: { "flex": "1", "padding": "0 5px" } }, [
                                        vue.createElementVNode("view", { style: { "word-break": "keep-all", "overflow": "hidden" } }, [
                                          vue.createElementVNode("text", { style: { "color": "#a2a2a2" } }, "可能病因")
                                        ]),
                                        vue.createElementVNode("view", { style: { "word-break": "break-all", "font-size": "15px" } }, [
                                          vue.createElementVNode(
                                            "text",
                                            null,
                                            vue.toDisplayString($data.result.Wcause[index2]),
                                            1
                                            /* TEXT */
                                          )
                                        ])
                                      ])
                                    ]),
                                    vue.createElementVNode("view", { style: { "padding": "0 15px", "display": "flex", "justify-content": "flex-start" } }, [
                                      vue.createElementVNode("view", { style: { "margin": "0 1%" } }, [
                                        vue.createVNode(_component_uni_icons, {
                                          type: "plusempty",
                                          size: "24",
                                          color: "#bcbcbc"
                                        })
                                      ]),
                                      vue.createElementVNode("view", { style: { "flex": "1", "padding": "0 5px" } }, [
                                        vue.createElementVNode("view", { style: { "word-break": "keep-all", "overflow": "hidden" } }, [
                                          vue.createElementVNode("text", { style: { "color": "#a2a2a2" } }, "治疗方法")
                                        ]),
                                        vue.createElementVNode("view", { style: { "white-space": "normal", "font-size": "15px" } }, [
                                          vue.createElementVNode(
                                            "text",
                                            null,
                                            vue.toDisplayString($data.result.Wtreatment[index2]),
                                            1
                                            /* TEXT */
                                          )
                                        ])
                                      ])
                                    ])
                                  ]),
                                  _: 2
                                  /* DYNAMIC */
                                }, 1032, ["title-border"])
                              ]),
                              $data.result.isChinesemedicine[index2] == 1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                                vue.createVNode(
                                  _component_uni_collapse_item,
                                  {
                                    thumb: "../../static/cw/C.png",
                                    "title-border": "none",
                                    title: "中医"
                                  },
                                  {
                                    default: vue.withCtx(() => [
                                      vue.createElementVNode("view", { style: { "padding": "0 15px", "display": "flex", "justify-content": "flex-start" } }, [
                                        vue.createElementVNode("view", { style: { "margin": "0 1%" } }, [
                                          vue.createVNode(_component_uni_icons, {
                                            type: "calendar-filled",
                                            size: "24",
                                            color: "#bcbcbc"
                                          })
                                        ]),
                                        vue.createElementVNode("view", { style: { "flex": "1", "padding": "0 5px" } }, [
                                          vue.createElementVNode("view", { style: { "word-break": "keep-all", "overflow": "hidden" } }, [
                                            vue.createElementVNode("text", { style: { "color": "#a2a2a2" } }, "典型症状")
                                          ]),
                                          vue.createElementVNode("view", { style: { "word-break": "break-all", "font-size": "15px" } }, [
                                            vue.createElementVNode(
                                              "text",
                                              null,
                                              vue.toDisplayString($data.result.Csymptoms[index2]),
                                              1
                                              /* TEXT */
                                            )
                                          ])
                                        ])
                                      ]),
                                      vue.createElementVNode("view", { style: { "padding": "0 15px", "display": "flex", "justify-content": "flex-start" } }, [
                                        vue.createElementVNode("view", { style: { "margin": "0 1%" } }, [
                                          vue.createVNode(_component_uni_icons, {
                                            type: "info-filled",
                                            size: "24",
                                            color: "#bcbcbc"
                                          })
                                        ]),
                                        vue.createElementVNode("view", { style: { "flex": "1", "padding": "0 5px" } }, [
                                          vue.createElementVNode("view", { style: { "word-break": "keep-all", "overflow": "hidden" } }, [
                                            vue.createElementVNode("text", { style: { "color": "#a2a2a2" } }, "可能病因")
                                          ]),
                                          vue.createElementVNode("view", { style: { "white-space": "normal", "font-size": "15px" } }, [
                                            vue.createElementVNode(
                                              "text",
                                              null,
                                              vue.toDisplayString($data.result.Ccause[index2]),
                                              1
                                              /* TEXT */
                                            )
                                          ])
                                        ])
                                      ]),
                                      vue.createElementVNode("view", { style: { "padding": "0 15px", "display": "flex", "justify-content": "flex-start" } }, [
                                        vue.createElementVNode("view", { style: { "margin": "0 1%" } }, [
                                          vue.createVNode(_component_uni_icons, {
                                            type: "plusempty",
                                            size: "24",
                                            color: "#bcbcbc"
                                          })
                                        ]),
                                        vue.createElementVNode("view", { style: { "flex": "1", "padding": "0 5px" } }, [
                                          vue.createElementVNode("view", { style: { "word-break": "keep-all", "overflow": "hidden" } }, [
                                            vue.createElementVNode("text", { style: { "color": "#a2a2a2" } }, "治疗方法")
                                          ]),
                                          vue.createElementVNode("view", { style: { "white-space": "normal", "font-size": "15px" } }, [
                                            vue.createElementVNode(
                                              "text",
                                              null,
                                              vue.toDisplayString($data.result.Ctreatment[index2]),
                                              1
                                              /* TEXT */
                                            )
                                          ])
                                        ])
                                      ])
                                    ]),
                                    _: 2
                                    /* DYNAMIC */
                                  },
                                  1024
                                  /* DYNAMIC_SLOTS */
                                )
                              ])) : vue.createCommentVNode("v-if", true)
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        )
                      ])
                    ]),
                    _: 2
                    /* DYNAMIC */
                  },
                  1024
                  /* DYNAMIC_SLOTS */
                )
              ])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createElementVNode("view", { style: { "word-wrap": "break-word", "padding": "1% 5vw", "background-color": "#ECEFF1" } }, [
        vue.createElementVNode("view", { style: { "background-color": "#ECEFF1", "display": "flex", "justify-content": "flex-start", "align-items": "center" } }, [
          vue.createElementVNode("image", {
            style: { "height": "36px", "width": "36px" },
            src: "/static/cw/icon.png",
            mode: "aspectFit"
          }),
          vue.createElementVNode("text", { style: { "padding-left": "2%", "color": "#000", "font-size": "16px", "font-weight": "bold" } }, "SkinCloud")
        ]),
        vue.createElementVNode("text", { style: { "font-size": "14px", "color": "#b2b2b2" } }, "*注:本结果不代表临床诊断，如有紧急情况请及时就医\\n"),
        vue.createElementVNode("text", { style: { "font-size": "14px", "color": "#b2b2b2" } }, "*尊重用户的隐私，皮肤云保护用户历史数据")
      ])
    ]);
  }
  const PagesUserResult = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "F:/SkinApp/App01/pages/user/result.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {};
    },
    onShow() {
    },
    methods: {}
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { style: { "margin": "5% 5%" } }, [
        vue.createElementVNode("view", null, [
          vue.createElementVNode("text", { style: { "font-size": "50rpx", "text-align": "center", "white-space": "nowrap", "color": "#8366c8" } }, "皮肤云肤测汇系统使用条款")
        ]),
        vue.createElementVNode("view", null, [
          vue.createElementVNode("text", { style: { "font-size": "28rpx", "color": "#ccc", "white-space": "nowrap" } }, "最后修订:2024年3月20日")
        ]),
        vue.createElementVNode("view", { style: { "margin-top": "6%", "color": "#868686" } }, [
          vue.createElementVNode("text", { class: "text" }, ' 使用《皮肤云用户协议及隐私政策》（以下简称 “协议”或"政策"）及其条款，系确立您与皮肤云之间就下载、安装及使用该软件（以下简称“本软件”或“本应用”）所订立的、描述您与本应用之间权利义务的协议。在注册前务必认真阅读本协议的内容、充分理解各条款内容，如有异议，您可选择不进入本应用。一旦您确认本用户注册协议后，本协议即在您和本应用之间产生法律效力，意味着您完全同意并接受协议的全部条款。请您审慎阅读并选择接受或不接受协议（未成年人应在法定监护人陪同下阅读）。 ')
        ]),
        vue.createElementVNode("view", { style: { "color": "#868686", "margin-top": "6%" } }, [
          vue.createElementVNode("text", {
            class: "text",
            style: { "color": "#000" }
          }, "1.概述"),
          vue.createElementVNode("br"),
          vue.createElementVNode("text", { class: "text" }, "[肤测汇]是[皮肤云]的一款在线皮肤健康中西医测评与汇集系统(以下简称[皮肤中西医智能测评汇集])。"),
          vue.createElementVNode("br"),
          vue.createElementVNode("text", { class: "text" }, "本使用条款是您使用[皮肤中西医智能测评汇集]的协议条款。访问或使用[皮肤中西医智能测评汇集]，即表示您已经阅读、理解并同意接受该[协议]的约束，同意遵守所有适用的法律和法规。如果您不同意这些条款，请勿使用[皮肤中西医智能测评汇集服务]。"),
          vue.createElementVNode("br"),
          vue.createElementVNode("text", { class: "text" }, "[肤测汇]提供的服务不适合也不应当被视为任何形式的诊疗服务。我们不提供任何紧急医疗服务或面对面的诊断或治疗。该服务旨在补充而不是取代医生、医院或其他医疗服务提供者为您提供的服务，您不能凭借或依据[肤测汇]提供的信息进行疾病治疗。如果您参考[肤测汇]提供的信息，在自行治疗出现任何问题，[肤测汇]即所属[皮肤云]不会因此承担任何责任。"),
          vue.createElementVNode("br"),
          vue.createElementVNode("text", { class: "text" }, "[肤测汇]有权在必要时单方修改服务协议以及[皮肤中西医智能测评汇集]中包含的任何其他信息，不再另行单独通知。修改后的服务协议一经发布即代替旧版本服务协议，自动更新为您与[肤测汇]之间具有约束力的协议。")
        ]),
        vue.createElementVNode("view", { style: { "color": "#868686", "margin-top": "6%" } }, [
          vue.createElementVNode("text", {
            class: "text",
            style: { "color": "#000" }
          }, "2.一般条款"),
          vue.createElementVNode("br"),
          vue.createElementVNode("text", { class: "text" }, '[使用条款]还包含所有权/版权申明和隐私条款，您除了必须遵守[使用条款]，还必须服从所有权/版权申明以及隐私条款。所有权/版权申明和隐私条款，请点击"SkinCloud服务协议"的链接查看完整条款。'),
          vue.createElementVNode("br"),
          vue.createElementVNode("text", { class: "text" }, "在您同意遵守[使用条款]、相关法律规定的前提下，皮肤云授予您一份非专属的、不可转让的有限许可，允许您作为用户访问和使用[皮肤中西医智能测评汇集]。此项许可不包括您恶意使用[皮肤中西医智能测评汇集]，或为了任何侵权的目的使用[皮肤中西医智能测评汇集]。"),
          vue.createElementVNode("br"),
          vue.createElementVNode("text", { class: "text" }, "除了上一段所属的有限许可权，皮肤云并未授予您任何明示的或默示的专利、版权或其他专有权、知识产权的权利或许可。您不得在另一个网站或者移动端应用或任何其他介质使用或复制[皮肤中西医智能测评汇集]的任何内容。如果您未能遵守[使用条款]，将会导致授予您的任何权利被自动终止，而无需事先通知，并且您必须立刻停止使用[皮肤中西医智能测评汇集]并销毁持有、保管或控制的所有[皮肤中西医智能测评汇集]资料。")
        ]),
        vue.createElementVNode("view", { style: { "color": "#868686", "margin-top": "6%" } }, [
          vue.createElementVNode("text", {
            class: "text",
            style: { "color": "#000" }
          }, "3.免责声明"),
          vue.createElementVNode("br"),
          vue.createElementVNode("text", { class: "text" }, "使用[皮肤中西医智能测评汇集]的所有风险由您自行承担。"),
          vue.createElementVNode("br"),
          vue.createElementVNode("text", { class: "text" }, "[皮肤中西医智能测评汇集]并非医疗机构，其给出的结果列表系基于您提供的有限数以及医疗人工智能模型算法，任何反馈结果不但不代表[皮肤云]同意其说法，对任何反馈结果和建议或由其造成的后果亦不承担任何责任。"),
          vue.createElementVNode("br"),
          vue.createElementVNode("text", { class: "text" }, "[皮肤中西医智能测评汇集]有时可能会包含不准确的反馈信息或文字错误，我们对任何发布信息的准确性不做任何保证。"),
          vue.createElementVNode("br"),
          vue.createElementVNode("text", { class: "text" }, '所有资料、信息、产品、软件、程序和服务均"按现状"提供，[皮肤云]对此不提供任何形式的保证或担保。'),
          vue.createElementVNode("br"),
          vue.createElementVNode("text", { class: "text" }, "[皮肤云]明确免除法律多允许的最大范围内的所有明示的、默示的、法定的及其他保证、担保或陈述，包括但不限于有关时效性、适用于某种特定用途、不侵犯所有权和知识产权的保证。不存在任何限制，[皮肤云]不保证[皮肤中西医智能测评汇集]将连续运行、及时、安全或无错误。")
        ]),
        vue.createElementVNode("view", { style: { "color": "#868686", "margin-top": "6%" } }, [
          vue.createElementVNode("text", {
            class: "text",
            style: { "color": "#000" }
          }, "4.保密信息"),
          vue.createElementVNode("br"),
          vue.createElementVNode("text", { class: "text" }, "[皮肤云]并不希望通过[皮肤中西医智能测评汇集]接受您的保密信息或专有信息。您同意您在[皮肤中西医智能测评汇集]上上传或输入的所有信息或资料将被视为非保密信息。将任何信息或资料发送给[皮肤云]，即表示您就该信息与资料授予[皮肤云]不受限制的、不可撤销的使用许可。")
        ]),
        vue.createElementVNode("view", { style: { "color": "#868686", "margin-top": "6%" } }, [
          vue.createElementVNode("text", {
            class: "text",
            style: { "color": "#000" }
          }, "5.业务关系"),
          vue.createElementVNode("br"),
          vue.createElementVNode("text", { class: "text" }, "[皮肤中西医智能测评汇集]可能提供非[皮肤云]网址和资源的链接或引用。[皮肤云]对于引用的，或可从[皮肤中西医智能测评汇集]进行访问的，或链接到任何[皮肤中西医智能测评汇集]的任何非[皮肤云]网址或第三方资源不做任何声明、保证、认可或其他承诺。")
        ]),
        vue.createElementVNode("view", { style: { "color": "#868686", "margin-top": "6%" } }, [
          vue.createElementVNode("text", {
            class: "text",
            style: { "color": "#000" }
          }, "6.责任限制"),
          vue.createElementVNode("br"),
          vue.createElementVNode("text", { class: "text" }, "在适用法律允许的最大范围内，在任何情况下，对于与[皮肤中西医智能测评汇集]有关的、由[皮肤中西医智能测评汇集]引起的或者使用[皮肤中西医智能测评汇集]、使用通过[皮肤中西医智能测评汇集]链接到的、引用的或访问的任何站点或资源，或者使用、下载或访问任何上述站点的资料、信息、产品或服务而造成的任何直接的、间接的、附带的、特别的、惩罚性的或其他后果性的损害，[体素科技]均不对任何一方负责。")
        ])
      ])
    ]);
  }
  const PagesAgreementAgreement = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "F:/SkinApp/App01/pages/agreement/agreement.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/register/register", PagesRegisterRegister);
  __definePage("pages/forget/forget", PagesForgetForget);
  __definePage("pages/forget/forget2", PagesForgetForget2);
  __definePage("pages/detect/detect1", PagesDetectDetect1);
  __definePage("pages/detect/detect2", PagesDetectDetect2);
  __definePage("pages/detect/detect3", PagesDetectDetect3);
  __definePage("pages/user/user", PagesUserUser);
  __definePage("pages/user/alluser", PagesUserAlluser);
  __definePage("pages/user/result", PagesUserResult);
  __definePage("pages/agreement/agreement", PagesAgreementAgreement);
  const _sfc_main = {
    onLaunch: function() {
    },
    onShow: function() {
    },
    onHide: function() {
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/SkinApp/App01/App.vue"]]);
  const BASE_URL = "http://172.19.206.68:5000";
  function device(callback) {
    const userData = uni.getStorageSync("user");
    if (userData) {
      const deviceid = uni.getDeviceInfo().deviceId;
      var that = this;
      uni.request({
        url: this.$BASE_URL + "/devicelogin",
        method: "POST",
        header: { Authorization: "Bearer " + userData.access_token },
        data: { "deviceid": deviceid },
        success: (res) => {
          const data = res.data;
          if (res.statusCode == 401) {
            uni.request({
              url: that.$BASE_URL + "/refresh",
              header: { Authorization: "Bearer " + userData.refresh_token },
              method: "GET",
              success: (res2) => {
                const data2 = res2.data;
                if (res2.statusCode == 401) {
                  uni.showToast({
                    icon: "none",
                    title: "登录已过期"
                  });
                  uni.removeStorage({
                    key: "user"
                  });
                  callback(4);
                } else if (data2.code == "200") {
                  formatAppLog("log", "at utils/device.js:31", data2.data);
                  uni.setStorageSync("user", data2.data);
                  uni.setStorage({
                    key: "user",
                    data: {
                      refresh_token: userData.refresh_token,
                      access_token: data2.data
                    }
                  });
                  setTimeout(() => {
                    that.device();
                  }, 1e3);
                }
              },
              fail: (err) => {
                if (err.statusCode === 404) {
                  uni.showToast({
                    icon: "none",
                    title: "请求失败，找不到资源"
                  });
                } else if (err.statusCode === 500) {
                  uni.showToast({
                    icon: "none",
                    title: "服务器内部错误，请稍后重试"
                  });
                } else {
                  uni.showToast({
                    icon: "none",
                    title: "请求失败，请稍后重试"
                  });
                }
                callback(0);
              }
            });
          } else if (data.code == "200") {
            callback(1);
          } else if (data.code == "300") {
            uni.removeStorage({
              key: "user"
            });
            callback(2);
          }
        },
        fail: (err) => {
          if (err.statusCode === 404) {
            uni.showToast({
              icon: "none",
              title: "请求失败，找不到资源"
            });
          } else if (err.statusCode === 500) {
            uni.showToast({
              icon: "none",
              title: "服务器内部错误，请稍后重试"
            });
          } else {
            uni.showToast({
              icon: "none",
              title: "请求失败，请稍后重试"
            });
          }
          callback(0);
        }
      });
    } else {
      callback(0);
    }
  }
  function createApp() {
    const app = vue.createVueApp(App);
    app.config.globalProperties.$BASE_URL = BASE_URL;
    app.config.globalProperties.$device = device;
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
