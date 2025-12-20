import {
  BaseModelHolder,
  Bind,
  Button,
  ButtonModule,
  DefaultValueAccessor,
  Fluid,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  InputText,
  InputTextModule,
  NgControl,
  NgControlStatus,
  NgControlStatusGroup,
  PARENT_INSTANCE,
  ReactiveFormsModule,
  Validators,
  environment,
  ɵNgNoValidate
} from "./chunk-YJCAGOZR.js";
import {
  BaseStyle,
  CommonModule,
  HttpClient,
  NgIf
} from "./chunk-6VLCG72H.js";
import {
  Component,
  Directive,
  EventEmitter,
  HostListener,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  Output,
  __spreadProps,
  __spreadValues,
  booleanAttribute,
  catchError,
  computed,
  delay,
  effect,
  finalize,
  inject,
  input,
  of,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetInheritedFactory,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-GXNLBY5Z.js";

// node_modules/@primeuix/styles/dist/textarea/index.mjs
var style = "\n    .p-textarea {\n        font-family: inherit;\n        font-feature-settings: inherit;\n        font-size: 1rem;\n        color: dt('textarea.color');\n        background: dt('textarea.background');\n        padding-block: dt('textarea.padding.y');\n        padding-inline: dt('textarea.padding.x');\n        border: 1px solid dt('textarea.border.color');\n        transition:\n            background dt('textarea.transition.duration'),\n            color dt('textarea.transition.duration'),\n            border-color dt('textarea.transition.duration'),\n            outline-color dt('textarea.transition.duration'),\n            box-shadow dt('textarea.transition.duration');\n        appearance: none;\n        border-radius: dt('textarea.border.radius');\n        outline-color: transparent;\n        box-shadow: dt('textarea.shadow');\n    }\n\n    .p-textarea:enabled:hover {\n        border-color: dt('textarea.hover.border.color');\n    }\n\n    .p-textarea:enabled:focus {\n        border-color: dt('textarea.focus.border.color');\n        box-shadow: dt('textarea.focus.ring.shadow');\n        outline: dt('textarea.focus.ring.width') dt('textarea.focus.ring.style') dt('textarea.focus.ring.color');\n        outline-offset: dt('textarea.focus.ring.offset');\n    }\n\n    .p-textarea.p-invalid {\n        border-color: dt('textarea.invalid.border.color');\n    }\n\n    .p-textarea.p-variant-filled {\n        background: dt('textarea.filled.background');\n    }\n\n    .p-textarea.p-variant-filled:enabled:hover {\n        background: dt('textarea.filled.hover.background');\n    }\n\n    .p-textarea.p-variant-filled:enabled:focus {\n        background: dt('textarea.filled.focus.background');\n    }\n\n    .p-textarea:disabled {\n        opacity: 1;\n        background: dt('textarea.disabled.background');\n        color: dt('textarea.disabled.color');\n    }\n\n    .p-textarea::placeholder {\n        color: dt('textarea.placeholder.color');\n    }\n\n    .p-textarea.p-invalid::placeholder {\n        color: dt('textarea.invalid.placeholder.color');\n    }\n\n    .p-textarea-fluid {\n        width: 100%;\n    }\n\n    .p-textarea-resizable {\n        overflow: hidden;\n        resize: none;\n    }\n\n    .p-textarea-sm {\n        font-size: dt('textarea.sm.font.size');\n        padding-block: dt('textarea.sm.padding.y');\n        padding-inline: dt('textarea.sm.padding.x');\n    }\n\n    .p-textarea-lg {\n        font-size: dt('textarea.lg.font.size');\n        padding-block: dt('textarea.lg.padding.y');\n        padding-inline: dt('textarea.lg.padding.x');\n    }\n";

// node_modules/primeng/fesm2022/primeng-textarea.mjs
var style2 = (
  /*css*/
  `
    ${style}

    /* For PrimeNG */
    .p-textarea.ng-invalid.ng-dirty {
        border-color: dt('textarea.invalid.border.color');
    }
    .p-textarea.ng-invalid.ng-dirty::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }
`
);
var classes = {
  root: ({
    instance
  }) => ["p-textarea p-component", {
    "p-filled": instance.$filled(),
    "p-textarea-resizable ": instance.autoResize,
    "p-variant-filled": instance.$variant() === "filled",
    "p-textarea-fluid": instance.hasFluid,
    "p-inputfield-sm p-textarea-sm": instance.pSize === "small",
    "p-textarea-lg p-inputfield-lg": instance.pSize === "large",
    "p-invalid": instance.invalid()
  }]
};
var TextareaStyle = class _TextareaStyle extends BaseStyle {
  name = "textarea";
  style = style2;
  classes = classes;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275TextareaStyle_BaseFactory;
    return function TextareaStyle_Factory(__ngFactoryType__) {
      return (\u0275TextareaStyle_BaseFactory || (\u0275TextareaStyle_BaseFactory = \u0275\u0275getInheritedFactory(_TextareaStyle)))(__ngFactoryType__ || _TextareaStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _TextareaStyle,
    factory: _TextareaStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextareaStyle, [{
    type: Injectable
  }], null, null);
})();
var TextareaClasses;
(function(TextareaClasses2) {
  TextareaClasses2["root"] = "p-textarea";
})(TextareaClasses || (TextareaClasses = {}));
var TEXTAREA_INSTANCE = new InjectionToken("TEXTAREA_INSTANCE");
var Textarea = class _Textarea extends BaseModelHolder {
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  $pcTextarea = inject(TEXTAREA_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  /**
   * Used to pass attributes to DOM elements inside the Textarea component.
   * @defaultValue undefined
   * @group Props
   */
  pTextareaPT = input(...ngDevMode ? [void 0, {
    debugName: "pTextareaPT"
  }] : []);
  /**
   * Indicates whether the component should be rendered without styles.
   * @defaultValue undefined
   * @group Props
   */
  pTextareaUnstyled = input(...ngDevMode ? [void 0, {
    debugName: "pTextareaUnstyled"
  }] : []);
  /**
   * When present, textarea size changes as being typed.
   * @group Props
   */
  autoResize;
  /**
   * Defines the size of the component.
   * @group Props
   */
  pSize;
  /**
   * Specifies the input variant of the component.
   * @defaultValue undefined
   * @group Props
   */
  variant = input(...ngDevMode ? [void 0, {
    debugName: "variant"
  }] : []);
  /**
   * Spans 100% width of the container when enabled.
   * @defaultValue undefined
   * @group Props
   */
  fluid = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "fluid"
  } : {}), {
    transform: booleanAttribute
  }));
  /**
   * When present, it specifies that the component should have invalid state style.
   * @defaultValue false
   * @group Props
   */
  invalid = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "invalid"
  } : {}), {
    transform: booleanAttribute
  }));
  $variant = computed(() => this.variant() || this.config.inputStyle() || this.config.inputVariant(), ...ngDevMode ? [{
    debugName: "$variant"
  }] : []);
  /**
   * Callback to invoke on textarea resize.
   * @param {(Event | {})} event - Custom resize event.
   * @group Emits
   */
  onResize = new EventEmitter();
  ngControlSubscription;
  _componentStyle = inject(TextareaStyle);
  ngControl = inject(NgControl, {
    optional: true,
    self: true
  });
  pcFluid = inject(Fluid, {
    optional: true,
    host: true,
    skipSelf: true
  });
  get hasFluid() {
    return this.fluid() ?? !!this.pcFluid;
  }
  constructor() {
    super();
    effect(() => {
      const pt = this.pTextareaPT();
      pt && this.directivePT.set(pt);
    });
    effect(() => {
      this.pTextareaUnstyled() && this.directiveUnstyled.set(this.pTextareaUnstyled());
    });
  }
  onInit() {
    if (this.ngControl) {
      this.ngControlSubscription = this.ngControl.valueChanges.subscribe(() => {
        this.updateState();
      });
    }
  }
  onAfterViewInit() {
    if (this.autoResize) this.resize();
    this.cd.detectChanges();
  }
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
    if (this.autoResize) {
      this.resize();
    }
    this.writeModelValue(this.ngControl?.value ?? this.el.nativeElement.value);
  }
  onInput(e) {
    this.writeModelValue(e.target?.value);
    this.updateState();
  }
  resize(event) {
    this.el.nativeElement.style.height = "auto";
    this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + "px";
    if (parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
      this.el.nativeElement.style.overflowY = "scroll";
      this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
    } else {
      this.el.nativeElement.style.overflow = "hidden";
    }
    this.onResize.emit(event || {});
  }
  updateState() {
    if (this.autoResize) {
      this.resize();
    }
  }
  onDestroy() {
    if (this.ngControlSubscription) {
      this.ngControlSubscription.unsubscribe();
    }
  }
  static \u0275fac = function Textarea_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Textarea)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _Textarea,
    selectors: [["", "pTextarea", ""], ["", "pInputTextarea", ""]],
    hostVars: 2,
    hostBindings: function Textarea_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("input", function Textarea_input_HostBindingHandler($event) {
          return ctx.onInput($event);
        });
      }
      if (rf & 2) {
        \u0275\u0275classMap(ctx.cx("root"));
      }
    },
    inputs: {
      pTextareaPT: [1, "pTextareaPT"],
      pTextareaUnstyled: [1, "pTextareaUnstyled"],
      autoResize: [2, "autoResize", "autoResize", booleanAttribute],
      pSize: "pSize",
      variant: [1, "variant"],
      fluid: [1, "fluid"],
      invalid: [1, "invalid"]
    },
    outputs: {
      onResize: "onResize"
    },
    features: [\u0275\u0275ProvidersFeature([TextareaStyle, {
      provide: TEXTAREA_INSTANCE,
      useExisting: _Textarea
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Textarea
    }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Textarea, [{
    type: Directive,
    args: [{
      selector: "[pTextarea], [pInputTextarea]",
      standalone: true,
      host: {
        "[class]": "cx('root')"
      },
      providers: [TextareaStyle, {
        provide: TEXTAREA_INSTANCE,
        useExisting: Textarea
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Textarea
      }],
      hostDirectives: [Bind]
    }]
  }], () => [], {
    pTextareaPT: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pTextareaPT",
        required: false
      }]
    }],
    pTextareaUnstyled: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pTextareaUnstyled",
        required: false
      }]
    }],
    autoResize: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    pSize: [{
      type: Input
    }],
    variant: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "variant",
        required: false
      }]
    }],
    fluid: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "fluid",
        required: false
      }]
    }],
    invalid: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "invalid",
        required: false
      }]
    }],
    onResize: [{
      type: Output
    }],
    onInput: [{
      type: HostListener,
      args: ["input", ["$event"]]
    }]
  });
})();
var TextareaModule = class _TextareaModule {
  static \u0275fac = function TextareaModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TextareaModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _TextareaModule,
    imports: [Textarea],
    exports: [Textarea]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextareaModule, [{
    type: NgModule,
    args: [{
      imports: [Textarea],
      exports: [Textarea]
    }]
  }], null, null);
})();

