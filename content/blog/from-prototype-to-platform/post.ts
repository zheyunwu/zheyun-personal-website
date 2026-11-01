import type { Post } from '../types';

export const fromPrototypeToPlatformPost: Post = {
  slug: 'from-prototype-to-platform',
  title: { en: 'From prototype to platform.', zh: '从原型，到可靠的平台。' },
  excerpt: { en: 'A practical starting point for AI applications: clear boundaries, observable systems, and room to grow.', zh: 'AI 应用的起点：清晰的边界、可观测的系统，以及持续演进的空间。' },
  category: 'technology', tags: ['ai', 'cloud', 'backend', 'kubernetes'], date: '2026-11-01', readTime: 4,
  visual: 'platform', format: { en: 'Field guide', zh: '技术文章' },
  body: [
    {
      id: 'start-with-the-boundary', title: { en: 'Start with the boundary.', zh: '先明确系统的边界。' },
      paragraphs: [
        { en: 'An AI demo can begin with a prompt and a model call. A useful application needs a little more structure: a defined input, an expected result, and a way to tell whether that result is good enough. Before adding infrastructure, write down what the system should do—and what a human should still decide.', zh: '一个 AI 演示可以从一条提示词和一次模型调用开始。一个实用的应用还需要明确输入、预期结果，以及判断结果是否足够好的方法。在增加基础设施之前，先写下系统应该完成什么，以及哪些决定仍应由人来做。' },
        { en: 'Keep the application boundary explicit. Validate incoming data, check access before retrieving private material, and treat generated output as data to validate. A small representative evaluation set makes changes to prompts, models, and retrieval easier to compare.', zh: '让应用边界保持清晰：验证输入数据，在检索私人资料前检查权限，并把模型输出当作需要验证的数据。一小组具有代表性的评测样本，能帮助比较提示词、模型和检索方式的变化。' },
      ],
      bullets: [
        { en: 'Define a successful result in terms a user can recognise.', zh: '用用户能够理解的方式定义成功的结果。' },
        { en: 'Include incomplete inputs, empty retrieval results, and provider failures in the evaluation set.', zh: '在评测样本中加入不完整输入、空检索结果和服务提供方故障。' },
        { en: 'Decide when to retry, when to stop, and when to ask for human review.', zh: '明确何时重试、何时停止，以及何时需要人工审核。' },
      ],
    },
    {
      id: 'make-behaviour-visible', title: { en: 'Make behaviour visible.', zh: '让系统行为可见。' },
      paragraphs: [
        { en: 'When a request becomes slow, knowing the total duration is only the beginning. Trace the stages that matter: authentication, retrieval, model inference, and any downstream action. OpenTelemetry describes traces, metrics, and logs as complementary signals for understanding a system.', zh: '请求变慢时，总耗时只是线索的起点。追踪关键阶段：身份验证、检索、模型推理，以及后续操作。OpenTelemetry 将追踪、指标和日志视为理解系统时互为补充的信号。' },
        { en: 'Record useful operational context without copying sensitive documents into logs. Track errors, latency, and usage alongside a small set of quality checks. A technically successful request can still return an unhelpful answer.', zh: '记录有用的运行上下文，同时避免把敏感文件复制进日志。在跟踪错误、延迟和使用量的同时，也保留少量质量检查。技术上成功的请求，仍可能返回没有帮助的答案。' },
      ],
      links: [{ label: { en: 'OpenTelemetry · Observability primer', zh: 'OpenTelemetry · 可观测性基础' }, href: 'https://opentelemetry.io/docs/concepts/observability-primer/' }],
    },
    {
      id: 'grow-deliberately', title: { en: 'Grow deliberately.', zh: '有意识地演进。' },
      paragraphs: [
        { en: 'Choose deployment machinery to match the workload. A simple service may be enough for an early application. If Kubernetes is part of the platform, understand resource requests and limits: requests inform scheduling, while limits constrain resource use. These settings need measurements rather than guesses.', zh: '根据负载选择部署方式。早期应用可能只需要一个简单服务。如果平台采用 Kubernetes，就需要理解资源请求与限制：请求影响调度，限制约束资源使用。这些配置应该来自测量，而不是猜测。' },
        { en: 'Write down a rollback path, keep configuration separate from code, and make one meaningful change at a time. A platform becomes dependable through repeatable decisions, not through the length of its technology list.', zh: '写下回滚路径，将配置与代码分离，每次只做一个有意义的变更。平台的可靠性来自可重复的决策，而不是技术清单的长度。' },
      ],
      links: [{ label: { en: 'Kubernetes · Resource management', zh: 'Kubernetes · 资源管理' }, href: 'https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/' }],
    },
  ],
};
