/**
 * Facebook Pixel 事件追踪工具
 *
 * 使用方式:
 *   1. 在 index.html 的 <head> 中放置 Facebook Pixel 基础代码
 *   2. 在关键转化节点调用对应的方法
 *
 * 标准事件:
 *   - PageView:    由基础代码自动触发 (页面加载时)
 *   - Lead:        用户开始填写问卷
 *   - CompleteRegistration: 用户完成所有问卷题目
 *   - InitiateCheckout:     用户看到付款页面
 *   - Purchase:    用户点击支付按钮跳转 checkout
 */

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: (...args: any[]) => void;
  }
}

/** 安全调用 fbq，防止 Pixel 未加载时报错 */
function track(event: string, params?: Record<string, string | number | boolean>) {
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', event, params);
    }
  } catch {
    // Facebook Pixel 未加载，静默失败
  }
}

/** 仅调用一次 fbq('trackCustom', ...)，用于回传自定义事件 */
function trackCustom(event: string, params?: Record<string, string | number | boolean>) {
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', event, params);
    }
  } catch {
    // 静默失败
  }
}

/** ------------- 标准事件 ------------- */

/** Lead — 用户点击 "START EVALUATION" 或完成资格确认进入问卷 */
export function trackLead() {
  track('Lead');
}

/** CompleteRegistration — 用户完成 10 道问卷题目 */
export function trackCompleteRegistration() {
  track('CompleteRegistration');
}

/** InitiateCheckout — AllocationPass 页面展示（用户看到付款信息） */
export function trackInitiateCheckout(value?: number, currency?: string) {
  track('InitiateCheckout', {
    value: value ?? 6.85,
    currency: currency ?? 'AUD',
  });
}

/** Purchase — 用户点击 "Pay & Secure" 按钮跳转 checkout */
export function trackPurchase(value?: number, currency?: string) {
  track('Purchase', {
    value: value ?? 6.85,
    currency: currency ?? 'AUD',
  });
}

/** ------------- 自定义事件 (可选) ------------- */

/** 用户进入 Landing 页面指定区域 */
export function trackViewContent(contentName?: string) {
  track('ViewContent', {
    content_name: contentName ?? 'Landing Page',
  });
}

/** Survey 中途退出（可辅助分析流失率） */
export function trackSurveyAbandon(questionNumber?: number) {
  trackCustom('SurveyAbandon', {
    question_number: questionNumber ?? 0,
  });
}

/** 计算动画完成，显示 Allocation Pass */
export function trackAllocationPassViewed() {
  trackCustom('AllocationPassViewed');
}