// src/app/core/services/cv.api.ts
var CvApi = class _CvApi {
  constructor(http) {
    this.http = http;
    this.baseUrl = environment.api.baseUrl;
  }
  generate(request) {
    return this.http.post(`${this.baseUrl}/api/generate`, request).pipe(catchError((err) => {
      console.error(err);
      return of({ cvMarkdown: "", coverLetterMarkdown: "", interviewTips: [] });
    }));
  }
  static {
    this.\u0275fac = function CvApi_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CvApi)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CvApi, factory: _CvApi.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CvApi, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/core/services/cv.mock.ts
var CvMock = class _CvMock {
  generate(request) {
    const response = {
      cvMarkdown: `# ${request.profile?.fullName ?? "Candidate"}

## Target
${request.targetCompany}

## Skills
${(request.profile?.skills ?? []).map((s) => `- ${s}`).join("\n") || "- (not provided)"}`,
      coverLetterMarkdown: `Dear Hiring Team at ${request.targetCompany},

I am applying for ${request.vacancyTitle ?? "the position"}.

Sincerely,
${request.profile?.fullName ?? "Candidate"}`,
      interviewTips: ["Use STAR method", "Be specific about impact", "Ask clarifying questions"]
    };
    return of(response).pipe(delay(600));
  }
  static {
    this.\u0275fac = function CvMock_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CvMock)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CvMock, factory: _CvMock.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CvMock, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/core/services/cv.service.ts
var CvService = class _CvService {
  constructor(cvApi, cvMock) {
    this.cvApi = cvApi;
    this.cvMock = cvMock;
  }
  generateCv(request) {
    return this.generate(request);
  }
  generate(request) {
    if (environment.api.useMockApi) {
      return this.cvMock.generate(request);
    }
    return this.cvApi.generate(request);
  }
  static {
    this.\u0275fac = function CvService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CvService)(\u0275\u0275inject(CvApi), \u0275\u0275inject(CvMock));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CvService, factory: _CvService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CvService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: CvApi }, { type: CvMock }], null);
})();

