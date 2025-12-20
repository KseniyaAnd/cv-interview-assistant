import {
  Button,
  ButtonModule,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  InputText,
  InputTextModule,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  environment,
  ɵNgNoValidate
} from "./chunk-YJCAGOZR.js";
import {
  CommonModule,
  HttpClient,
  HttpParams,
  NgForOf,
  NgIf
} from "./chunk-6VLCG72H.js";
import {
  Component,
  Injectable,
  catchError,
  delay,
  finalize,
  inject,
  of,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-GXNLBY5Z.js";

// src/app/core/services/interview.api.ts
var InterviewApi = class _InterviewApi {
  constructor(http) {
    this.http = http;
    this.baseUrl = environment.api.baseUrl;
  }
  chat(request) {
    let params = new HttpParams();
    if (request.vacancySummary) {
      params = params.set("vacancySummary", request.vacancySummary);
    }
    if (request.locale) {
      params = params.set("locale", request.locale);
    }
    return this.http.post(`${this.baseUrl}/api/interview/chat`, request.chatMessage, {
      params
    }).pipe(catchError((err) => {
      console.error(err);
      return of({
        conversationId: request.chatMessage.conversationId,
        assistantMessage: "Backend is unavailable. Please try again later.",
        coachingTips: []
      });
    }));
  }
  static {
    this.\u0275fac = function InterviewApi_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _InterviewApi)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InterviewApi, factory: _InterviewApi.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InterviewApi, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/core/services/interview.mock.ts
var InterviewMock = class _InterviewMock {
  chat(request) {
    const conversationId = request.chatMessage.conversationId ?? this.generateConversationId();
    const isInit = !request.chatMessage.conversationId;
    const assistantMessage = isInit ? "Hi! Let's start the interview. Tell me briefly about your most recent project." : this.buildAssistantReply(request.chatMessage.message);
    const response = {
      conversationId,
      assistantMessage,
      coachingTips: isInit ? ["Answer concisely (1-2 minutes)", "Highlight impact with numbers", "Mention your role and scope"] : ["Use STAR structure", "Focus on decisions and trade-offs", "End with measurable results"]
    };
    return of(response).pipe(delay(700));
  }
  buildAssistantReply(userMessage) {
    const trimmed = userMessage.trim();
    if (!trimmed) {
      return "Send a short answer and I will ask the next question.";
    }
    return `Thanks! You said: "${trimmed}". What was the biggest challenge and how did you solve it?`;
  }
  generateConversationId() {
    return `conv_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }
  static {
    this.\u0275fac = function InterviewMock_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _InterviewMock)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InterviewMock, factory: _InterviewMock.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InterviewMock, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/core/services/interview.service.ts
var InterviewService = class _InterviewService {
  constructor(interviewApi, interviewMock) {
    this.interviewApi = interviewApi;
    this.interviewMock = interviewMock;
  }
  sendMessage(requestOrMessage, conversationId) {
    const request = typeof requestOrMessage === "string" ? {
      chatMessage: {
        message: requestOrMessage,
        conversationId
      }
    } : requestOrMessage;
    if (environment.api.useMockApi) {
      return this.interviewMock.chat(request);
    }
    return this.interviewApi.chat(request);
  }
  static {
    this.\u0275fac = function InterviewService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _InterviewService)(\u0275\u0275inject(InterviewApi), \u0275\u0275inject(InterviewMock));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InterviewService, factory: _InterviewService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InterviewService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: InterviewApi }, { type: InterviewMock }], null);
})();

// src/app/features/interview/interview-page.component.ts
function InterviewPageComponent_div_5_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 13);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275classProp("bg-slate-50", item_r2.role === "assistant")("bg-white", item_r2.role === "user");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.role);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.text);
  }
}
function InterviewPageComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275template(1, InterviewPageComponent_div_5_div_1_Template, 5, 6, "div", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.messages);
  }
}
function InterviewPageComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275text(1, " Send the first message to start the interview. ");
    \u0275\u0275elementEnd();
  }
}
function InterviewPageComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1, "Loading...");
    \u0275\u0275elementEnd();
  }
}
var InterviewPageComponent = class _InterviewPageComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.interviewService = inject(InterviewService);
    this.form = this.fb.nonNullable.group({
      message: ["", [Validators.required]]
    });
    this.isLoading = false;
    this.conversationId = null;
    this.messages = [];
  }
  onSubmit() {
    if (this.form.invalid || this.isLoading) {
      return;
    }
    const message = this.form.getRawValue().message.trim();
    if (!message) {
      return;
    }
    this.messages = [...this.messages, { role: "user", text: message }];
    this.form.reset({ message: "" });
    this.isLoading = true;
    const request$ = this.conversationId ? this.interviewService.sendMessage(message, this.conversationId) : this.interviewService.sendMessage(message);
    request$.pipe(finalize(() => this.isLoading = false)).subscribe({
      next: (res) => {
        if (res.conversationId) {
          this.conversationId = res.conversationId;
        }
        if (res.assistantMessage) {
          this.messages = [...this.messages, { role: "assistant", text: res.assistantMessage }];
        }
      },
      error: (err) => console.error(err)
    });
  }
  static {
    this.\u0275fac = function InterviewPageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _InterviewPageComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InterviewPageComponent, selectors: [["app-interview-page"]], decls: 12, vars: 6, consts: [["emptyState", ""], [1, "rounded-lg", "border", "bg-white", "p-6"], [1, "text-lg", "font-semibold"], [1, "mt-1", "text-sm", "text-slate-600"], ["class", "mt-4 grid gap-2", 4, "ngIf", "ngIfElse"], [1, "mt-4", "flex", "gap-2", 3, "ngSubmit", "formGroup"], ["pInputText", "", "type", "text", "formControlName", "message", "placeholder", "Type a message...", 1, "w-full"], ["type", "submit", 3, "label", "disabled"], ["class", "mt-3 text-sm text-slate-600", 4, "ngIf"], [1, "mt-4", "grid", "gap-2"], ["class", "rounded-md border px-3 py-2 text-sm", 3, "bg-slate-50", "bg-white", 4, "ngFor", "ngForOf"], [1, "rounded-md", "border", "px-3", "py-2", "text-sm"], [1, "text-xs", "font-semibold", "text-slate-600"], [1, "mt-1", "whitespace-pre-wrap"], [1, "mt-4", "rounded-md", "border", "bg-slate-50", "p-4", "text-sm", "text-slate-600"], [1, "mt-3", "text-sm", "text-slate-600"]], template: function InterviewPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "section", 1)(1, "h1", 2);
        \u0275\u0275text(2, "Interview");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "p", 3);
        \u0275\u0275text(4, "Mini interview chat.");
        \u0275\u0275elementEnd();
        \u0275\u0275template(5, InterviewPageComponent_div_5_Template, 2, 1, "div", 4)(6, InterviewPageComponent_ng_template_6_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementStart(8, "form", 5);
        \u0275\u0275listener("ngSubmit", function InterviewPageComponent_Template_form_ngSubmit_8_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onSubmit());
        });
        \u0275\u0275element(9, "input", 6)(10, "p-button", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275template(11, InterviewPageComponent_div_11_Template, 2, 0, "div", 8);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const emptyState_r4 = \u0275\u0275reference(7);
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ctx.messages.length)("ngIfElse", emptyState_r4);
        \u0275\u0275advance(3);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(2);
        \u0275\u0275property("label", ctx.isLoading ? "Loading..." : "Send")("disabled", ctx.form.invalid || ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isLoading);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, InputTextModule, InputText, ButtonModule, Button], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InterviewPageComponent, [{
    type: Component,
    args: [{
      selector: "app-interview-page",
      standalone: true,
      imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
      template: `
    <section class="rounded-lg border bg-white p-6">
      <h1 class="text-lg font-semibold">Interview</h1>
      <p class="mt-1 text-sm text-slate-600">Mini interview chat.</p>

      <div class="mt-4 grid gap-2" *ngIf="messages.length; else emptyState">
        <div
          *ngFor="let item of messages"
          class="rounded-md border px-3 py-2 text-sm"
          [class.bg-slate-50]="item.role === 'assistant'"
          [class.bg-white]="item.role === 'user'"
        >
          <div class="text-xs font-semibold text-slate-600">{{ item.role }}</div>
          <div class="mt-1 whitespace-pre-wrap">{{ item.text }}</div>
        </div>
      </div>

      <ng-template #emptyState>
        <div class="mt-4 rounded-md border bg-slate-50 p-4 text-sm text-slate-600">
          Send the first message to start the interview.
        </div>
      </ng-template>

      <form class="mt-4 flex gap-2" [formGroup]="form" (ngSubmit)="onSubmit()">
        <input
          pInputText
          class="w-full"
          type="text"
          formControlName="message"
          placeholder="Type a message..."
        />
        <p-button
          type="submit"
          [label]="isLoading ? 'Loading...' : 'Send'"
          [disabled]="form.invalid || isLoading"
        ></p-button>
      </form>

      <div class="mt-3 text-sm text-slate-600" *ngIf="isLoading">Loading...</div>
    </section>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InterviewPageComponent, { className: "InterviewPageComponent", filePath: "src/app/features/interview/interview-page.component.ts", lineNumber: 63 });
})();
export {
  InterviewPageComponent
};
//# sourceMappingURL=chunk-S76GYCMG.js.map
