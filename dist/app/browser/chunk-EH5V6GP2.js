import {
  Button,
  ButtonModule
} from "./chunk-YHUSRZC6.js";
import "./chunk-E46GN2WW.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-74DYHHFB.js";

// src/app/features/generate/generate-page.component.ts
var GeneratePageComponent = class _GeneratePageComponent {
  static {
    this.\u0275fac = function GeneratePageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GeneratePageComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GeneratePageComponent, selectors: [["app-generate-page"]], decls: 7, vars: 0, consts: [[1, "rounded-lg", "border", "bg-white", "p-6"], [1, "text-lg", "font-semibold"], [1, "mt-1", "text-sm", "text-slate-600"], [1, "mt-4"], ["label", "Generate", "severity", "primary"]], template: function GeneratePageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 0)(1, "h1", 1);
        \u0275\u0275text(2, "Generate CV");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "p", 2);
        \u0275\u0275text(4, "CV generation page stub.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 3);
        \u0275\u0275element(6, "p-button", 4);
        \u0275\u0275elementEnd()();
      }
    }, dependencies: [ButtonModule, Button], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GeneratePageComponent, [{
    type: Component,
    args: [{
      selector: "app-generate-page",
      standalone: true,
      imports: [ButtonModule],
      template: `
    <section class="rounded-lg border bg-white p-6">
      <h1 class="text-lg font-semibold">Generate CV</h1>
      <p class="mt-1 text-sm text-slate-600">CV generation page stub.</p>

      <div class="mt-4">
        <p-button label="Generate" severity="primary"></p-button>
      </div>
    </section>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GeneratePageComponent, { className: "GeneratePageComponent", filePath: "src/app/features/generate/generate-page.component.ts", lineNumber: 20 });
})();
export {
  GeneratePageComponent
};
//# sourceMappingURL=chunk-EH5V6GP2.js.map