// src/app/features/generate/generate-page.component.ts
function GeneratePageComponent_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275text(1, "Loading...");
    \u0275\u0275elementEnd();
  }
}
function GeneratePageComponent_div_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "section", 23)(2, "h2", 24);
    \u0275\u0275text(3, "CV Markdown");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "pre", 25);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "section", 23)(7, "h2", 24);
    \u0275\u0275text(8, "Cover Letter Markdown");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "pre", 25);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.result.cvMarkdown ?? "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.result.coverLetterMarkdown ?? "");
  }
}
var GeneratePageComponent = class _GeneratePageComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.cvService = inject(CvService);
    this.form = this.fb.nonNullable.group({
      fullName: ["", [Validators.required]],
      desiredTitle: [""],
      skills: [""],
      targetCompany: ["", [Validators.required]],
      vacancyTitle: [""],
      vacancyDescription: [""]
    });
    this.isLoading = false;
    this.result = null;
  }
  onSubmit() {
    if (this.form.invalid || this.isLoading) {
      return;
    }
    const value = this.form.getRawValue();
    const skills = value.skills.split(",").map((s) => s.trim()).filter(Boolean);
    this.isLoading = true;
    this.result = null;
    this.cvService.generateCv({
      targetCompany: value.targetCompany,
      vacancyTitle: value.vacancyTitle || void 0,
      vacancyDescription: value.vacancyDescription || void 0,
      locale: "ru-RU",
      profile: {
        fullName: value.fullName,
        desiredTitle: value.desiredTitle || void 0,
        skills: skills.length ? skills : void 0
      }
    }).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: (res) => this.result = res,
      error: (err) => {
        console.error(err);
        this.result = null;
      }
    });
  }
  static {
    this.\u0275fac = function GeneratePageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GeneratePageComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GeneratePageComponent, selectors: [["app-generate-page"]], decls: 34, vars: 5, consts: [[1, "rounded-lg", "border", "bg-white", "p-6"], [1, "text-lg", "font-semibold"], [1, "mt-1", "text-sm", "text-slate-600"], [1, "mt-6", "grid", "gap-4", 3, "ngSubmit", "formGroup"], [1, "grid", "gap-1"], ["for", "fullName", 1, "text-sm", "font-medium"], ["id", "fullName", "pInputText", "", "formControlName", "fullName"], ["for", "desiredTitle", 1, "text-sm", "font-medium"], ["id", "desiredTitle", "pInputText", "", "formControlName", "desiredTitle"], ["for", "skills", 1, "text-sm", "font-medium"], ["id", "skills", "pInputText", "", "formControlName", "skills", "placeholder", "Angular, TypeScript, RxJS"], ["for", "targetCompany", 1, "text-sm", "font-medium"], ["id", "targetCompany", "pInputText", "", "formControlName", "targetCompany"], ["for", "vacancyTitle", 1, "text-sm", "font-medium"], ["id", "vacancyTitle", "pInputText", "", "formControlName", "vacancyTitle"], ["for", "vacancyDescription", 1, "text-sm", "font-medium"], ["id", "vacancyDescription", "pInputTextarea", "", "rows", "6", "formControlName", "vacancyDescription"], [1, "pt-2"], ["type", "submit", "severity", "primary", 3, "label", "disabled"], ["class", "mt-3 text-sm text-slate-600", 4, "ngIf"], ["class", "mt-6 grid gap-4", 4, "ngIf"], [1, "mt-3", "text-sm", "text-slate-600"], [1, "mt-6", "grid", "gap-4"], [1, "rounded-md", "border", "bg-slate-50", "p-4"], [1, "text-sm", "font-semibold"], [1, "mt-2", "whitespace-pre-wrap", "text-sm"]], template: function GeneratePageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 0)(1, "h1", 1);
        \u0275\u0275text(2, "Generate CV");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "p", 2);
        \u0275\u0275text(4, "Fill the form and generate CV + cover letter.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "form", 3);
        \u0275\u0275listener("ngSubmit", function GeneratePageComponent_Template_form_ngSubmit_5_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(6, "div", 4)(7, "label", 5);
        \u0275\u0275text(8, "Full name");
        \u0275\u0275elementEnd();
        \u0275\u0275element(9, "input", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "div", 4)(11, "label", 7);
        \u0275\u0275text(12, "Desired title");
        \u0275\u0275elementEnd();
        \u0275\u0275element(13, "input", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "div", 4)(15, "label", 9);
        \u0275\u0275text(16, "Skills (comma separated)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(17, "input", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "div", 4)(19, "label", 11);
        \u0275\u0275text(20, "Target company");
        \u0275\u0275elementEnd();
        \u0275\u0275element(21, "input", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "div", 4)(23, "label", 13);
        \u0275\u0275text(24, "Vacancy title");
        \u0275\u0275elementEnd();
        \u0275\u0275element(25, "input", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "div", 4)(27, "label", 15);
        \u0275\u0275text(28, "Vacancy description");
        \u0275\u0275elementEnd();
        \u0275\u0275element(29, "textarea", 16);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "div", 17);
        \u0275\u0275element(31, "p-button", 18);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(32, GeneratePageComponent_div_32_Template, 2, 0, "div", 19)(33, GeneratePageComponent_div_33_Template, 11, 2, "div", 20);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(26);
        \u0275\u0275property("label", ctx.isLoading ? "Loading..." : "Generate")("disabled", ctx.form.invalid || ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.result);
      }
    }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, InputTextModule, InputText, TextareaModule, Textarea, ButtonModule, Button], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GeneratePageComponent, [{
    type: Component,
    args: [{
      selector: "app-generate-page",
      standalone: true,
      imports: [CommonModule, ReactiveFormsModule, InputTextModule, TextareaModule, ButtonModule],
      template: `
    <section class="rounded-lg border bg-white p-6">
      <h1 class="text-lg font-semibold">Generate CV</h1>
      <p class="mt-1 text-sm text-slate-600">Fill the form and generate CV + cover letter.</p>

      <form class="mt-6 grid gap-4" [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="grid gap-1">
          <label class="text-sm font-medium" for="fullName">Full name</label>
          <input id="fullName" pInputText formControlName="fullName" />
        </div>

        <div class="grid gap-1">
          <label class="text-sm font-medium" for="desiredTitle">Desired title</label>
          <input id="desiredTitle" pInputText formControlName="desiredTitle" />
        </div>

        <div class="grid gap-1">
          <label class="text-sm font-medium" for="skills">Skills (comma separated)</label>
          <input id="skills" pInputText formControlName="skills" placeholder="Angular, TypeScript, RxJS" />
        </div>

        <div class="grid gap-1">
          <label class="text-sm font-medium" for="targetCompany">Target company</label>
          <input id="targetCompany" pInputText formControlName="targetCompany" />
        </div>

        <div class="grid gap-1">
          <label class="text-sm font-medium" for="vacancyTitle">Vacancy title</label>
          <input id="vacancyTitle" pInputText formControlName="vacancyTitle" />
        </div>

        <div class="grid gap-1">
          <label class="text-sm font-medium" for="vacancyDescription">Vacancy description</label>
          <textarea
            id="vacancyDescription"
            pInputTextarea
            rows="6"
            formControlName="vacancyDescription"
          ></textarea>
        </div>

        <div class="pt-2">
          <p-button
            type="submit"
            [label]="isLoading ? 'Loading...' : 'Generate'"
            severity="primary"
            [disabled]="form.invalid || isLoading"
          ></p-button>
        </div>
      </form>

      <div class="mt-3 text-sm text-slate-600" *ngIf="isLoading">Loading...</div>

      <div class="mt-6 grid gap-4" *ngIf="result">
        <section class="rounded-md border bg-slate-50 p-4">
          <h2 class="text-sm font-semibold">CV Markdown</h2>
          <pre class="mt-2 whitespace-pre-wrap text-sm">{{ result.cvMarkdown ?? '' }}</pre>
        </section>

        <section class="rounded-md border bg-slate-50 p-4">
          <h2 class="text-sm font-semibold">Cover Letter Markdown</h2>
          <pre class="mt-2 whitespace-pre-wrap text-sm">{{ result.coverLetterMarkdown ?? '' }}</pre>
        </section>
      </div>
    </section>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GeneratePageComponent, { className: "GeneratePageComponent", filePath: "src/app/features/generate/generate-page.component.ts", lineNumber: 85 });
})();
export {
  GeneratePageComponent
};
//# sourceMappingURL=chunk-X2ZOZ6MU.js.map
